import React from 'react';
import styles from './user-links.module.scss';
import Link from 'next/link';
import PencilSvg from '@/components/svg/pencil.svg';
import { UserLink } from '@/services/users/users.service';

interface UserLinksProps {
  links: UserLink[];
  readonly?: boolean;
}

export default function UserLinks({ links, readonly }: UserLinksProps) {
  return (
    <>
      <div className="flex flex-row items-start mt-4">
        {!readonly && (
          <Link href={'/edit-links'} key={`edit-links`} className="bg-blue-500 hover:bg-blue-700 mb-5 text-white font-bold w-6 h-6 rounded-full flex items-center justify-center">
            +
          </Link>
        )}
        <h2 className={`${styles['form-cell']} text-xl font-bold`}>Links</h2>
      </div>
      {links && links.length > 0 && (
        <div className={`${styles['form-row']}`}>
          <ul className={`${styles['links-container']}`}>
            {links.map((link: any, index: number) => (
              <li className={`${styles['url-wrapper']} mt-2 text-gray-500 dark:text-white`} key={index}>
                <Link href={link.url} passHref target="_blank" rel="noopener noreferrer">
                  {link.url}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  );
}
