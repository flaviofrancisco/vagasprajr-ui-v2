import authenticationSlice from '@/services/auth/authentication.service';
import { useAppDispatch } from '@/services/store';
import axios from 'axios';

const useRefreshToken = () => {
  const { onAuthSetToken, onLogout } = authenticationSlice.actions;
  const dispatch = useAppDispatch();

  const refreshToken = async () => {
    try {
      const current_axios = axios.create({
        baseURL: process.env.NEXT_PUBLIC_API_HOST,
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const response = await current_axios.get('/auth/refresh-token', {
        withCredentials: true,
      });

      await dispatch(onAuthSetToken(response?.data));

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
