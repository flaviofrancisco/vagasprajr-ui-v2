'use client';

import { AuthenticationState, doAuthentication } from '@/services/auth/authentication.service';
import { useAppDispatch } from '@/services/store';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';

const LoginComponent: React.FC = () => {
  const dispatch = useAppDispatch();
  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');

  const userRef = useRef<HTMLInputElement | null>(null);
  const errRef = useRef<HTMLParagraphElement | null>(null);

  const { authSession, error, status } = useSelector((state: any) => state.authenticationReducer as AuthenticationState);

  const getGoogleOauthUrl = () => {
    const rootUrl = 'https://accounts.google.com/o/oauth2/v2/auth';
    const options = {
      redirect_uri: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_REDIRECT_URI!, // client url cannot be http://localhost:3000/ or http://
      client_id: process.env.NEXT_PUBLIC_OOGLE_CLIENT_ID!,
      response_type: 'token',
      scope: ['email', 'profile'].join(' '), // add/remove scopes as needed
    };
    const qs = new URLSearchParams(options).toString();
    return `${rootUrl}?${qs}`;
  };

  const handleGoogleLogIn = () => {
    window.location.href = getGoogleOauthUrl();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      if (typeof errRef?.current === 'undefined' || errRef?.current === null) {
        return;
      }
      dispatch(doAuthentication({ email: user, password: pwd }));
      errRef.current.innerHTML = '';
      setUser('');
      setPwd('');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (typeof authSession === 'undefined' || authSession === null) {
      return;
    }
    if (authSession?.success) {
      //navigate(from, { replace: true });
    } else if (user && pwd) {
      if (typeof errRef?.current === 'undefined' || errRef?.current === null) {
        return;
      }
      errRef.current.focus();
    }
  }, [authSession, authSession.access_token, pwd, user]);

  useEffect(() => {
    if (typeof userRef?.current === 'undefined' || userRef?.current === null) {
      return;
    }
    userRef.current.focus();
  }, []);

  useEffect(() => {}, [user, pwd]);

  return (
    <div className="grid place-items-center h-screen">
      <div className="w-[4/5] h-[4/5] bg-white p-4 rounded-lg shadow-lg">
        <div className="flex justify-center items-center">
          <button
            onClick={handleGoogleLogIn}
            type="button"
            className="text-white bg-[#4285F4] hover:bg-[#4285F4]/90 focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#4285F4]/55 mr-2 mb-2"
          >
            <svg className="w-4 h-4 mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 19">
              <path
                fillRule="evenodd"
                d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
                clipRule="evenodd"
              />
            </svg>
            Conecte-se com Google
          </button>
        </div>
        <hr className="my-4" />
        <p ref={errRef} aria-live="assertive" className="text-red-500 text-center font-bold">
          {error}
        </p>
        <div className="flex justify-center items-center p-4">
          <form onSubmit={handleSubmit} className="w-full max-w-sm">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
              Email
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-[#1da1f2]/50 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="username"
              type="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              required
              placeholder="e-mail"
            />
            <label className="block text-gray-700 text-sm font-bold mb-2 mt-4" htmlFor="password">
              Senha
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-[#1da1f2]/50 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="password"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              required
              type="password"
              placeholder="Senha"
            />
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
              Entrar
            </button>
          </form>
        </div>
        <div className="flex justify-center items-center p-4">
          <Link href="/esqueci-senha" className="text-[#1da1f2] hover:underline pr-2 ">
            Esqueceu a senha?
          </Link>{' '}
          |
          <Link href="/auth/signup" className="text-[#1da1f2] hover:underline pl-2">
            Criar conta
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginComponent;
