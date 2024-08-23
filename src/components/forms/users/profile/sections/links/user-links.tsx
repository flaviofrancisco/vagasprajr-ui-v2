import React from 'react';
import styles from './user-links.module.scss';
import Link from 'next/link';
import PencilSvg from '@/components/svg/pencil.svg';
import { UserLink } from '@/services/users/users.service';

interface UserLinksProps {
  links: UserLink[];
}

export default function UserLinks({ links }: UserLinksProps) {
  return (
    <>
      <h2 className={`${styles['form-cell']} text-xl font-bold`}>Links</h2>
      {links && links.length > 0 && (
        <div className={`${styles['form-row']}`}>
          <ul className={`${styles['links-container']}`}>
            {links.map((link: any, index: number) => (
              <li className={`${styles['url-wrapper']} mt-2 text-gray-500`} key={index}>
                <Link href={link.url}>{link.url}</Link>
              </li>
            ))}
          </ul>
          <div className={`${styles['form-cell']}`}>
            <Link href={'/edit-links'} key={`edit-links`} className="float-right">
              <PencilSvg className="h-6 w-6" />
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
