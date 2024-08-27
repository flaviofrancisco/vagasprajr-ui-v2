'use client';
import ContextMenuFilter from '@/components/context-menus/context-menu-filter';
import Pagination from '@/components/tables/pagination';
import Table, { Column, ContextMenuFilterState, Sort } from '@/components/tables/table';
import useAxiosPrivate from '@/hooks/private-axios';
import jobsSlice, { getJobs, updateJob } from '@/services/jobs/jobs.service';
import { useAppDispatch } from '@/services/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';

const JobsAdminPage: React.FC = () => {
  const [contextMenuFilterState, setContextMenuFilterState] = useState<ContextMenuFilterState>({ clientX: 0, clientY: 0, visible: false, column: null });

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { jobsResult, filter } = useSelector((state: any) => state.jobsSliceReducer);
  const { onFilterChange } = jobsSlice.actions;

  const columns = [
    { key: 'code', title: 'Código', type: 'string', columnSize: '15' },
    { key: 'title', title: 'Título', type: 'string', columnSize: '40', maxLength: 25, is_filter_enabled: true },
    { key: 'company_name', title: 'Empresa', type: 'string', columnSize: '20', is_filter_enabled: true },
    { key: 'provider', title: 'Fonte', type: 'string', columnSize: '20', is_filter_enabled: true },
    { key: 'is_approved', title: 'Aprovado', type: 'checkbox', columnSize: '20' },
    { key: 'is_closed', title: 'Encerrada', type: 'checkbox', columnSize: '20' },
    { key: 'url', title: 'Url', type: 'url', columnSize: '20' },
    { key: 'job_details_url', title: 'Detalhes', type: 'url', columnSize: '20' },
    { key: 'qty_clicks', title: 'Clicks', type: 'number', columnSize: '20' },
    { key: 'created_at', title: 'Desde', type: 'date', columnSize: '20', is_filter_enabled: false },
  ] as Column[];

  const onContextMenuFilter = (e: React.MouseEvent, column: Column) => {
    e.preventDefault();
    const { clientX, clientY } = e;
    setContextMenuFilterState({ clientX, clientY, visible: column?.is_filter_enabled ?? true, column: column });
  };

  const onCloseContextMenuFilter = () => {
    setContextMenuFilterState({ clientX: 0, clientY: 0, visible: false, column: null });
  };

  const onPageChange = (page: number) => {
    dispatch(getJobs({ axiosPrivate, filters: { ...filter, page } }));
  };

  const onCheckBoxChange = (e: any, row: any, column: any) => {
    dispatch(updateJob({ axiosPrivate, body: { ...row, [column.key]: e.target.checked } })).then(() => {
      dispatch(getJobs({ axiosPrivate, filters: { ...filter } }));
      toast.success('Vaga alterada com sucesso!');
    });
  };

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
    dispatch(getJobs({ axiosPrivate, filters: { ...filter } }));
  }, [axiosPrivate, dispatch, filter]);

  return (
    <main className="grid mt-10 mb-10 w-full flex-grow">
      <ContextMenuFilter
        clientX={contextMenuFilterState.clientX}
        clientY={contextMenuFilterState.clientY}
        visible={contextMenuFilterState.visible}
        column={contextMenuFilterState.column}
        close={onCloseContextMenuFilter}
        onFilter={onFilter}
      />
      <Toaster richColors />
      <Table filters={filter} onSort={onSortColumn} value={jobsResult} columns={columns} onChekboxChange={onCheckBoxChange} onContextMenu={() => {}} onContextMenuFilter={onContextMenuFilter} />
      <Pagination currentPage={jobsResult.Page} pageSize={jobsResult.PerPage} totalItems={jobsResult.Total} onPageChange={onPageChange} />
    </main>
  );
};

export default JobsAdminPage;
