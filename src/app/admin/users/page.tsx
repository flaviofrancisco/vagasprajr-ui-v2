'use client';
import Loading from '@/components/common/loading';
import Table from '@/components/tables/table';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import { doGetUsers } from '@/services/users/users.admin.service';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserAdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { usersResult, filters, status } = useSelector((state: any) => state.usersAdminSliceReducer);

  const columns = [
    { key: 'email', title: 'Email', type: 'string' },
    { key: 'first_name', title: 'First Name', type: 'string' },
    { key: 'last_name', title: 'Last Name', type: 'string' },
    { key: 'user_name', title: 'User Name', type: 'string' },
    { key: 'city', title: 'City', type: 'string' },
    { key: 'state', title: 'State', type: 'string' },
    { key: 'created_at', title: 'Created At', type: 'date' },
    { key: 'last_update', title: 'Last Update', type: 'date' },
    { key: 'last_login', title: 'Last Login', type: 'date' },
  ];

  const onSort = (key: string, direction: string) => {};

  useEffect(() => {
    dispatch(doGetUsers({ axiosPrivate, filters: { ...filters } }));
  }, [axiosPrivate, dispatch, filters]);

  return (
    <>
      <main className="grid place-items-center w-full h-screen">{status === 'loading' ? <Loading /> : <Table value={usersResult} columns={columns} />}</main>
    </>
  );
};

export default UserAdminPage;
