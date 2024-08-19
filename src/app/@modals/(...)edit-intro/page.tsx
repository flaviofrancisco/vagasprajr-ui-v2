'use client';
import EditIntro from '@/components/forms/users/modals/edit-intro.component';
import { Modal } from '@/components/modals/modal';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import { doUpdateUserProfile } from '@/services/users/users.service';
import { useRouter } from 'next/navigation';
import { useSelector } from 'react-redux';

export default function EditIntroModal() {
  const router = useRouter();
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

  return (
    <Modal onClose={onClose} onSave={onSave} title="Dados pessoais">
      <EditIntro onSubmit={onSave} />
    </Modal>
  );
}
