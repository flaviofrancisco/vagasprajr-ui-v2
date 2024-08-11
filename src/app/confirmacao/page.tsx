'use client';
import Loading from '@/components/common/loading';
import PageMessage, { MessageType } from '@/components/common/page-message';
import { doConfirmEmail } from '@/services/auth/registration.service';
import { useAppDispatch } from '@/services/store';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const Page = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [isConfirmationComplete, setIsConfirmationComplete] = useState(false);

  const { isEmailConfirmed } = useSelector((state: any) => state.signUpTokenConfirmationReducer);

  let token = searchParams.get('token');
  
  useEffect(() => {         
    async function confirmEmail() {
      setIsLoading(true);
      if (token) {
        const tokenString = Array.isArray(token) ? token[0] : token;
        await dispatch(doConfirmEmail(tokenString));
      }
      setIsLoading(false);
      setIsConfirmationComplete(true);
    }
    confirmEmail();
  }, [dispatch, token]);

  return (
    <main className="grid place-items-center h-screen">
      {isLoading ? (
        <Loading />
      ) : isConfirmationComplete && isEmailConfirmed ? (
        <>
          <PageMessage action={() => router.push('/')} message="E-mail confirmado." actionLabel="Entrar" messageType={MessageType.Success} />
        </>
      ) : (
        <PageMessage action={() => router.push('/')} message="Não foi possível confirmar seu e-mail" actionLabel="Início" messageType={MessageType.Error} />
      )}
    </main>
  );
};

const PageWithSuspense = () => (
  <Suspense fallback={<Loading />}>
    <Page />
  </Suspense>
);

export default PageWithSuspense;
