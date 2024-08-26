import { v4 as uuidv4 } from 'uuid';
import { FieldDefinition } from '@/components/forms/field-definition';
import styles from './section-collection.module.scss';
import Link from 'next/link';
import PencilSvg from '@/components/svg/pencil.svg';

interface SectionCollectionProps {
  title: string;
  fields: FieldDefinition[];
  entries: any[];
  hasDates?: boolean;
  entityKey?: string;
}

const SectionCollectionComponent: React.FC<SectionCollectionProps> = ({ title, fields, entries, hasDates, entityKey }: SectionCollectionProps) => {
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

  const getComponent = (field: FieldDefinition, entry: any) => {
    switch (field.type) {
      case 'url':
        return (
          <Link className="text-blue-500 dark:text-blue-400" href={entry[field.name]} passHref target="_blank" rel="noopener noreferrer">
            {entry[field.name]}
          </Link>
        );
      default:
        return (
          <div className={`${styles['form-cell']} break-words overflow-hidden text-ellipsis`}>
            <p>{entry[field.name]}</p>
          </div>
        );
    }
  };

  const getSortedEntries = () => {
    const entriesCopy = [...entries];
    return entriesCopy.sort((a, b) => {
      const a_start_date = parseDate(a.start_date);
      const b_start_date = parseDate(b.start_date);
      return b_start_date.getTime() - a_start_date.getTime();
    });
  };

  return (
    <>
      <div className="flex flex-row mt-5 items-start">
        <Link
          href={{
            pathname: '/add-item',
            query: {
              data: entityKey,
            },
          }}
          className="bg-blue-500 hover:bg-blue-700 mb-5 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center"
          onClick={() => console.log('Add')}
        >
          +
        </Link>
        <h2 className={`$ ml-2 text-xl font-bold`}>{title}</h2>
      </div>
      {entries &&
        entries.map((entry) => (
          <div className={`${styles['form-row']}`} key={entry.id}>
            <div className="flex flex-row items-start">
              <Link
                href={{
                  pathname: '/edit-item',
                  query: {
                    data: `${entityKey}-${entry.id}`,
                  },
                }}
                key={`edit-item-${uuidv4()}`}
                className="bg-green-500 mr-2 hover:bg-green-700 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center"
              >
                <PencilSvg className="h-2 w-2" />
              </Link>
              <div className={`${styles['form-cell']} w-[95%] mb-6 break-words overflow-hidden text-ellipsis`}>
                {fields.map((field, index) => (
                  <p key={index} className={field.className}>
                    {hasDates && index === 0 ? (
                      <div className={`${styles['section-collection-container']}`}>
                        <div className={`${styles['form-cell']} break-words overflow-hidden text-ellipsis`}>
                          <p className="font-bold">{entry[field.name]}</p>
                          <p className="text-gray-400 dark:text-gray-300">{formatDate(entry.start_date, entry.end_date)}</p>
                        </div>
                      </div>
                    ) : (
                      <div className={`${styles['form-cell']} break-words overflow-hidden text-ellipsis`}>{getComponent(field, entry)}</div>
                    )}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
    </>
  );
};

export default SectionCollectionComponent;
