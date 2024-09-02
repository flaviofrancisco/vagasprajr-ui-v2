'use client';
import Image from 'next/image';
import UserIcon from '@/assets/user-icon.png';

import { useAppDispatch } from '@/services/store';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { doGetUserProfile } from '@/services/users/users.service';
import useAxiosPrivate from '@/hooks/private-axios';
import UserLinks from './sections/links/user-links';
import UserProfileSection from './sections/user-profile-section';
import { USER_ABOUT_ME_KEY, USER_CERTIFICATIONS_KEY, USER_EDUCATIONS_KEY, USER_EXPERIENCES_KEY, user_forms, USER_IDIOM_INFO, USER_PERSONAL_INFO_KEY } from '../user-profile-forms';
import UserProfileSectionCollection from './sections/user-profile-section-collection';
import UserTechExperiences from './sections/experiences/user-tech-experiences';

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
        {profile.profile_image_url ? (
          <Image src={profile.profile_image_url} alt={`${profile.first_name} ${profile.last_name}`} width={60} height={60} className="rounded-full" />
        ) : (
          <Image src={UserIcon} alt={`${profile.first_name} ${profile.last_name}`} width={48} height={48} className="rounded-full" />
        )}
        <UserProfileSection profile={profile} form_definition={user_forms[USER_PERSONAL_INFO_KEY]} />
        <UserProfileSection profile={profile} form_definition={user_forms[USER_ABOUT_ME_KEY]} />
        <UserTechExperiences tech_experiences={profile.tech_experiences} />
        <UserLinks links={profile.links} />
        <UserProfileSectionCollection entries={profile.experiences} form_definition={user_forms[USER_EXPERIENCES_KEY]} />
        <UserProfileSectionCollection entries={profile.educations} form_definition={user_forms[USER_EDUCATIONS_KEY]} />
        <UserProfileSectionCollection entries={profile.certifications} form_definition={user_forms[USER_CERTIFICATIONS_KEY]} />
        <UserProfileSectionCollection entries={profile.idioms_info} form_definition={user_forms[USER_IDIOM_INFO]} />
      </div>
    </div>
  );
};

export default UserProfileForm;
