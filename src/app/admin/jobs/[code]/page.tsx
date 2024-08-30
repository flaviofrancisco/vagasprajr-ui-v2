'use client';
import { useParams } from 'next/navigation';
import JobForm from '../form/job-form';
import withAuth from '@/components/common/with-auth.component';

const EditJobPage: React.FC = () => {
  const params = useParams();
  const code = Array.isArray(params.code) ? params.code[0] : params.code;
  return <JobForm code={code} />;
};

export default withAuth(EditJobPage);
