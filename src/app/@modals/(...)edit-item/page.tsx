'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Modal } from '@/components/modals/modal';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import { useSelector } from 'react-redux';
import { doUpdateUserProfile } from '@/services/users/users.service';
import { USER_ABOUT_ME_KEY, user_forms, USER_PERSONAL_INFO_KEY } from '@/components/forms/users/user-profile-forms';
import ProfileEdit from '@/components/forms/users/modals/profile-edit.component';

const EditProfilePage: React.FC = () => {
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
  const onSave = () => {
    dispatch(doUpdateUserProfile({ axiosPrivate, profile: profile })).then(() => {
      router.back();
    });
  };

  const renderForm = () => {
    switch (params.data) {
      case USER_PERSONAL_INFO_KEY:
      case USER_ABOUT_ME_KEY:
        return <ProfileEdit onSubmit={onSave} fieldDefintion={user_forms[params.data].form_definition} />;
      default:
        return <div>{`Formulário inválido para parametro: ${params?.data ?? 'Não informado'} ou em desenvolvimento. Por favor tente mais tarde.`}</div>;
    }
  };

  return (
    <Modal onClose={onClose} onSave={onSave} title="Editar">
      <>{renderForm()}</>
    </Modal>
  );
};

export default EditProfilePage;
