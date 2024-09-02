'use client';
import { Modal } from '@/components/modals/modal';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import usersSlice, { doGetGravatarUrl, doGetUserProfile, doUpdateUserProfile, tryUpdateUserName } from '@/services/users/users.service';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styles from './page.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import UserIcon from '@/assets/user-icon.png';
import { toast, Toaster } from 'sonner';

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
    dispatch(doUpdateUserProfile({ axiosPrivate, profile: { ...profile, ...current_profile } })).then((result_action) => {
      if (doUpdateUserProfile.fulfilled.match(result_action)) {
        toast.success('Perfil atualizado com sucesso');
        dispatch(doGetUserProfile({ axiosPrivate }));
      }
    });
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

  const onUseGooglePhoto = () => {
    onUpdateUserProfile({ profile_image_url: profile.oauth_image_url });
  };

  const onGetGravatar = () => {
    const execute = async () => {
      const result = await dispatch(doGetGravatarUrl({ email: profile.email }));
      if (result.type === doGetGravatarUrl.fulfilled.type) {
        const isUrlValid = await isUrlReturn200(result.payload.gravatarUrl);
        if (isUrlValid) {
          onUpdateUserProfile({ profile_image_url: `${result.payload.gravatarUrl}?size=256`, gravatar_image_url: result.payload.gravatarUrl });
        } else {
          toast.error('Não foi possível encontrar uma imagem no Gravatar');
        }
      }
    };
    execute();
  };

  const isUrlReturn200 = async (url: string) => {
    /*try to get the image from the url and check if it returns 200*/
    try {
      const response = await fetch(url);
      if (response.status === 200) {
        return true;
      }
    } catch (error) {
      return false;
    }
  };

  const hasGooglePhoto = profile?.oauth_image_url;

  return (
    <Modal title={'Minha conta'} onClose={onClose}>
      <Toaster richColors />
      <div className="p-4">
        <div className="flex flex-col">
          <h1>Informações da conta</h1>
          <div className="flex flex-col md:flex-row items-center align-baseline justify-start">
            <div>
              {profile.profile_image_url ? (
                <Image src={profile.profile_image_url} alt={`${profile.first_name} ${profile.last_name}`} width={60} height={60} className="rounded-full m-4" />
              ) : (
                <Image src={UserIcon} alt={`${profile.first_name} ${profile.last_name}`} width={48} height={48} className="rounded-full m-4" />
              )}
            </div>
            <div className="flex align-baseline flex-col">
              <h2>{`${profile.first_name} ${profile.last_name}`}</h2>
              <p>{profile.email}</p>
            </div>
          </div>
          <p className="mt-4">Escolha uma foto de perfil</p>
          <div className="flex align-baseline w-[30%] flex-row">
            <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => onGetGravatar()}>
              Gravatar
            </button>
            {hasGooglePhoto && (
              <button className="bg-blue-500 m-2 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => onUseGooglePhoto()}>
                Google
              </button>
            )}
          </div>
          <p className="text-gray-500">
            <Link href={'https://br.gravatar.com/'} passHref target="_blank" rel="noopener noreferrer">
              Crie sua conta no Gravatar
            </Link>
          </p>
          <form className="flex p-4 flex-col align-baseline h-auto w-full">
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
                {profile?.user_name && profile?.is_public && (
                  <Link href={`/im/${profile?.user_name}/`} passHref target="_blank" rel="noopener noreferrer" className="text-gray-500">
                    {`https://vagasprajr.com.br/im/${profile?.user_name}/`}
                  </Link>
                )}
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
