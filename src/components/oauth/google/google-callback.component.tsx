'use client';
import { AuthSession } from '@/app/api/auth/[...nextauth]/authOptions';
import Loading from '@/components/common/loading';
import authenticationSlice from '@/services/auth/authentication.service';
import { GoogleAuthState, loginUsingGoogle } from '@/services/oauth/google/google.service';
import { useAppDispatch } from '@/services/store';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

const GoogleCallback: React.FC = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const session = useSession();

  const { status } = useSelector((state: any) => state.authenticationReducer as GoogleAuthState);
  const { onAuthSetToken: onAuthSetToken } = authenticationSlice.actions;

  useEffect(() => {
    const googleAuth = async () => {
      const authSession = session?.data as unknown as AuthSession;
      if (authSession?.accessToken) {
        await dispatch(loginUsingGoogle(authSession.accessToken)).then((res) => {
          if (res.payload?.success) {
            dispatch(onAuthSetToken(res.payload));
            router.push('/');
          } else {
            router.push('/');
          }
        });
      } else {
        router.push('/');
      }
    };
    googleAuth();
  }, [dispatch, onAuthSetToken, router, session?.data]);

  return <>{status === 'loading' ? <Loading /> : ''}</>;
};

export default GoogleCallback;
