'use client';
import { useAppDispatch } from '@/services/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { doGetUserProfile } from '@/services/users/users.service';
import useAxiosPrivate from '@/hooks/private-axios';
import UserLinks from './sections/links/user-links';
import UserPersonalInfo from './sections/personal-info/user-personal-info';
import UserExperiences from './sections/experiences/user-experiences';

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
        <UserPersonalInfo profile={profile} />
        <UserLinks links={profile.links} />
        <UserExperiences experiences={profile.experiences} />
      </div>
    </div>
  );
};

export default UserProfileForm;
