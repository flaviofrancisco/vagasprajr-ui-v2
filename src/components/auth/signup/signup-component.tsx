'use client';

import authRegistrationSlice, { AuthRegistrationSliceState, doRegistration } from '@/services/auth/registration.service';
import { useAppDispatch } from '@/services/store';
import { faCheck, faTimes } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './signup-component.module.css';
import FieldError from '@/components/common/error-component';
import PageMessage, { MessageType } from '@/components/common/page-message';
import { useRouter } from 'next/navigation';

export const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{10,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export default function SignupComponent() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const emailRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const { onSetError, onChangeFieldInput, onEmailBlur, onEmailFocus, onValidEmail, onValidPassword, onPasswordMatch, onReset } = authRegistrationSlice.actions;
  const { userInfo, error, isEmailLostFocus, isValidEmail, isValidPassword, isPasswordMatch, registrationStatus } = useSelector(
    (state: any) => state.authRegistrationReducer as AuthRegistrationSliceState
  );

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(doRegistration(userInfo));
  };

  useEffect(() => {
    return () => {
      dispatch(onReset());
    };
  }, [dispatch, onReset]);

  useEffect(() => {
    if (typeof emailRef?.current === 'undefined' || emailRef?.current === null) {
      return;
    }
    emailRef.current.focus();
    dispatch(onEmailFocus(true));
    dispatch(onEmailBlur(false));
  }, [dispatch, onEmailBlur, onEmailFocus]);

  useEffect(() => {
    dispatch(onValidEmail(EMAIL_REGEX.test(userInfo.email)));
  }, [dispatch, onValidEmail, userInfo.email]);

  useEffect(() => {
    dispatch(onValidPassword(PWD_REGEX.test(userInfo.password)));
    dispatch(onPasswordMatch(userInfo.password === userInfo.confirmPassword));
  }, [userInfo.password, userInfo.confirmPassword, dispatch, onValidPassword, onPasswordMatch]);

  useEffect(() => {
    dispatch(onSetError(''));
  }, [userInfo.email, userInfo.password, userInfo.confirmPassword, dispatch, onSetError]);

  return (
    <>
      {registrationStatus?.isRegistered ? (
        <div className="grid place-items-center h-screen">
          <PageMessage
            action={() => {
              dispatch(onReset());
              router.push('/auth/login');
            }}
            message="Sua conta foi criada. Verfique seu e-mail para confirmação."
            actionLabel="Entrar"
            messageType={MessageType.Success}
          />
        </div>
      ) : (
        <div className="grid place-items-center h-screen">
          <div className="w-[4/5] h-[4/5] bg-white p-4 rounded-lg shadow-lg dark:bg-gray-800">
            <p ref={errRef} aria-live="assertive" className="text-red-500 font-bold text-center">
              {error && (
                <>
                  <span className="text-red-500 font-bold text-center">Não foi completar o registro. Tente outro e-mail ou entre em contato com nosso suporte: contato@vagasprajr.com.br</span>
                </>
              )}
            </p>
            <div className="flex justify-center items-center">
              <form onSubmit={handleSubmit} className="w-full max-w-sm">
                <label className="block text-gray-700 text-sm font-bold mb-2 dark:text-white" htmlFor="email">
                  e-mail
                  <FontAwesomeIcon size="xs" icon={faCheck} className={isValidEmail ? styles.valid : 'hidden'} />
                  <FontAwesomeIcon size="xs" icon={faTimes} className={!isValidEmail || !userInfo.email || userInfo.email === '' ? styles.invalid : 'hidden'} />
                  <input
                    ref={emailRef}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-[#1da1f2]/50 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id="email"
                    type="email"
                    autoComplete="off"
                    value={userInfo?.email}
                    onChange={(e) => dispatch(onChangeFieldInput({ email: e.target.value }))}
                    onBlur={() => dispatch(onEmailBlur(true))}
                    onFocus={() => dispatch(onEmailFocus(true))}
                    aria-invalid={error ? true : false}
                    aria-describedby="emailnote"
                    required
                    placeholder="e-mail"
                  />
                </label>
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-4 dark:text-white" htmlFor="password">
                  senha
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-[#1da1f2]/50 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id="password"
                    type="password"
                    autoComplete="off"
                    required
                    aria-describedby="pwdnote"
                    value={userInfo?.password}
                    onChange={(e) => dispatch(onChangeFieldInput({ password: e.target.value }))}
                    aria-invalid={error ? true : false}
                  />
                </label>
                <FieldError
                  error={
                    <>
                      <br />
                      No mínimo 10 caracteres.
                      <br />
                      Ao menos 1 letra maiuscula.
                      <br />
                      Ao menos 1 letra minuscula.
                      <br />
                      Ao menos 1 digito.
                      <br />
                      Ao menos 1 caracter especial.
                      <br />
                    </>
                  }
                  isVisible={!isValidPassword && typeof userInfo.password !== 'undefined' && userInfo.password !== null && userInfo.password.trim() !== ''}
                />
                <label className="block text-gray-700 text-sm font-bold mb-2 mt-4 dark:text-white" htmlFor="password">
                  confirmar senha
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-[#1da1f2]/50 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-100"
                    id="password"
                    type="password"
                    autoComplete="off"
                    required
                    aria-describedby="confirnote"
                    onChange={(e) => dispatch(onChangeFieldInput({ confirmPassword: e.target.value }))}
                    aria-invalid={error ? true : false}
                  />
                </label>
                <FieldError error="Senha deve ser igual a anterior" isVisible={!isPasswordMatch} />
                <button
                  className={`${
                    !isValidEmail || !isValidPassword || !isPasswordMatch ? 'disabled' : 'enabled'
                  } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                  disabled={!isValidEmail || !isValidPassword || !isPasswordMatch}
                  type="submit"
                >
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
