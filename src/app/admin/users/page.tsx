'use client';
import ContextMenu from '@/components/context-menus/context-menu';
import ContextMenuFilter from '@/components/context-menus/context-menu-filter';
import Pagination from '@/components/tables/pagination';
import Table, { Column, Sort } from '@/components/tables/table';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import usersAdminSlice, { doGetUsers } from '@/services/users/users.admin.service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

type ContextMenuFilterState = {
  clientX: number;
  clientY: number;
  visible: boolean;
  column: Column | null;
};

const UserAdminPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const [contextMenuState, setContextMenuState] = useState({ clientX: 0, clientY: 0, visible: false, data: null });
  const [contextMenuFilterState, setContextMenuFilterState] = useState<ContextMenuFilterState>({ clientX: 0, clientY: 0, visible: false, column: null });

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

  const onContextMenuFilter = (e: React.MouseEvent, column: Column) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setContextMenuFilterState({ clientX, clientY, visible: true, column: column });
  };

  const onContextMenu = (e: React.MouseEvent, data: any) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setContextMenuState({ clientX, clientY, visible: true, data: data });
  };

  const onCloseContextMenu = () => {
    setContextMenuState({ clientX: 0, clientY: 0, visible: false, data: null });
  };

  const onCloseContextMenuFilter = () => {
    setContextMenuFilterState({ clientX: 0, clientY: 0, visible: false, column: null });
  };

  const onFilter = (column: Column | null, value: any) => {
    if (!column) return;

    const { key } = column;

    const filter = {
      operator: 'and',
      fields: [
        {
          type: 'string',
          name: key,
          value: value,
        },
      ],
    };

    setContextMenuFilterState({ clientX: 0, clientY: 0, visible: false, column: null });
    dispatch(onFilterChange({ ...filters, page: 0, filters: [filter] }));
  };

  const onEdit = (data: any) => {
    router.push(`/admin/users/${data._id}`);
  };

  const onDelete = (data: any) => {};

  return (
    <main className="grid w-full flex-grow">
      <ContextMenuFilter
        clientX={contextMenuFilterState.clientX}
        clientY={contextMenuFilterState.clientY}
        visible={contextMenuFilterState.visible}
        column={contextMenuFilterState.column}
        close={onCloseContextMenuFilter}
        onFilter={onFilter}
      />
      <ContextMenu
        onEdit={() => onEdit(contextMenuState.data)}
        onDelete={() => console.log('Delete')}
        data={contextMenuState.data}
        clientX={contextMenuState.clientX}
        clientY={contextMenuState.clientY}
        visible={contextMenuState.visible}
        close={onCloseContextMenu}
      />
      <Table filters={filters} onSort={onSortColumn} value={usersResult} columns={columns} onContextMenu={onContextMenu} onContextMenuFilter={onContextMenuFilter} />
      <Pagination currentPage={filters.page} pageSize={filters.page_size} totalItems={usersResult.Total} onPageChange={(page) => dispatch(onFilterChange({ ...filters, page }))} />
    </main>
  );
};

export default UserAdminPage;
