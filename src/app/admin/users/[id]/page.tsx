'use client';
import UserProfileForm from '@/components/forms/users/profile/user-profile-form.component';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

const UserProfilePage: React.FC = () => {
  const params = useParams();
  const userId = Array.isArray(params.id) ? params.id[0] : params.id;
  return <main className="grid place-items-center h-screen">{userId && <UserProfileForm userId={userId} />}</main>;
};

export default UserProfilePage;
