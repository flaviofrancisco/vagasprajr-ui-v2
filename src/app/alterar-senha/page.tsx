'use client';
import passwordResetSlice, { verifyResetToken } from '@/services/auth/password.service';
import { resetPassword } from '@/services/auth/registration.service';
import { useAppDispatch } from '@/services/store';
import { faCheck, faTimes, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[\W]).{10,}$/;
const EMAIL_REGEX = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

export default function PasswordChangePage() {
  const dispatch = useAppDispatch();
  const [token, setToken] = useState<string>('');
  const { error, isValidPassword, resetPasswordForm, isTokenValid, isPasswordMatched, isPasswordReset } = useSelector((state: any) => state.passwordResetReducer);
  const { onChangeField, onValidPassword, onPasswordMatch } = passwordResetSlice.actions;

  const errRef = useRef<HTMLParagraphElement | null>(null);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isValidPassword && isTokenValid && isPasswordMatched) {
      dispatch(resetPassword({ token: token as string, password: resetPasswordForm.password }));
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      setToken(params.get('token') ?? '');
    }
  }, []);

  useEffect(() => {
    dispatch(onValidPassword(PWD_REGEX.test(resetPasswordForm.password)));
    dispatch(onPasswordMatch(resetPasswordForm.password === resetPasswordForm.confirmPassword));
  }, [resetPasswordForm.password, resetPasswordForm.confirmPassword, dispatch, onValidPassword, onPasswordMatch]);

  useEffect(() => {
    dispatch(verifyResetToken(token)).then(() => {});
  }, [dispatch, token]);

  return (
    <main className="grid place-items-center h-screen">
      <div className="w-4/5 xl:w-2/6 bg-white p-2 rounded-lg shadow-lg">
        <p ref={errRef} aria-live="assertive" className="text-red-500 text-center font-bold">
          {error}
        </p>
        {isTokenValid && !isPasswordReset ? (
          <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
              Senha
              <FontAwesomeIcon icon={faCheck} className={isValidPassword ? 'valid' : 'hidden'} />
              <FontAwesomeIcon icon={faTimes} className={!isValidPassword || !resetPasswordForm.password || resetPasswordForm.password === '' ? 'invalid' : 'hidden'} />
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-[#1da1f2]/50 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="password"
              type="password"
              placeholder="senha"
              required
              aria-describedby="pwdnote"
              onChange={(e) => dispatch(onChangeField({ password: e.target.value }))}
              aria-invalid={error ? true : false}
            />
            <p id="pwdnote" className={`mt-2 px-4 py-2 mb-6 bg-red-400 border border-blue-300 rounded-lg ${!isValidPassword && resetPasswordForm.password ? 'block' : 'hidden'}`}>
              <FontAwesomeIcon icon={faInfoCircle} className="text-red-800 mr-2" />
              <span className="text-white">
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
              </span>
            </p>
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirmPassword">
              Confirmar Senha
              <FontAwesomeIcon icon={faCheck} className={isPasswordMatched && resetPasswordForm.confirmPassword ? 'valid' : 'hidden'} />
              <FontAwesomeIcon icon={faTimes} className={!isPasswordMatched || !resetPasswordForm.confirmPassword || resetPasswordForm.confirmPassword === '' ? 'invalid' : 'hidden'} />
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 mb-4 text-gray-700 leading-tight focus:outline-none focus:ring-4 focus:ring-[#1da1f2]/50 focus:ring-opacity-50 focus:ring-offset-2 focus:ring-offset-gray-100"
              id="confirmPassword"
              type="password"
              placeholder="confirmar senha"
              required
              aria-describedby="confirnote"
              onChange={(e) => dispatch(onChangeField({ confirmPassword: e.target.value }))}
              aria-invalid={error ? true : false}
            />
            <p id="confirnote" className={`mt-2 px-4 py-2 mb-6 bg-red-400 border border-blue-300 rounded-lg ${!isPasswordMatched ? 'block' : 'hidden'}`}>
              <FontAwesomeIcon icon={faInfoCircle} className="text-red-800 mr-2" />
              <span className="text-white">Senha deve ser igual a anterior</span>
            </p>
            <button
              className={`${
                !isValidPassword || !isPasswordMatched ? 'disabled' : 'enabled'
              } bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
              disabled={!isValidPassword || !isPasswordMatched}
              type="submit"
            >
              Enviar
            </button>
          </form>
        ) : (
          <>{!isTokenValid && <p className="text-center text-gray-700 text-lg font-bold">Token inválido</p>}</>
        )}
        {isPasswordReset && (
          <div className="flex flex-col w-full items-center justify-center">
            <div className="w-full flex justify-center">
              <p className={'text-center w-full text-green-600 font-bold pb-4'}>{'Senha alterada com sucesso!'}</p>
            </div>
            <div className="w-full flex justify-center">
              <Link className="bg-green-500 w-full hover:bg-green-700 text-white text-center font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" href={'/auth/login'}>
                Entrar
              </Link>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
