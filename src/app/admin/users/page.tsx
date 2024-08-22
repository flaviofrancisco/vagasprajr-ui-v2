'use client';
import ContextMenu from '@/components/context-menus/context-menu';
import Table, { Sort } from '@/components/tables/table';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import usersAdminSlice, { doGetUsers } from '@/services/users/users.admin.service';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const UserAdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [contextMenuState, setContextMenuState] = useState({ clientX: 0, clientY: 0, visible: false, data: null });
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

  const onContextMenu = (e: React.MouseEvent, data: any) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setContextMenuState({ clientX, clientY, visible: true, data: data });
  };

  const onCloseContextMenu = () => {
    setContextMenuState({ clientX: 0, clientY: 0, visible: false, data: null });
  };

  const onEdit = (data: any) => {};
  
  const onDelete = (data: any) => {};

  return (
    <main className="grid place-items-center w-full h-screen">
      <ContextMenu
        onEdit={() => console.log('Edit')}
        onDelete={() => console.log('Delete')}
        data={contextMenuState.data}
        clientX={contextMenuState.clientX}
        clientY={contextMenuState.clientY}
        visible={contextMenuState.visible}
        close={onCloseContextMenu}
      />
      <Table filters={filters} onSort={onSortColumn} value={usersResult} columns={columns} onContextMenu={onContextMenu} />
    </main>
  );
};

export default UserAdminPage;
