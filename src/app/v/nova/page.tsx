'use client';
import withAuth from '@/components/common/with-auth.component';
import useAxiosPrivate from '@/hooks/private-axios';
import jobsSlice, { createJob } from '@/services/jobs/jobs.service';
import { useAppDispatch } from '@/services/store';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';

const NewJobPage: React.FC = () => {
  const [isValid, setIsValid] = useState(false);

  const formRef = useRef<HTMLFormElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { onChangeCreateJobValue } = jobsSlice.actions;
  const { createBody } = useSelector((state: any) => state.jobsSliceReducer);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const body = {
      title: formData.get('title') as string,
      company_name: formData.get('company_name') as string,
      location: formData.get('location') as string,
      salary: formData.get('salary') as string,
      url: formData.get('url') as string,
      description: formData.get('description') as string,
    };
    await dispatch(createJob({ axiosPrivate, body }));
    toast.success('Vaga criada com sucesso!');
  };

  useEffect(() => {
    if (createBody.title && createBody.company_name && createBody.location && createBody.salary && (createBody.url || createBody.description)) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
  }, [createBody]);

  useEffect(() => {
    errRef.current?.classList.add('hidden');
    try {
      if (createBody?.url) {
        const url = new URL(createBody.url);
        if (url.protocol !== 'http:' && url.protocol !== 'https:') {
          errRef.current?.classList.remove('hidden');
          setIsValid(false);
        } else {
          errRef.current?.classList.add('hidden');
        }
      }
    } catch {
      errRef.current?.classList.remove('hidden');
      setIsValid(false);
    }
  }, [createBody?.url]);

  return (
    <main>
      <Toaster richColors />
      <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-md m-10 dark:bg-gray-800 dark:text-white">
        <label className="flex flex-col gap-1 m-1" htmlFor="title">
          Título
          <input
            name="title"
            id="title"
            value={createBody.title}
            required
            onChange={(event) => dispatch(onChangeCreateJobValue({ title: event.target.value }))}
            className="border border-gray-300 w-full dark:bg-gray-600 rounded-md p-2"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-1 m-1" htmlFor="company_name">
          Empresa
          <input
            name="company_name"
            id="company_name"
            required
            value={createBody.company_name}
            onChange={(event) => dispatch(onChangeCreateJobValue({ company_name: event.target.value }))}
            className="border border-gray-300 w-full dark:bg-gray-600 rounded-md p-2"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-1 m-1" htmlFor="location">
          Localização
          <input
            name="location"
            id="location"
            required
            value={createBody.location}
            onChange={(event) => dispatch(onChangeCreateJobValue({ location: event.target.value }))}
            className="border border-gray-300 w-full dark:bg-gray-600 rounded-md p-2"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-1 m-1" htmlFor="salary">
          Salário
          <input
            name="salary"
            id="salary"
            value={createBody.salary}
            onChange={(event) => dispatch(onChangeCreateJobValue({ salary: event.target.value }))}
            className="border border-gray-300 w-full dark:bg-gray-600 rounded-md p-2"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-1 m-1" htmlFor="url">
          Link
          <input
            name="url"
            id="url"
            value={createBody.url}
            onChange={(event) => dispatch(onChangeCreateJobValue({ url: event.target.value }))}
            className="border border-gray-300 w-full dark:bg-gray-600 rounded-md p-2"
            type="text"
          />
        </label>
        <p ref={errRef} className="hidden text-red-500">
          URL inválida
        </p>
        <label className="flex flex-col gap-1 m-1" htmlFor="description">
          Descrição
          <textarea
            name="description"
            id="description"
            value={createBody.description}
            onChange={(event) => dispatch(onChangeCreateJobValue({ description: event.target.value }))}
            className="border h-40 border-gray-300 w-full dark:bg-gray-600 rounded-md p-2"
          />
        </label>
        <button disabled={!isValid} className={`${!isValid ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500'} text-white rounded-md p-2`} type="submit">
          Criar
        </button>
      </form>
    </main>
  );
};

export default NewJobPage;
