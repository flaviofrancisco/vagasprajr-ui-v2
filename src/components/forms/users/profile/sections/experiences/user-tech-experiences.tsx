'use client';
import usersSlice, { doUpdateUserProfile, UserTechExperience } from '@/services/users/users.service';
import styles from './user-tech-experiences.module.scss';
import Link from 'next/link';
import { user_forms, USER_TECH_EXPERIENCES_KEY } from '../../../user-profile-forms';
import { FaTimes, FaTrash } from 'react-icons/fa';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import { useSelector } from 'react-redux';

export interface UserTechExperiencesProps {
  tech_experiences: UserTechExperience[];
}

const UserTechExperiences: React.FC<UserTechExperiencesProps> = ({ tech_experiences }) => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { onChangeFieldInput } = usersSlice.actions;
  const { profile } = useSelector((state: any) => state.usersReducer);

  const onDelete = (index: number) => {
    const copy_profile = { ...profile };
    dispatch(
      doUpdateUserProfile({
        axiosPrivate,
        profile: {
          ...copy_profile,
          tech_experiences: copy_profile.tech_experiences.filter((_: unknown, i: number) => i !== index),
        },
      })
    );
  };

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
          <div className="flex flex-row mt-6 items-start">
            <Link
              href={{
                pathname: '/add-item',
                query: {
                  data: USER_TECH_EXPERIENCES_KEY,
                },
              }}
              className="bg-blue-500 hover:bg-blue-700 mb-5 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center"
            >
              +
            </Link>
            <h2 className={`$ ml-2 text-xl font-bold`}>{user_forms[USER_TECH_EXPERIENCES_KEY].title}</h2>
          </div>
          <div className={`${styles['tech-experiences-container']}`}>
            {tech_experiences.map((tech_experience, index) => (
              <div className={`${styles['flex mt-1 items-center']}`} key={index}>
                <div className={`${styles['tech-experiences-tag']}`}>
                  {`${tech_experience.technology} - ${tech_experience.experience_number} ${getExperienceTime(tech_experience.experience_time)}`}
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      onDelete(index);
                    }}
                    className={`ml-4 ${styles['tech-experiences-delete']}`}
                  >
                    <FaTimes />
                  </button>
                </div>
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
