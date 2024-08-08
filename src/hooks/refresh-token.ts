import authenticationSlice, { AuthResponse } from '@/services/auth/authentication.service';
import { axiosPrivate } from '@/services/axios';
import { useAppDispatch } from '@/services/store';

const useRefreshToken = () => {
  const { onAuthSetToken, onLogout } = authenticationSlice.actions;
  const dispatch = useAppDispatch();

  const refreshToken = async () => {
    try {
      const response = await axiosPrivate.get('/auth/refresh-token', {
        withCredentials: true,
      });

      dispatch(onAuthSetToken(response?.data));

      return response?.data?.access_token;
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(onLogout());
        return;
      }
      throw error;
    }
  };

  return refreshToken;
};

export default useRefreshToken;
