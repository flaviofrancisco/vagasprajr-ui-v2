'use client';
import withAuth from '@/components/common/with-auth.component';
import ContextMenu from '@/components/context-menus/context-menu';
import ContextMenuFilter from '@/components/context-menus/context-menu-filter';
import Confirm from '@/components/modals/dialog/confirm-dialog';
import Pagination from '@/components/tables/pagination';
import Table, { Column, Sort } from '@/components/tables/table';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import usersAdminSlice, { doDeleteUser, doGetUsers } from '@/services/users/users.admin.service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';

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
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedData, setSelectedData] = useState<any>(null);
  const [contextMenuState, setContextMenuState] = useState({ clientX: 0, clientY: 0, visible: false, data: null });
  const [contextMenuFilterState, setContextMenuFilterState] = useState<ContextMenuFilterState>({ clientX: 0, clientY: 0, visible: false, column: null });

  const { usersResult, filters } = useSelector((state: any) => state.usersAdminSliceReducer);
  const { onFilterChange } = usersAdminSlice.actions;
  const columns = [
    { key: 'email', title: 'Email', type: 'string', columnSize: '1/2', maxLength: 25 },
    { key: 'first_name', title: 'Nome', type: 'string', columnSize: '20' },
    { key: 'last_name', title: 'Sobrenome(s)', type: 'string', columnSize: '20' },
    { key: 'user_name', title: 'Usuário', type: 'string', columnSize: '10' },
    { key: 'city', title: 'Cidade', type: 'string', columnSize: '10' },
    { key: 'state', title: 'UF', type: 'string', columnSize: '5' },
    { key: 'created_at', title: 'Desde', type: 'date', columnSize: '10' },
    { key: 'last_update', title: 'Atualização', type: 'date', columnSize: '10' },
    { key: 'last_login', title: 'Conexão', type: 'date', columnSize: '10' },
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

    const { key, type } = column;

    const filter = {
      operator: 'and',
      fields: [
        {
          type: type,
          name: key,
          value: value,
        },
      ],
    };

    setContextMenuFilterState({ clientX: 0, clientY: 0, visible: false, column: null });
    dispatch(onFilterChange({ ...filters, page: 0, filters: [filter] }));
  };

  const onEdit = (data: any) => {
    router.push(`/admin/users/${data.id}`);
  };

  const onDelete = (data: any) => {
    setSelectedData(data);
    setConfirmOpen(true);
  };

  const handleDeletion = () => {
    const execute = async function deleteUser() {
      try {
        const result = await dispatch(doDeleteUser({ axiosPrivate, userId: selectedData.id }));
        if (doDeleteUser.fulfilled.match(result)) {
          await dispatch(doGetUsers({ axiosPrivate, filters: { ...filters } }));
          toast.success('Usuário excluído com sucesso!');
        }
      } catch (error) {
        console.error(error);
      }
    };
    execute();
  };

  return (
    <main className="grid mt-10 mb-10 w-full flex-grow">
      <Toaster richColors />
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
        onDelete={() => onDelete(contextMenuState.data)}
        data={contextMenuState.data}
        clientX={contextMenuState.clientX}
        clientY={contextMenuState.clientY}
        visible={contextMenuState.visible}
        close={onCloseContextMenu}
      />
      <Confirm title="Deletar usuário?" open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={handleDeletion}>
        Você tem certeza que deseja excluir o usuário?
      </Confirm>
      <Table filters={filters} onSort={onSortColumn} value={usersResult} columns={columns} onContextMenu={onContextMenu} onContextMenuFilter={onContextMenuFilter} />
      <Pagination title={'Usuários:'} currentPage={filters.page} pageSize={filters.page_size} totalItems={usersResult.Total} onPageChange={(page) => dispatch(onFilterChange({ ...filters, page }))} />
    </main>
  );
};

export default withAuth(UserAdminPage);
