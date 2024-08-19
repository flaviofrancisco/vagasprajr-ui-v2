'use client';
import { Modal } from '@/components/modals/modal';

export default function EditLinksPage() {
  const onClose = () => {};
  const onSave = () => {};
  return (
    <Modal onClose={onClose} onSave={onSave} title="Editar minha introdução">
      <div>Edit Links</div>
    </Modal>
  );
}
