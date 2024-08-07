import authenticationSlice, { AuthenticationState, AuthResponse } from "@/services/auth/authentication.service";
import { useAppDispatch } from "@/services/store";
import axios from "axios";
import { useSelector } from "react-redux";

const useRefreshToken = () => {
  useSelector((state: any) => state.authentication as AuthenticationState);
  const { onSetToken } = authenticationSlice.actions;

  const dispatch = useAppDispatch();

  const refreshToken = async () => {
    try {
      const response = await axios.get('/auth/refresh-token', {
        withCredentials: true,
      });

      dispatch(onSetToken(response?.data));

      return response?.data?.access_token;
    } catch (error: any) {
      if (error.response.status === 401) {
        dispatch(onSetToken({} as AuthResponse));
        return;
      }
      throw error;
    }
  };

  return refreshToken;
};

export default useRefreshToken;