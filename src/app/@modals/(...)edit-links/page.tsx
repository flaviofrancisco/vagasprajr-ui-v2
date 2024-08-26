'use client';
import { SelectCombo } from '@/components/inputs/select-combo/select-combo';
import styles from './page.module.scss';
import { Modal } from '@/components/modals/modal';
import { useAppDispatch } from '@/services/store';
import usersSlice, { doUpdateUserProfile } from '@/services/users/users.service';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import useAxiosPrivate from '@/hooks/private-axios';

export default function EditLinksPage() {
  const MAX_LINKS = 10;
  const router = useRouter();
  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { onChangeFieldInput } = usersSlice.actions;
  const { profile } = useSelector((state: any) => state.usersReducer);

  const onClose = () => {
    router.back();
  };
  const onSave = () => {
    dispatch(doUpdateUserProfile({ axiosPrivate, profile: profile })).then(() => {
      router.back();
    });
  };

  const onDeleteLink = (index: number) => {
    dispatch(onChangeFieldInput({ links: profile.links.filter((l: any, i: number) => index !== i) }));
  };

  const onAddLink = () => {
    dispatch(onChangeFieldInput({ links: [...profile.links, { name: 'Facebook', url: '' }] }));
  };

  const onChageName = (index: number, value: string) => {
    dispatch(onChangeFieldInput({ links: profile.links.map((l: any, i: number) => (index === i ? { ...l, name: value } : l)) }));
  };

  useEffect(() => {}, [profile.links]);

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
    <Modal onClose={onClose} title="Meus links">
      <div className={`${styles['edit-links-container']}`}>
        <div className="p-4">
          {profile.links.length < MAX_LINKS && (
            <button className={`${styles['btn-base']} ${styles['btn-add']}`} onClick={onAddLink}>
              <span className={`${styles['mdi']} ${styles['mdi-plus']} ${styles['mdi-24px']}`}></span>
              <span className={`${styles['mdi']} ${styles['mdi-plus-empty']} ${styles['mdi-24px']}`}></span>
              Adicionar link
            </button>
          )}
        </div>
        {profile.links.length === 0 && <p className="text-center">Nenhum link adicionado</p>}
        {profile.links.map((link: any, index: number) => (
          <div className={`${styles['edit-links-row']}`} key={index}>
            <div className={`${styles['edit-link-cell']}`}>
              <SelectCombo
                options={links_names}
                value={link.name}
                onChange={(value: string) => {
                  onChageName(index, value);
                }}
              />
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
            <div className={`${styles['edit-link-cell']} ${styles['center-button']}`}>
              <button className={`${styles['btn-base']} ${styles['btn-delete']}`} onClick={() => onDeleteLink(index)}>
                <span className={`${styles['mdi']} ${styles['mdi-delete']} ${styles['mdi-24px']}`}></span>
                <span className={`${styles['mdi']} ${styles['mdi-delete-empty']} ${styles['mdi-24px']}`}></span>
                Remover
              </button>
            </div>
          </div>
        ))}
        <button
          onClick={onSave}
          className="w-full p-2 border bg-blue-800 text-white border-gray-200 rounded-lg shadow hover:bg-blue-600 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700"
          type="button"
        >
          Salvar
        </button>
      </div>
    </Modal>
  );
}
