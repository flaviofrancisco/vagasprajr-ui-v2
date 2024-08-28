'use client';
import UserTechExperiences from '@/components/forms/users/profile/sections/experiences/user-tech-experiences';
import UserLinks from '@/components/forms/users/profile/sections/links/user-links';
import UserProfileSection from '@/components/forms/users/profile/sections/user-profile-section';
import UserProfileSectionCollection from '@/components/forms/users/profile/sections/user-profile-section-collection';
import {
  user_forms,
  USER_PERSONAL_INFO_KEY,
  USER_ABOUT_ME_KEY,
  USER_EXPERIENCES_KEY,
  USER_EDUCATIONS_KEY,
  USER_CERTIFICATIONS_KEY,
  USER_IDIOM_INFO,
} from '@/components/forms/users/user-profile-forms';
import { useAppDispatch } from '@/services/store';
import { doGetUserPublicProfile } from '@/services/users/users.service';
import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import ProfileLinkPreview from './profile-linkpreview';

const ProfilePage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const dispatch = useAppDispatch();
  const username = Array.isArray(params.username) ? params.username[0] : params.username;

  const { profile } = useSelector((state: any) => state.usersReducer);

  useEffect(() => {
    if (!username) {
      return;
    }
    dispatch(doGetUserPublicProfile({ userName: username })).then((result_action) => {
      if (doGetUserPublicProfile.fulfilled.match(result_action)) {
        router.push(`/im/${username}`);
      } else {
        router.push('/404');
      }
    });
  }, [dispatch, username, router]);

  return (
    <main className="place-items-center grid mt-10 mb-10 w-full items-center flex-grow">
      <ProfileLinkPreview url={`https://vagasprajr.com.br/im/${username}`} />
      <div className={`grid flex-grow place-items-center h-screenflex items-start block w-4/5 sm:w-9/10 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700`}>
        <div className="w-full items-start">
          <UserProfileSection readonly={true} profile={profile} form_definition={user_forms[USER_PERSONAL_INFO_KEY]} />
          <UserProfileSection readonly={true} profile={profile} form_definition={user_forms[USER_ABOUT_ME_KEY]} />
          <UserTechExperiences readonly={true} tech_experiences={profile.tech_experiences} />
          <UserLinks readonly={true} links={profile.links} />
          <UserProfileSectionCollection readonly={true} entries={profile.experiences} form_definition={user_forms[USER_EXPERIENCES_KEY]} />
          <UserProfileSectionCollection readonly={true} entries={profile.educations} form_definition={user_forms[USER_EDUCATIONS_KEY]} />
          <UserProfileSectionCollection readonly={true} entries={profile.certifications} form_definition={user_forms[USER_CERTIFICATIONS_KEY]} />
          <UserProfileSectionCollection readonly={true} entries={profile.idioms_info} form_definition={user_forms[USER_IDIOM_INFO]} />
        </div>
      </div>
    </main>
  );
};

export default ProfilePage;
