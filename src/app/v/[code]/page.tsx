'use client';
import { getJob } from '@/services/jobs/jobs.service';
import { useAppDispatch } from '@/services/store';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const JobDetailPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams();
  const code = Array.isArray(params.code) ? params.code[0] : params.code;

  const { jobView, status } = useSelector((state: any) => state.jobsSliceReducer);

  useEffect(() => {
    if (!code) {
      return;
    }
    dispatch(getJob({ code }));
  }, [dispatch, code]);

  return (
    <main className="flex-grow">
      <div className="container mx-auto">
        {status === 'loading' && <p>Loading...</p>}
        <h1 className="text-3xl font-bold mt-10 mb-4">{jobView.title}</h1>
        <h2 className="text-xl font-bold mb-4">{jobView.company_name}</h2>
        <p className="text-lg mb-4">{jobView.location}</p>
        <p className="text-lg mb-4">{jobView.salary}</p>
        <p className="text-lg mb-4">{jobView.created_at}</p>
        <p className="text-lg mb-4">{jobView.description}</p>
      </div>
    </main>
  );
};

export default JobDetailPage;
