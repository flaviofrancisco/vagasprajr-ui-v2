'use client';
import { useAppDispatch } from '@/services/store';
import styles from './user-profile-form.module.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { doGetUserProfile } from '@/services/users/users.service';
import useAxiosPrivate from '@/hooks/private-axios';
import { stringify } from 'querystring';
import Link from 'next/link';

const UserProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { profile } = useSelector((state: any) => state.usersReducer);

  useEffect(() => {
    dispatch(doGetUserProfile({ axiosPrivate }));
  }, [axiosPrivate, dispatch]);

  return (
    <div className="flex block w-4/5 sm:w-9/10  p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
      <div className="break-words overflow-hidden text-ellipsis">
        <p>
          {profile.first_name} {profile.last_name}
        </p>
        <p>
          {profile.city} {profile.state}
        </p>
        <p>{profile.email}</p>
        <p className="mt-4">
          <ul>
            {profile.links.map((link: any, index: number) => (
              <li className="mt-2 text-gray-400" key={index}>
                <Link href={link.url}>{link.url}</Link>
              </li>
            ))}
          </ul>
        </p>
      </div>
    </div>
  );
};

export default UserProfileForm;
