import { AuthenticationState } from "@/services/auth/authentication.service";
import { axiosPrivate } from "@/services/axios";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import useRefreshToken from "./refresh-token";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { authSession } = useSelector((state: any) => state.authentication as AuthenticationState);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers['Authorization'] && authSession) {
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
          previousRequest.headers['Authorization'] = `Bearer ${newRefreshToken.accessToken}`;
          console.log('axiosPrivate.interceptors.response', newRefreshToken);
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
