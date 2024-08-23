import { UserExperience } from '@/services/users/users.service';

interface UserExperiencesProps {
  experiences: UserExperience[];
}

export default function UserExperiences({ experiences }: UserExperiencesProps) {
  const formatDate = (start_date: string, end_date: string) => {
    if (start_date === null || start_date === '' || typeof start_date === 'undefined') {
      return '';
    }

    const [start_month, start_year] = start_date.split('/');
    const startDate = new Date(`${start_year}/${start_month}/01`);

    let endDate = new Date();

    if (typeof end_date !== 'undefined' && end_date !== null && end_date !== '') {
      const [end_month, end_year] = end_date.split('/');
      endDate = new Date(`${end_year}/${end_month}/01`);
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

  const getSortedExperiences = () => {
    const experiencesCopy = [...experiences];
    return experiencesCopy.sort((a, b) => {
      const a_start_date = new Date(`01/${a.start_date}`);
      const b_start_date = new Date(`01/${b.start_date}`);
      return b_start_date.getTime() - a_start_date.getTime();
    });
  };

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">Experiências</h2>
      {experiences && experiences.length > 0 && (
        <div className="grid grid-cols-1 gap-4 mt-4">
          {getSortedExperiences().map((experience) => (
            <div
              key={experience.id}
              className={`flex flex-col items-start p-4 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">{experience.position}</h3>
              <h4 className="text-md font-semibold text-gray-800 dark:text-gray-200">{experience.company}</h4>
              <p className="text-gray-600 dark:text-gray-300 pb-4">{formatDate(experience.start_date, experience.end_date)}</p>
              <p className="text-gray-600 dark:text-gray-300">{experience.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
