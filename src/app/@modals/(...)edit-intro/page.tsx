'use client';
import EditIntro from '@/components/forms/users/modals/edit-intro.component';
import { Modal } from '@/components/modals/modal';
import { useRouter } from 'next/navigation';

export default function EditIntroModal() {
  const router = useRouter();
  const onClose = () => {
    router.back();
  };
  return (
    <Modal onClose={onClose}>
      <EditIntro />
    </Modal>
  );
}
