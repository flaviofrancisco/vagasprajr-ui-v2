'use client';
import SearchInput from '@/components/inputs/select-checkbox/search-input';
import style from './page.module.scss';

export default function TalensPage() {
  return (
    <main className={`grid mt-10 mb-10 w-full flex-grow`}>
      <form className="w-full">
        <div className="w-4/5 mx-auto">
          <SearchInput placeholder="Buscar talentos ..." onChange={() => {}} type={'submit'} />
        </div>
      </form>
    </main>
  );
}
