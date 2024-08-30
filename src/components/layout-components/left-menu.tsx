'use client';
import { Disclosure, DisclosureButton } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ReactNode, use, useState } from 'react';

interface LeftMenuComponentProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/admin/', current: false, order: 0 },
  { name: 'Usuários', href: '/admin/users', current: false, order: 1 },
  { name: 'Amazon', href: '/admin/shopping', current: false, order: 3 },
  { name: 'Vagas', href: '/admin/jobs', current: false, order: 2 },
];

function classNames(...classes: string[]): string {
  return classes.filter(Boolean).join(' ');
}

const LeftMenuComponent: React.FC<LeftMenuComponentProps> = ({ children }) => {
  const [isMenuVisible, setIsMenuVisible] = useState(true);
  const router = useRouter();
  const toggleMenuVisibility = () => {
    setIsMenuVisible(!isMenuVisible);
  };
  return (
    <>
      <div className="flex h-screen">
        <Disclosure as="nav" className="bg-gray-800">
          {({ open }) => (
            <>
              <div className="flex flex-col h-full px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 justify-start">
                  <div className="absolute inset-y-0 left-0 flex sm:hidden">
                    <DisclosureButton className="group relative inline-flex rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                      <span className="absolute -inset-0.5" />
                      <span className="sr-only">Open main menu</span>
                      <Bars3Icon aria-hidden="true" className={`${open ? 'hidden' : 'block'} h-6 w-6`} />
                      <XMarkIcon aria-hidden="true" className={`${open ? 'block' : 'hidden'} h-6 w-6`} />
                    </DisclosureButton>
                  </div>
                  
                  <div className="flex justify-start sm:items-stretch sm:justify-start">
                    <div className="hidden sm:ml-6 sm:block">
                      <div className="flex flex-col space-y-4 h-full">
                        {navigation.map((item) => (
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
                </div>
              </div>
              <Disclosure.Panel className="sm:hidden">
                <div className="px-2 pt-2 pb-3 space-y-1">
                  {navigation.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      onClick={(e) => {
                        e.preventDefault();
                        router.push(item.href);
                      }}
                      aria-current={item.current ? 'page' : undefined}
                      className={classNames(item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white', 'block rounded-md px-3 py-2 text-base font-medium')}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <div className="flex flex-col flex-1">
          <div className="flex flex-col flex-1">{children}</div>
        </div>
      </div>
    </>
  );
};

export default LeftMenuComponent;
