'use client';
import Loading from '@/components/common/loading';
import useRefreshToken from '@/hooks/refresh-token';
import { AuthenticationState } from '@/services/auth/authentication.service';
import { ReactNode, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

interface WrapperComponentProps {
  children: ReactNode;
}

const PersistLogin: React.FC<WrapperComponentProps> = ({ children }) => {
  const refresh = useRefreshToken();
  const { authSession } = useSelector((state: any) => state.authentication as AuthenticationState);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (error) {
        console.error(error);
      } finally {
      }
    };

    if (!authSession?.access_token) {
      verifyRefreshToken();
    }
  }, []);

  return <>{children}</>;
};

export default PersistLogin;
