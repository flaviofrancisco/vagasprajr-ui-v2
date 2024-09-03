'use client';
import withAuth from '@/components/common/with-auth.component';
import EntryForm, { Field } from '@/components/forms/common/entry-form.component';
import useAxiosPrivate from '@/hooks/private-axios';
import amazonAssociateSlice, { createAdReference, getAdReference, updateAdReference } from '@/services/amazon/amazon-associate.service';

import { useAppDispatch } from '@/services/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';

interface AmazonAdReferenceFormProps {
  id?: string;
}

const AmazonAdReferenceForm: React.FC<AmazonAdReferenceFormProps> = ({ id }) => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const { adReference } = useSelector((state: any) => state.amazonAssociateSliceReducer);
  const { onChangeFieldInput, onResetAdReference } = amazonAssociateSlice.actions;

  useEffect(() => {
    if (id) {
      dispatch(getAdReference({ axiosPrivate, id: id }));
    } else {
      dispatch(onResetAdReference());
    }
  }, [axiosPrivate, dispatch, id, onResetAdReference]);

  const formDefinition: Field[] = [
    {
      name: 'description',
      label: 'Description',
      type: 'text',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'is_active',
      label: 'Active',
      type: 'checkbox',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'image_url',
      label: 'Image URL',
      type: 'text',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
    {
      name: 'url',
      label: 'URL',
      type: 'text',
      onchange: (value: any, field: string) => {
        dispatch(onChangeFieldInput({ [field]: value }));
      },
    },
  ];

  const onSubmit = () => {
    if (!id) {
      dispatch(createAdReference({ axiosPrivate, adReference })).then((result) => {
        if (result?.type === createAdReference.fulfilled.type) {
          toast.success('Referência criada com sucesso!');
          router.back();
        } else {
          toast.error('Erro ao criar referência!');
        }
      });
    } else {
      dispatch(updateAdReference({ axiosPrivate, id, adReference })).then(() => {
        toast.success('Referência atualizada com sucesso!');
        router.back();
      });
    }
  };

  const handleBack = () => {
    router.back();
  };

  return (
    <>
      <Toaster richColors />
      <EntryForm fields={formDefinition} entry={adReference} onReturn={() => handleBack()} onSubmit={onSubmit} />
    </>
  );
};

export default AmazonAdReferenceForm;
