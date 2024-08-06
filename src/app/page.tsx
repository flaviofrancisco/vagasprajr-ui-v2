'use client';
import style from './page.module.css';
import SearchForm from '@/components/search/search-form';

export default function Home() {
  return (
    <main className={style['container-job-index']}>
      <div className="w-full">
        <SearchForm />
      </div>
    </main>
  );
}
