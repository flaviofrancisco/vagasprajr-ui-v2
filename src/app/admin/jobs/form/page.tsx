'use client';

import useAxiosPrivate from '@/hooks/private-axios';
import jobsSlice, { createJob, getJobAsAdmin, updateJob } from '@/services/jobs/jobs.service';
import { useAppDispatch } from '@/services/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import EntryForm, { Field } from '@/components/forms/common/entry-form.component';
import { useSelector } from 'react-redux';
import { Toaster } from 'sonner';

interface JobFormProps {
  code?: string;
}

const JobForm: React.FC<JobFormProps> = ({ code }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { onChangeFieldInput } = jobsSlice.actions;
  const { job } = useSelector((state: any) => state.jobsSliceReducer);

  const formDefinition: Field[] = [
    {
      name: 'code',
      label: 'Código',
      type: 'text',
      disabled: true,
      onchange: (value: any, field: string) => {},
    },
    {
      name: 'created_at',
      label: 'Desde',
      type: 'string',
      disabled: true,
      onchange: (value: any, field: string) => {},
    },
    {
      name: 'title',
      label: 'Título',
      type: 'text',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'company_name',
      label: 'Empresa',
      type: 'text',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'provider',
      label: 'Fonte',
      type: 'text',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'is_approved',
      label: 'Aprovado',
      type: 'checkbox',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'is_closed',
      label: 'Encerrada',
      type: 'checkbox',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'url',
      label: 'Url',
      type: 'text',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'job_details_url',
      label: 'Detalhes',
      type: 'text',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'qty_clicks',
      label: 'Clicks',
      disabled: true,
      type: 'number',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
  ];

  const onSubmit = () => {
    if (code) {
      dispatch(updateJob({ axiosPrivate, body: { ...job } })).then((result) => {
        if (result?.type === updateJob.fulfilled.type) {
          router.back();
        }
      });
    } else {
      dispatch(createJob({ axiosPrivate, body: { ...job } })).then((result) => {
        if (result?.type === createJob.fulfilled.type) {
          router.back();
        }
      });
    }
  };

  useEffect(() => {
    if (code) {
      dispatch(getJobAsAdmin({ axiosPrivate, code: code }));
    } else {
    }
  }, [axiosPrivate, code, dispatch]);

  return (
    <>
      <Toaster richColors />
      <EntryForm fields={formDefinition} entry={job} onReturn={() => router.back()} onSubmit={onSubmit} />
    </>
  );
};

export default JobForm;
