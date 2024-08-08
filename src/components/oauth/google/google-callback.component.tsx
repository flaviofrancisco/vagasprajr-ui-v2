'use client';
import Loading from '@/components/common/loading';
import authenticationSlice, { AuthenticationState } from '@/services/auth/authentication.service';
import { GoogleAuthState, loginUsingGoogle } from '@/services/oauth/google/google.service';
import { useAppDispatch } from '@/services/store';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const GoogleCallback: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const { status } = useSelector((state: any) => state.authRegistration as GoogleAuthState);
  const { onAuthSetToken: onSetToken } = authenticationSlice.actions;

  useEffect(() => {
    const googleAuth = async () => {
      const hash = window.location.hash.substr(1);
      const urlParams = new URLSearchParams(hash);
      const accessToken_token = urlParams.get('access_token');

      if (accessToken_token) {
        await dispatch(loginUsingGoogle(accessToken_token ?? '')).then((res) => {
          if (res.payload?.success) {
            dispatch(onSetToken(res.payload));
            router.push('/');
          } else {
            router.push('/');
          }
        });
      }
    };
    googleAuth();
  }, [dispatch, onSetToken, router]);

  return <>{status === 'loading' ? <Loading /> : ''}</>;
};

export default GoogleCallback;
