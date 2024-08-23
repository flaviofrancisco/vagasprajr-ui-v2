'use client';
import withAuth from '@/components/common/with-auth.component';
import UserProfileForm from '@/components/forms/users/profile/user-profile-form.component';

const ProfilePage: React.FC = () => {
  return (
    <main className="grid w-full mt-10 mb-10 place-items-center">
      <UserProfileForm />
    </main>
  );
};

export default withAuth(ProfilePage);
