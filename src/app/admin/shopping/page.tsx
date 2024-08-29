'use client';
import ContextMenu from '@/components/context-menus/context-menu';
import ContextMenuFilter from '@/components/context-menus/context-menu-filter';
import Pagination from '@/components/tables/pagination';
import Table, { Column, ContextMenuFilterState, Sort } from '@/components/tables/table';
import useAxiosPrivate from '@/hooks/private-axios';
import amazonAssociateSlice, { AdReference, deleteAdReference, getAdFilteredReferences, updateAdReference } from '@/services/amazon/amazon-associate.service';
import { useAppDispatch } from '@/services/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';
import { useRouter } from 'next/navigation';
import Confirm from '@/components/modals/dialog/confirm-dialog';

const ShoppingAdminPage: React.FC = () => {
  const router = useRouter();
  const [contextMenuFilterState, setContextMenuFilterState] = useState<ContextMenuFilterState>({ clientX: 0, clientY: 0, visible: false, column: null });
  const [contextMenuState, setContextMenuState] = useState({ clientX: 0, clientY: 0, visible: false, data: null });
  const [selectedData, setSelectedData] = useState<any>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { adReferenceResult, filter } = useSelector((state: any) => state.amazonAssociateSliceReducer);
  const { onFilterChange } = amazonAssociateSlice.actions;

  const columns = [
    { key: 'url', title: 'Url', type: 'url', columnSize: '5', is_filter_enabled: false },
    { key: 'description', title: 'Descrição', type: 'string', columnSize: '100', maxLength: 150, is_filter_enabled: true },
    { key: 'is_active', title: 'Ativo', type: 'checkbox', columnSize: '5', is_filter_enabled: false },
    { key: 'created_at', title: 'Desde', type: 'date', columnSize: '5', is_filter_enabled: false },
  ] as Column[];

  const onSortColumn = (key: string, direction: Sort) => {
    if (!key) return;
    if (filter.is_ascending && direction === Sort.ASC) {
      direction = Sort.DESC;
    } else if (!filter.is_ascending && direction === Sort.DESC) {
      direction = Sort.ASC;
    } else {
      direction = Sort.ASC;
    }
    dispatch(onFilterChange({ ...filter, sort: key, is_ascending: direction === Sort.ASC }));
  };

  const onContextMenu = (e: React.MouseEvent, data: any) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setContextMenuState({ clientX, clientY, visible: true, data: data });
  };

  const onCloseContextMenu = () => {
    setContextMenuState({ clientX: 0, clientY: 0, visible: false, data: null });
  };

  const onContextMenuFilter = (e: React.MouseEvent, column: Column) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setContextMenuFilterState({ clientX, clientY, visible: column?.is_filter_enabled ?? true, column: column });
  };

  const onCloseContextMenuFilter = () => {
    setContextMenuFilterState({ clientX: 0, clientY: 0, visible: false, column: null });
  };

  const onPageChange = (page: number) => {
    dispatch(getAdFilteredReferences({ axiosPrivate, filters: { ...filter, page } }));
  };

  const onEdit = (data: AdReference) => {
    router.push(`/admin/shopping/${data.id}`);
  };

  const onChangeCheckbox = (e: any, row: any, column: Column) => {   
    dispatch(updateAdReference({ axiosPrivate, id: row.id, adReference: { ...row, [column.key]: e.target.checked } })).then(() => {
      dispatch(getAdFilteredReferences({ axiosPrivate, filters: { ...filter } }));
      toast.success('Referência alterada com sucesso!');
    });
  };

  const onDeleteReference = () => {
    if (!selectedData?.id) return;
    dispatch(deleteAdReference({ axiosPrivate, id: selectedData.id })).then(() => {
      dispatch(getAdFilteredReferences({ axiosPrivate, filters: { ...filter } }));
      toast.success('Referência excluída com sucesso!');
    });
  };

  const onDelete = (data: any) => {
    setSelectedData(data);
    setConfirmOpen(true);
  };

  const onFilter = (column: Column | null, value: any) => {
    if (!column) return;

    const { key } = column;

    const current_filter = {
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
    dispatch(onFilterChange({ ...filter, page: 0, filters: [current_filter] }));
  };

  useEffect(() => {
    dispatch(getAdFilteredReferences({ axiosPrivate, filters: { ...filter } }));
  }, [axiosPrivate, dispatch, filter]);

  return (
    <main className="grid mt-10 mb-10 w-full flex-grow">
      <div>
        <Confirm title="Deletar referência?" open={confirmOpen} onClose={() => setConfirmOpen(false)} onConfirm={onDeleteReference}>
          Você tem certeza que deseja excluir esta referência?
        </Confirm>
      </div>
      <ContextMenuFilter
        clientX={contextMenuFilterState.clientX}
        clientY={contextMenuFilterState.clientY}
        visible={contextMenuFilterState.visible}
        column={contextMenuFilterState.column}
        close={onCloseContextMenuFilter}
        onFilter={onFilter}
      />
      <ContextMenu
        onCreate={() => router.push('/admin/shopping/new')}
        onEdit={onEdit}
        onDelete={(data) => onDelete(data)}
        data={contextMenuState.data}
        clientX={contextMenuState.clientX}
        clientY={contextMenuState.clientY}
        visible={contextMenuState.visible}
        close={onCloseContextMenu}
      />
      <Toaster richColors />
      <Table
        filters={filter}
        onSort={onSortColumn}
        value={adReferenceResult}
        columns={columns}
        onChekboxChange={onChangeCheckbox}
        onContextMenu={onContextMenu}
        onContextMenuFilter={onContextMenuFilter}
      />
      <Pagination currentPage={adReferenceResult.Page} pageSize={adReferenceResult.PerPage} totalItems={adReferenceResult.Total} onPageChange={onPageChange} />
    </main>
  );
};

export default ShoppingAdminPage;
