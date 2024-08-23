import { UserTechExperience } from '@/services/users/users.service';
import styles from './user-tech-experiences.module.scss';

export interface UserTechExperiencesProps {
  tech_experiences: UserTechExperience[];
}

const UserTechExperiences: React.FC<UserTechExperiencesProps> = ({ tech_experiences }) => {
  const getExperienceTime = (time: string) => {
    switch (time) {
      case 'years':
        return 'ano(s)';
      case 'months':
        return 'mês(es)';
      case 'days':
        return 'dia(s)';
      case 'hours':
        return 'hora(s)';
      case 'weeks':
        return 'semana(s)';
      default:
        return '';
    }
  };
  return (
    <div>
      {tech_experiences ? (
        <>
          <h1 className={`${styles['']} mt-10 text-xl font-bold mt-6`}>Experiências com tecnologias</h1>
          <div className={`${styles['tech-experiences-container']}`}>
            {tech_experiences.map((tech_experience, index) => (
              <div className={`${styles['flex mt-1 items-center']}`} key={index}>
                <div className={`${styles['tech-experiences-tag']}`}>{`${tech_experience.technology} - ${tech_experience.experience_number} ${getExperienceTime(
                  tech_experience.experience_time
                )}`}</div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserTechExperiences;
