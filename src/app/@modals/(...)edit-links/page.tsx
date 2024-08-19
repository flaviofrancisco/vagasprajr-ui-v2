'use client';
import { SelectCombo } from '@/components/inputs/select-combo/select-combo';
import styles from './page.module.scss';
import { Modal } from '@/components/modals/modal';
import { useAppDispatch } from '@/services/store';
import usersSlice from '@/services/users/users.service';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';

export default function EditLinksPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { onChangeFieldInput } = usersSlice.actions;
  const { profile } = useSelector((state: any) => state.usersReducer);

  const onClose = () => {
    router.back();
  };
  const onSave = () => {
    router.back();
  };

  const links_names = [
    { label: 'Facebook', value: 'facebook' },
    { label: 'Instagram', value: 'instagram' },
    { label: 'LinkedIn', value: 'linkedin' },
    { label: 'Twitter', value: 'twitter' },
    { label: 'Youtube', value: 'youtube' },
    { label: 'Github', value: 'github' },
    { label: 'BlueSky', value: 'bluesky' },
    { label: 'Site', value: 'site' },
    { label: 'Portfolio', value: 'portfolio' },
    { label: 'Outro', value: 'outro' },
  ];

  return (
    <Modal onClose={onClose} onSave={onSave} title="Meus links">
      <div className={`${styles['edit-links-container']}`}>
        {profile.links.map((link: any, index: number) => (
          <div className={`${styles['edit-links-row']}`} key={index}>
            <div className={`${styles['edit-link-cell']}`}>
              <SelectCombo options={links_names} value={link.name} onChange={(value: string) => {}} />
            </div>
            <div className={`${styles['edit-link-cell']}`}>
              <input
                type="text"
                className="w-full border border-gray-200 rounded-lg p-2"
                value={link.url}
                onChange={(e) => {
                  dispatch(onChangeFieldInput({ links: profile.links.map((l: any, i: number) => (index === i ? { ...l, url: e.target.value } : l)) }));
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </Modal>
  );
}
