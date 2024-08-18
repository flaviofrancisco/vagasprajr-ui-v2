'use client';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from './loading';
import { AuthenticationState } from '@/services/auth/authentication.service';
import { useRouter } from 'next/navigation';

const withAuth = (WrappedComponent: React.FC) => {
  const Wrapper = (props: any) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useSelector((state: any) => state.authenticationReducer as AuthenticationState);

    useEffect(() => {
      if (!isAuthenticated) {
        router.push('/auth/login', { scroll: false });
      } else {
        setLoading(false);
      }
    }, [isAuthenticated, router]);

    if (loading) {
      return <Loading />;
    }

    return <WrappedComponent {...props} />;
  };

  return Wrapper;
};

export default withAuth;
