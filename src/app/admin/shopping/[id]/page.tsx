'use client';
import { useParams } from 'next/navigation';
import AmazonAdReferenceForm from '../form/amazon-form';
import withAuth from '@/components/common/with-auth.component';

const AdReferencePage: React.FC = () => {
  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;
  return (
    <main className="grid w-full mt-10 mb-10 place-items-center">
      <AmazonAdReferenceForm id={id} />
    </main>
  );
};

export default withAuth(AdReferencePage);
