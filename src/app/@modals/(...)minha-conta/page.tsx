'use client';
import { Modal } from '@/components/modals/modal';
import useAxiosPrivate from '@/hooks/private-axios';
import { useAppDispatch } from '@/services/store';
import usersSlice, { doGetUserProfile, tryUpdateUserName } from '@/services/users/users.service';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const MyAccountPage = () => {
  const router = useRouter();

  const onClose = () => {
    router.back();
  };

  const dispatch = useAppDispatch();
  const axiosPrivate = useAxiosPrivate();
  const { profile, error, status, success_message } = useSelector((state: any) => state.usersReducer);
  const { onChangeFieldInput } = usersSlice.actions;

  useEffect(() => {
    dispatch(doGetUserProfile({ axiosPrivate }));
  }, [axiosPrivate, dispatch]);

  return (
    <Modal title={'Minha conta'} onClose={onClose}>
      <div className="p-4">
        <h1>Informações da conta</h1>
        <div className="flex">
          <form className="flex p-4 inline-block flex-row w-full">
            <label className="text-sm text-gray-600" htmlFor="name">
              Nome do usuário
              <input
                id="user_name"
                type="text"
                name="user_name"
                onChange={(e) => dispatch(onChangeFieldInput({ user_name: e.target.value }))}
                onBlur={(e) => dispatch(tryUpdateUserName({ axiosPrivate, user_name: e.target.value }))}
                defaultValue={profile.user_name}
                value={profile.user_name}
                className="border border-gray-300 rounded-md p-2 w-full"
              />
              {success_message && status === 'succeeded' && <span className="text-green-500">{success_message}</span>}
              {error && <span className="text-red-500">{error}</span>}
            </label>
          </form>
        </div>
      </div>
    </Modal>
  );
};

export default MyAccountPage;
