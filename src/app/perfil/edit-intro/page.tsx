'use client';
import EditIntro from '@/components/forms/users/modals/edit-intro.component';
import { Modal } from '@/components/modals/modal';

export default function EditIntroModal() {
  const onClose = () => {};
  return (
    <Modal onClose={onClose} title="Editar Introdução">
      <EditIntro />
    </Modal>
  );
}
