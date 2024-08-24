'use client';
import { useAppDispatch } from '@/services/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { doGetUserProfile } from '@/services/users/users.service';
import useAxiosPrivate from '@/hooks/private-axios';
import UserLinks from './sections/links/user-links';
import UserExperiences from './sections/experiences/user-experiences';
import UserEducations from './sections/education/user-education';
import UserCertifications from './sections/education/user-certification';
import UserIdioms from './sections/education/user-idioms';
import UserTechExperiences from './sections/experiences/user-tech-experiences';
import UserProfileSection from './sections/user-profile-section';
import { USER_ABOUT_ME_KEY, user_forms, USER_PERSONAL_INFO_KEY } from '../user-profile-forms';

export interface UserProfileFormProps {
  userId?: string;
}

const UserProfileForm: React.FC<UserProfileFormProps> = ({ userId }) => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { profile } = useSelector((state: any) => state.usersReducer);

  useEffect(() => {
    dispatch(doGetUserProfile({ axiosPrivate, userId }));
  }, [axiosPrivate, dispatch, userId]);

  return (
    <div className={`grid flex-grow place-items-center h-screenflex items-start block w-4/5 sm:w-9/10 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
      <div className="w-full items-start">
        <UserProfileSection profile={profile} form={user_forms[USER_PERSONAL_INFO_KEY]} />
        <UserProfileSection profile={profile} form={user_forms[USER_ABOUT_ME_KEY]} />
        <UserTechExperiences tech_experiences={profile.tech_experiences} />
        <UserLinks links={profile.links} />
        <UserExperiences experiences={profile.experiences} />
        <UserEducations educations={profile.educations} />
        <UserCertifications certifications={profile.certifications} />
        <UserIdioms idioms={profile.idioms_info} />
      </div>
    </div>
  );
};

export default UserProfileForm;
