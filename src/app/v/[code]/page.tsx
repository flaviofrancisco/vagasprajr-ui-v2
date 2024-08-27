'use client';
import { getJob } from '@/services/jobs/jobs.service';
import { useAppDispatch } from '@/services/store';
import Link from 'next/link';
import { useParams, useRouter, redirect, permanentRedirect } from 'next/navigation';
import { use, useEffect } from 'react';
import { useSelector } from 'react-redux';

const JobDetailPage: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const params = useParams();
  const code = Array.isArray(params.code) ? params.code[0] : params.code;

  const { jobView, status } = useSelector((state: any) => state.jobsSliceReducer);

  useEffect(() => {
    if (!code) {
      return;
    }
    dispatch(getJob({ code })).then(() => {
      router.push(`/v/${code}`);
    });
  }, [dispatch, code, router]);

  const getBrFormatedDate = (date: string) => {
    if (date === '') {
      return '';
    }
    const dateObj = new Date(date);
    return dateObj.toLocaleDateString('pt-BR');
  };

  const formatDescription = (description: string) => {
    return description.replace(/\n/g, '<br />');
  };

  return (
    <main className="flex-grow">
      <div className="container mx-auto p-10">
        {status === 'loading' && <p>Loading...</p>}
        <h1 className="text-3xl font-bold mt-10 mb-4">{jobView.title}</h1>
        <h2 className="text-xl font-bold mb-4">{jobView.company_name}</h2>
        <Link className="text-lg mb-4 mt-4 font-bold" href={jobView.url} target="_blank" rel="noopener noreferrer">
          {jobView.url}
        </Link>
        <p className="text-lg mt-4 mb-4">{jobView.location}</p>
        <p className="text-lg mb-4">{jobView.salary}</p>
        <p className="text-lg mb-4">{getBrFormatedDate(jobView.created_at)}</p>
        <div className="text-lg mb-4" dangerouslySetInnerHTML={{ __html: formatDescription(jobView.description) }} />
      </div>
    </main>
  );
};

export default JobDetailPage;
