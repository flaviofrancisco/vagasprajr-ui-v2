'use client';
import { useAppDispatch } from '@/services/store';
import styles from './user-profile-form.module.scss';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { doGetUserProfile } from '@/services/users/users.service';
import useAxiosPrivate from '@/hooks/private-axios';
import { stringify } from 'querystring';
import Link from 'next/link';
import PencilSvg from '@/components/svg/pencil.svg';

const UserProfileForm: React.FC = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { profile } = useSelector((state: any) => state.usersReducer);

  useEffect(() => {
    dispatch(doGetUserProfile({ axiosPrivate }));
  }, [axiosPrivate, dispatch]);

  return (
    <div className={`flex items-start block w-4/5 sm:w-9/10 p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700`}>
      <div className="w-full items-start">
        <div>
          <Link href={'/edit-intro'} className="float-right">
            <PencilSvg className="h-6 w-6" />
          </Link>
        </div>
        <div className="break-words overflow-hidden text-ellipsis">
          <p>
            {profile.first_name} {profile.last_name}
          </p>
          <p>
            {profile.city} {profile.state}
          </p>
          <p>{profile.email}</p>
          <ul className="mt-4">
            {profile.links.map((link: any, index: number) => (
              <li className="mt-2 text-gray-400" key={index}>
                <Link href={link.url}>{link.url}</Link>
              </li>
            ))}
          </ul>{' '}
        </div>
      </div>
    </div>
  );
};

export default UserProfileForm;
