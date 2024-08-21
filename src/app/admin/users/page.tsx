'use client';
import Table, { Sort } from '@/components/tables/table';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import usersAdminSlice, { doGetUsers } from '@/services/users/users.admin.service';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const UserAdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { usersResult, filters } = useSelector((state: any) => state.usersAdminSliceReducer);
  const { onFilterChange } = usersAdminSlice.actions;
  const columns = [
    { key: 'email', title: 'Email', type: 'string', columnSize: '40', maxLength: 25 },
    { key: 'first_name', title: 'Nome', type: 'string', columnSize: '20' },
    { key: 'last_name', title: 'Sobrenome(s)', type: 'string', columnSize: '20' },
    { key: 'user_name', title: 'Usuário', type: 'string', columnSize: '15' },
    { key: 'city', title: 'Cidade', type: 'string', columnSize: '40' },
    { key: 'state', title: 'UF', type: 'string', columnSize: '10' },
    { key: 'created_at', title: 'Desde', type: 'date', columnSize: '32' },
    { key: 'last_update', title: 'Atualização', type: 'date', columnSize: '32' },
    { key: 'last_login', title: 'Conexão', type: 'date', columnSize: '32' },
  ];

  const onSortColumn = (key: string, direction: Sort) => {
    if (!key) return;

    if (filters.is_ascending && direction === Sort.ASC) {
      direction = Sort.DESC;
    } else if (!filters.is_ascending && direction === Sort.DESC) {
      direction = Sort.ASC;
    } else {
      direction = Sort.ASC;
    }

    dispatch(onFilterChange({ ...filters, sort: key, is_ascending: direction === Sort.ASC }));
  };

  useEffect(() => {
    dispatch(doGetUsers({ axiosPrivate, filters: { ...filters } }));
  }, [axiosPrivate, dispatch, filters]);

  return (
    <main className="grid place-items-center w-full h-screen">
      <Table filters={filters} onSort={onSortColumn} value={usersResult} columns={columns} />
    </main>
  );
};

export default UserAdminPage;
