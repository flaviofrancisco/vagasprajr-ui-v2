'use client';
import EditIntro from '@/components/forms/users/modals/edit-intro.component';
import { Modal } from '@/components/modals/modal';

export default function EditIntroModal() {
  const onClose = () => {};
  const onSave = () => {};
  return (
    <Modal onClose={onClose} onSave={onSave} title="Editar Introdução">
      <EditIntro onSubmit={() => {}} />
    </Modal>
  );
}
