import { FieldDefinitionCss } from '@/components/forms/field-definition';
import styles from './section-collection.module.scss';

interface SectionCollectionProps {
  title: string;
  fields: FieldDefinitionCss[];
  entries: any[];
  hasDates?: boolean;
}

const SectionCollectionComponent: React.FC<SectionCollectionProps> = ({ title, fields, entries, hasDates }: SectionCollectionProps) => {
  const formatDate = (start_date: string, end_date: string) => {
    if (start_date === null || start_date === '' || typeof start_date === 'undefined') {
      return '';
    }

    const startDate = parseDate(start_date);

    let endDate = new Date();

    if (typeof end_date !== 'undefined' && end_date !== null && end_date !== '') {
      endDate = parseDate(end_date);
    }

    const months = (new Date(endDate).getFullYear() - new Date(startDate).getFullYear()) * 12 + new Date(endDate).getMonth() - new Date(startDate).getMonth();
    const years = Math.floor(months / 12);

    const totalMonths = months % 12;
    const yearsString = years > 1 ? `${years} anos` : `${years} ano`;
    const totalMonthsString = totalMonths > 1 ? `${totalMonths} meses` : `${totalMonths} mês`;

    let dates = `Desde ${start_date}`;

    if (typeof end_date !== 'undefined' && end_date !== null && end_date !== '') {
      dates = `${start_date} - ${end_date}`;
    }

    if (years > 0 && totalMonths > 0) {
      return `${dates} (${yearsString} e ${totalMonthsString})`;
    } else if (years > 0 && totalMonths === 0) {
      return `${dates} (${yearsString})`;
    } else if (years === 0 && totalMonths > 0) {
      return `${dates} (${totalMonthsString})`;
    }
  };

  const parseDate = (dateString: string): Date => {
    const [month, year] = dateString.split('/');
    return new Date(`${year}/${month}/01`);
  };

  const getSortedExperiences = () => {
    const experiencesCopy = [...entries];
    return experiencesCopy.sort((a, b) => {
      const a_start_date = parseDate(a.start_date);
      const b_start_date = parseDate(b.start_date);
      return b_start_date.getTime() - a_start_date.getTime();
    });
  };

  return (
    <>
      <h2 className={`${styles['form-cell']} mt-10 text-xl font-bold`}>{title}</h2>
      {entries &&
        entries.map((entry) => (
          <div className={`${styles['form-row']}`} key={entry.id}>
            <div className={`${styles['form-cell']} mb-6 break-words overflow-hidden text-ellipsis`}>
              {fields.map((field, index) => (
                <p key={index} className={field.className}>
                  {hasDates && index === 0 ? (
                    <div className={`${styles['section-collection-container']}`}>
                      <div className={`${styles['form-cell']} break-words overflow-hidden text-ellipsis`}>
                        <p className="font-bold">{entry[field.name]}</p>
                      </div>
                      <div className={`${styles['form-cell']} break-words mt-2 overflow-hidden text-ellipsis`}>
                        <p className="text-gray-400 dark:text-gray-300">{formatDate(entry.start_date, entry.end_date)}</p>
                      </div>
                    </div>
                  ) : (
                    <div className={`${styles['form-cell']} break-words overflow-hidden text-ellipsis`}>
                      <p>{entry[field.name]}</p>
                    </div>
                  )}
                </p>
              ))}
            </div>
          </div>
        ))}
    </>
  );
};

export default SectionCollectionComponent;
