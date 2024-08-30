import React from 'react';
import AmazonAdReferenceForm from '../form/amazon-form';
import withAuth from '@/components/common/with-auth.component';

const NewAmazonAdReferencePage = () => {
  return (
    <main>
      <AmazonAdReferenceForm />
    </main>
  );
};

export default withAuth(NewAmazonAdReferencePage);
