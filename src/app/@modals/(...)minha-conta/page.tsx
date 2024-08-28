'use client';
import { Modal } from '@/components/modals/modal';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import usersSlice, { doGetUserProfile, doUpdateUserProfile, tryUpdateUserName } from '@/services/users/users.service';
import { useRouter } from 'next/navigation';
import { use, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './page.module.scss';
import { set } from 'date-fns';

const MyAccountPage = () => {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { profile, error, status, success_message } = useSelector((state: any) => state.usersReducer);
  const { onChangeFieldInput, onResetMessages } = usersSlice.actions;

  const [disable_public_profile, setDisablePublicProfile] = useState<boolean>(false);

  useEffect(() => {
    dispatch(doGetUserProfile({ axiosPrivate }));
  }, [axiosPrivate, dispatch]);

  useEffect(() => {
    dispatch(onResetMessages());
  }, [dispatch, onResetMessages]);

  const onUpdateUserProfile = (current_profile: any) => {
    dispatch(onChangeFieldInput(current_profile));
    dispatch(doUpdateUserProfile({ axiosPrivate, profile: { ...profile, ...current_profile } }));
  };

  const onUpdateUserName = (user_name: string) => {
    if (typeof user_name === 'undefined' || user_name === null || user_name === '') {
      setDisablePublicProfile(true);
      dispatch(tryUpdateUserName({ axiosPrivate, user_name }));
      onUpdateUserProfile({ is_public: false });
    }
    dispatch(tryUpdateUserName({ axiosPrivate, user_name })).then((result_action) => {
      if (tryUpdateUserName.fulfilled.match(result_action)) {
        setDisablePublicProfile(false);
      }
    });
  };

  return (
    <Modal title={'Minha conta'} onClose={onClose}>
      <div className="p-4">
        <div className="flex flex-col">
          <h1>Informações da conta</h1>
          <form className="flex p-4 flex-col w-full">
            <div className="w-full">
              <label className="text-sm text-gray-600" htmlFor="name">
                Nome do usuário
                <input
                  id="user_name"
                  type="text"
                  name="user_name"
                  onChange={(e) => dispatch(onChangeFieldInput({ user_name: e.target.value }))}
                  onBlur={(e) => onUpdateUserName(e.target.value)}
                  defaultValue={profile.user_name}
                  value={profile.user_name}
                  className="border border-gray-300 rounded-md p-2 w-full"
                />
                {success_message && status === 'succeeded' && <span className="text-green-500">{success_message}</span>}
                {error && <span className="text-red-500">{error}</span>}
              </label>
            </div>
            <h1 className="mt-4">Configurações de perfil</h1>
            <div className="w-full mt-4">
              <div className="flex flex-col md:flex-row">
                <label className="text-sm text-gray-600" htmlFor="email">
                  Perfil público
                </label>
                <div className="relative pb-4 inline-block w-10 ml-2 align-middle select-none transition duration-200 ease-in">
                  <input
                    disabled={disable_public_profile}
                    onChange={(e) => onUpdateUserProfile({ is_public: e.target.checked })}
                    checked={profile.is_public || false}
                    value={profile.is_public}
                    type="checkbox"
                    name="is_public"
                    id="is_public"
                    className={`${styles['toggle-checkbox']} absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer`}
                  />
                  <label htmlFor="is_public" className={`${styles['toggle-label']} block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer`}></label>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default MyAccountPage;
