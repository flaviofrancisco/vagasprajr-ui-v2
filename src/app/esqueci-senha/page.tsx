'use client';
import FieldError from '@/components/common/error-component';
import { requestPasswordReset } from '@/services/auth/authentication.service';
import { useAppDispatch } from '@/services/store';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';

export default function ForgottenPasswordPage() {
  const dispatch = useAppDispatch();
  const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  const errRef = useRef<HTMLParagraphElement | null>(null);
  const emailRef = useRef<HTMLInputElement | null>(null);

  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isEmailLostFocus, setIsEmailLostFocus] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const { error } = useSelector((state: any) => state.passwordResetReducer);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();    
    setIsRequestSent(false);
    await dispatch(requestPasswordReset({ email: emailRef.current?.value ?? '' })).then(() => {
      setIsRequestSent(true);      
    });
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsRequestSent(false);
    setIsValidEmail(EMAIL_REGEX.test(event.target.value));
  };

  const handleEmailFocus = () => {
    setIsEmailLostFocus(false);
  };

  useEffect(() => {
    if (typeof emailRef?.current === 'undefined' || emailRef?.current === null) {
      return;
    }
    emailRef.current.focus();
  }, []);

  return (
    <main className="grid place-items-center h-screen">
      <div className="w-4/5 xl:w-2/6 bg-white p-2 rounded-lg shadow-lg">
        <p ref={errRef} aria-live="assertive" className="text-red-500 text-center font-bold">
          {error}
        </p>
        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
          <input
            ref={emailRef}
            autoComplete="off"
            aria-describedby="emailnote"
            onChange={handleEmailChange}
            onFocus={handleEmailFocus}
            onBlur={() => setIsEmailLostFocus(true)}
            placeholder="Digite seu e-mail"
            type="email"
            id="email"
            name="email"
            required
            className="border border-gray-300 rounded-lg p-2"
          />
          <FieldError error="Email inválido" isVisible={!isValidEmail && isEmailLostFocus} />
          {!isRequestSent ? (
            <button
              className={`${!isValidEmail ? 'disabled' : 'enabled'} bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              disabled={!isValidEmail}
              type="submit"
            >
              Enviar
            </button>
          ) : (
            <>
              <p className={`text-center text-green-600 font-bold pb-4 ${isValidEmail && isRequestSent ? 'block' : 'hidden'}`}>
                {'Se seu e-mail for válido, iremos enviar um link para você alterar sua senha.'}
              </p>
              <Link className="bg-green-500 hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href={'/auth/login'}>
                Entrar
              </Link>
            </>
          )}
        </form>
      </div>
    </main>
  );
}
