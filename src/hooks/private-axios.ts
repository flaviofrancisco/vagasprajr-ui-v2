import { AuthenticationState } from '@/services/auth/authentication.service';
import { axiosPrivate } from '@/services/axios';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import useRefreshToken from './refresh-token';

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { authSession } = useSelector((state: any) => state.authenticationReducer as AuthenticationState);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization'] && authSession?.access_token) {
          config.headers['Authorization'] = `Bearer ${authSession.access_token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const previousRequest = error?.config;
        if (error?.response?.status === 401 && !previousRequest?.sent) {
          previousRequest.sent = true;
          const newRefreshToken = await refresh();
          if (!newRefreshToken?.access_token) {
            return Promise.reject(error);
          }
          previousRequest.headers['Authorization'] = `Bearer ${newRefreshToken.access_token}`;
          return axiosPrivate(previousRequest);
        }
        console.error({ error });
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [authSession, refresh]);

  return axiosPrivate;
};

export default useAxiosPrivate;
