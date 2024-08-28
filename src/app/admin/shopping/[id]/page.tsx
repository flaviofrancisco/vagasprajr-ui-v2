'use client';
import EntryForm, { Field } from '@/components/forms/common/entry-form.component';
import useAxiosPrivate from '@/hooks/private-axios';
import amazonAssociateSlice, { getAdReference, updateAdReference } from '@/services/amazon/amazon-associate.service';

import { useAppDispatch } from '@/services/store';
import { useParams } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast, Toaster } from 'sonner';

const AdReferencePage: React.FC = () => {
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();

  const params = useParams();
  const id = Array.isArray(params.id) ? params.id[0] : params.id;

  const { adReference } = useSelector((state: any) => state.amazonAssociateSliceReducer);
  const { onChangeFieldInput } = amazonAssociateSlice.actions;

  useEffect(() => {
    dispatch(getAdReference({ axiosPrivate, id: id }));
  }, [axiosPrivate, dispatch, id]);

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
    dispatch(updateAdReference({ axiosPrivate, id, adReference })).then(() => {
      toast.success('Dados atualizados com sucesso!');
    });
  };

  return (
    <main className="grid w-full mt-10 mb-10 place-items-center">
      <Toaster richColors />
      <EntryForm fields={formDefinition} entry={adReference} onSubmit={onSubmit} />
    </main>
  );
};

export default AdReferencePage;
