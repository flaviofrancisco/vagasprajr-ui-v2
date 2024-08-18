'use client';

import { JobItem } from '@/services/search/search.service';
import { FaEye } from 'react-icons/fa';
import styles from './card.module.css';

interface CardProps {
  job: JobItem;
}

export default function Card({ job }: CardProps) {
  const hideQtyLinks = (short_url: string) => {
    if (short_url.includes('linkedin')) {
      return true;
    }
    return false;
  };

  const formatDate = (date: string) => {
    try {
      const d = new Date(date);
      return d.toLocaleDateString('pt-BR');
    } catch (error) {
      return date;
    }
  };
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          {/* <img className="h-10 w-10 rounded-full" src={job.CompanyLogo} alt={job.CompanyName} /> */}
          <div className="ms-2">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{job.company_name}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{job.title}</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{formatDate(job.created_at)}</p>
        </div>
      </div>
      <div className="mt-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">{job.salary}</p>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-gray-400">{job.provider}</p>
          <p className="text-sm font-medium text-gray-900 dark:text-white">{job.location}</p>
        </div>
        <div className="flex flex-end">
          <div className={styles['view-more-container']}>
            <div className={styles['view-more-item']}>
              {hideQtyLinks(job.job_short_url || '') ? null : (
                <>
                  <FaEye className="mr-1" /> {job?.qty_clicks ?? 0}
                </>
              )}
            </div>
            <a href={job.job_short_url} target="_blank" rel="noopener noreferrer" className="text-sm font-medium text-blue-500 dark:text-blue-400 hover:underline">
              Ver mais
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
