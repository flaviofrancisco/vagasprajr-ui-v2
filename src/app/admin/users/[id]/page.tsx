'use client';
import UserProfileForm from '@/components/forms/users/profile/user-profile-form.component';
import { useParams } from 'next/navigation';
const UserProfilePage: React.FC = () => {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  return <main className="grid w-full mt-10 mb-10 place-items-center">{userId && <UserProfileForm userId={userId} />}</main>;
};

export default UserProfilePage;
