'use client';
import Pagination from '@/components/tables/pagination';
import Table, { Sort } from '@/components/tables/table';
import useAxiosPrivate from '@/hooks/private-axios';
import { updateJob } from '@/services/jobs/jobs.service';
import searchSlice, { doSearchAuth } from '@/services/search/search.service';
import { useAppDispatch } from '@/services/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';

const JobsAdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { searchResult, searchFilter } = useSelector((state: any) => state.searchReducer);
  const { onFilterChange } = searchSlice.actions;

  const columns = [
    { key: 'code', title: 'Código', type: 'string', columnSize: '15' },
    { key: 'title', title: 'Título', type: 'string', columnSize: '40', maxLength: 25 },
    { key: 'company_name', title: 'Empresa', type: 'string', columnSize: '20' },
    { key: 'is_approved', title: 'Aprovado', type: 'checkbox', columnSize: '20' },
    { key: 'is_closed', title: 'Encerrada', type: 'checkbox', columnSize: '20' },
    { key: 'url', title: 'Url', type: 'url', columnSize: '20' },
    { key: 'job_details_url', title: 'Detalhes', type: 'url', columnSize: '20' },
    { key: 'qty_clicks', title: 'Clicks', type: 'number', columnSize: '20' },
    { key: 'created_at', title: 'Desde', type: 'date', columnSize: '20' },
  ];

  const onPageChange = (page: number) => {
    dispatch(doSearchAuth({ axiosPrivate, filter: { ...searchFilter, page } }));
  };

  const onCheckBoxChange = (e: any, row: any, column: any) => {
    dispatch(updateJob({ axiosPrivate, body: { ...row, [column.key]: e.target.checked } })).then(() => {
      dispatch(doSearchAuth({ axiosPrivate, filter: { ...searchFilter } }));
      toast.success('Vaga alterada com sucesso!');
    });
  };

  const onSortColumn = (key: string, direction: Sort) => {
    if (!key) return;
    if (searchFilter.is_ascending && direction === Sort.ASC) {
      direction = Sort.DESC;
    } else if (!searchFilter.is_ascending && direction === Sort.DESC) {
      direction = Sort.ASC;
    } else {
      direction = Sort.ASC;
    }
    dispatch(onFilterChange({ ...searchFilter, sort: key, is_ascending: direction === Sort.ASC }));
  };

  useEffect(() => {
    dispatch(doSearchAuth({ axiosPrivate, filter: { ...searchFilter } }));
  }, [axiosPrivate, dispatch, searchFilter]);

  return (
    <main className="grid mt-10 mb-10 w-full flex-grow">
      <Toaster richColors />
      <Table filters={searchFilter} onSort={onSortColumn} value={searchResult} columns={columns} onChekboxChange={onCheckBoxChange} onContextMenu={() => {}} onContextMenuFilter={() => {}} />
      <Pagination currentPage={searchResult.Page} pageSize={searchResult.PerPage} totalItems={searchResult.Total} onPageChange={onPageChange} />
    </main>
  );
};

export default JobsAdminPage;
