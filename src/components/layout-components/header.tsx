import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react';
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline';
import imgLogo from '@/assets/logo.png';
import Image from 'next/image';
import { AuthenticationState, logoutUser } from '@/services/auth/authentication.service';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import { useAppDispatch } from '@/services/store';
import { useRouter } from 'next/navigation';
import UserIcon from '@/assets/user-icon.png';
import Link from 'next/link';
import { AdminRole, doAuthorization } from '@/services/auth/authorization.service';
import { axiosPrivate } from '@/services/axios';
import { signOut } from 'next-auth/react';

const navigation = [
  { name: 'Entrar', href: '/auth/login', current: false, isLogged: false },
  { name: 'Criar conta', href: '/auth/signup', current: false, isLogged: false },
  { name: 'Criar vaga', href: '/v/nova', current: false, isLogged: true },
  { name: 'Shopping', href: '/shopping', current: false },
  { name: 'Talentos', href: '/talentos', current: false },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

export default function MainHeader() {
  const router = useRouter();

  const dispatch = useAppDispatch();
  const { authSession, isAuthenticated, isLogout } = useSelector((state: any) => state.authenticationReducer as AuthenticationState);
  const { isAuthorized } = useSelector((state: any) => state.authorizationReducer);

  const [isLogged, setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const hadleLogout = () => {
    dispatch(logoutUser()).then(() => {
      signOut();
      setIsLogged(isLogout);
      router.push('/');
    });
  };

  useEffect(() => {
    if (authSession) {
      dispatch(doAuthorization({ access_token: authSession.access_token, request: { roles: [AdminRole] }, axiosPrivate: axiosPrivate })).then(() => {
        setIsAdmin(isAuthorized);
      });
    }
  }, [authSession, dispatch, isAuthorized]);

  useEffect(() => {
    if (isAuthenticated) {
      setIsLogged(true);
      router.push('/');
    }
  }, [authSession, isAuthenticated, isLogged, router]);

  return (
    <Disclosure as="nav" className="bg-gray-800">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-16 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <XMarkIcon aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
            <div className="flex flex-shrink-0 items-center">
              <a href="/" className="flex items-center">
                <Image src={imgLogo} alt="Logo" width={40} height={40} />
              </a>
              <a
                href="/"
                className="flex items-center"
                onClick={(e) => {
                  e.preventDefault();
                  router.push('/');
                }}
              >
                <span className="self-center text-white m-4 text-2xl font-semibold whitespace-nowrap dark:text-white">@vagasprajr</span>
              </a>
            </div>
            <div className="hidden items-center w-full sm:ml-6 sm:block">
              <div className="flex space-x-4 h-full items-center justify-center">
                {navigation
                  .filter((x) => typeof x.isLogged === 'undefined' || x.isLogged === isAuthenticated)
                  .map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(item.href);
                      }}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'rounded-md px-3 py-2 text-sm font-medium')}
                    >
                      {item.name}
                    </Link>
                  ))}
              </div>
            </div>
          </div>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
            {isLogged && (
              <>
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5" />
                  <span className="sr-only">View notifications</span>
                  <BellIcon aria-hidden="true" className="h-6 w-6" />
                </button>
                <Menu as="div" className="relative ml-3">
                  <div>
                    <MenuButton className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                      <span className="absolute -inset-1.5" />
                      <span className="sr-only">Open user menu</span>
                      {authSession?.user_info?.profile_image_url ? (
                        <Image alt="user photo" src={authSession?.user_info?.profile_image_url} className="h-8 w-8 rounded-full" width={400} height={400} />
                      ) : (
                        <Image alt="user photo" src={UserIcon} className="h-8 w-8 rounded-full" />
                      )}
                    </MenuButton>
                  </div>
                  <MenuItems
                    transition
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                  >
                    {isAdmin && (
                      <MenuItem>
                        <Link href={'/admin'} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                          Admin
                        </Link>
                      </MenuItem>
                    )}
                    <MenuItem>
                      <Link href={'/perfil'} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Meu Perfil
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={'/minha-conta'} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Minha conta
                      </Link>
                    </MenuItem>
                    <MenuItem>
                      <Link href={'/'} onClick={hadleLogout} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
                        Sair
                      </Link>
                    </MenuItem>
                  </MenuItems>
                </Menu>
              </>
            )}
          </div>
        </div>
      </div>
      <DisclosurePanel className="sm:hidden">
        <div className="space-y-1 px-2 pb-3 pt-2">
          {navigation.map((item) => (
            <DisclosureButton
              key={item.name}
              as="a"
              href={item.href}
              onClick={(e) => {
                e.preventDefault();
                router.push(item.href);
              }}
              aria-current={item.current ? 'page' : undefined}
              className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}
            >
              {item.name}
            </DisclosureButton>
          ))}
        </div>
      </DisclosurePanel>
    </Disclosure>
  );
}
