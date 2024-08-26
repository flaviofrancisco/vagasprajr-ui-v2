'use client';
import withAuth from '@/components/common/with-auth.component';
import useAxiosPrivate from '@/hooks/private-axios';
import jobsSlice, { createJob } from '@/services/jobs/jobs.service';
import { useAppDispatch } from '@/services/store';
import { useSelector } from 'react-redux';
import { Toaster, toast } from 'sonner';

const NewJobPage: React.FC = () => {
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
    };
    if (!body.title || !body.company_name || !body.location || !body.salary || !body.url) {
      toast.error('Preencha todos os campos!');
      return;
    }
    await dispatch(createJob({ axiosPrivate, body }));
    toast.success('Vaga criada com sucesso!');
  };

  return (
    <main>
      <Toaster richColors />
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 w-full max-w-md mx-auto p-4 bg-white shadow-md rounded-md m-10">
        <label className="flex flex-col gap-1 m-1" htmlFor="title">
          Título
          <input
            name="title"
            id="title"
            value={createBody.title}
            onChange={(event) => dispatch(onChangeCreateJobValue({ title: event.target.value }))}
            className="border border-gray-300 w-full rounded-md p-2"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-1 m-1" htmlFor="company">
          Empresa
          <input
            name="company_name"
            id="company_name"
            value={createBody.company_name}
            onChange={(event) => dispatch(onChangeCreateJobValue({ company_name: event.target.value }))}
            className="border border-gray-300 w-full rounded-md p-2"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-1 m-1" htmlFor="location">
          Localização
          <input
            name="location"
            id="location"
            value={createBody.location}
            onChange={(event) => dispatch(onChangeCreateJobValue({ location: event.target.value }))}
            className="border border-gray-300 w-full rounded-md p-2"
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
            className="border border-gray-300 w-full rounded-md p-2"
            type="text"
          />
        </label>
        <label className="flex flex-col gap-1 m-1" htmlFor="link">
          Link
          <input
            name="url"
            id="url"
            value={createBody.url}
            onChange={(event) => dispatch(onChangeCreateJobValue({ url: event.target.value }))}
            className="border border-gray-300 w-full rounded-md p-2"
            type="text"
          />
        </label>
        <button className="bg-blue-500 text-white rounded-md p-2" type="submit">
          Criar
        </button>
      </form>
    </main>
  );
};

export default withAuth(NewJobPage);
