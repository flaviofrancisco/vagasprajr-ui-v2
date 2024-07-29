'use client';
import store from '@/services/store';
import style from './page.module.css';
import { Provider } from 'react-redux';
import SearchForm from '@/components/search/search-form';

export default function Home() {
  return (
    <Provider store={store}>
      <main className={style['container-job-index']}>
        <div className="w-full">
          <SearchForm />
        </div>
      </main>
    </Provider>
  );
}
