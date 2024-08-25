'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Modal } from '@/components/modals/modal';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import { useSelector } from 'react-redux';
import { doUpdateUserProfile } from '@/services/users/users.service';
import { user_forms, USER_TECH_EXPERIENCES_KEY } from '@/components/forms/users/user-profile-forms';
import ProfileAddItem from '@/components/forms/users/modals/profile-add-item.component';
import { FormEvent } from 'react';

const EditProfilePage: React.FC = () => {
  type UserFormKeys = keyof typeof user_forms;
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = {
    data: searchParams.get('data'),
  };

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { profile } = useSelector((state: any) => state.usersReducer);

  const onClose = () => {
    router.back();
  };
  const onSave = (e: FormEvent<HTMLFormElement>) => {
    if (!params?.data) {
      return;
    }

    const form = new FormData(e.target as HTMLFormElement);
    const data = getFormatedData(Object.fromEntries(form.entries()));

    const items = profile[params.data] || [];
    const nextId = items.length > 0 ? Math.max(...items.map((item: any) => item.id)) + 1 : 1;

    dispatch(doUpdateUserProfile({ axiosPrivate, profile: { ...profile, [params.data]: [...items, { ...data, id: nextId }] } })).then(() => {
      router.back();
    });
  };

  const getFormatedData = (data: any) => {
    if (typeof params?.data === 'undefined' || params?.data === null) {
      return data;
    }

    const fields = user_forms[params.data as UserFormKeys].form_definition;

    Object.keys(data).forEach((key) => {
      if (data[key] === '') {
        data[key] = null;
      }
      fields.forEach((field) => {
        if (field.name === key && field.type === 'number') {
          data[key] = parseInt(data[key], 10);
        }
      });
    });
    return data;
  };

  const renderForm = () => {
    switch (params.data) {
      case USER_TECH_EXPERIENCES_KEY:
        return <ProfileAddItem onSubmit={onSave} fieldDefintion={user_forms[params.data].form_definition} />;
      default:
        return <div>{`Formulário inválido para parametro: ${params?.data ?? 'Não informado'} ou em desenvolvimento. Por favor tente mais tarde.`}</div>;
    }
  };

  return (
    <Modal onClose={onClose} onSave={onSave} title="Novo">
      <>{renderForm()}</>
    </Modal>
  );
};

export default EditProfilePage;
