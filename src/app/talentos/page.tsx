'use client';
import SearchInput from '@/components/inputs/search/search-input';
import SearchResults from '@/components/inputs/search/search-results';
import { useAppDispatch } from '@/services/store';
import { useSelector } from 'react-redux';
import talentsSlice, { doGetTalentsPublic } from '@/services/users/talents.service';

export default function TalensPage() {
  const dispatch = useAppDispatch();
  const { onResetState, onSetFilter } = talentsSlice.actions;
  const { talent_result, filter } = useSelector((state: any) => state.talentsSliceReducer);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(doGetTalentsPublic({ request: { ...filter, page: 0, page_size: 10, is_ascending: false, sort: 'created_at' } }));
  };

  const onLoadMore = (page: number) => {
    let move_next = page + 1;
    dispatch(doGetTalentsPublic({ request: { ...filter, page: move_next, page_size: 10, is_ascending: false, sort: 'created_at' } }));
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(onResetState());
    dispatch(
      onSetFilter({
        ...filter,
        filters: [
          {
            operator: 'or',
            fields: [
              {
                name: 'city',
                value: e.target.value,
                type: 'string',
              },
              {
                name: 'uf',
                value: e.target.value,
                type: 'string',
              },
              {
                name: 'state',
                value: e.target.value,
                type: 'string',
              },
              {
                name: 'first_name',
                value: e.target.value,
                type: 'string',
              },
              {
                name: 'last_name',
                value: e.target.value,
                type: 'string',
              },
              {
                name: 'user_name',
                value: e.target.value,
                type: 'string',
              },
              {
                name: 'experiences.description',
                value: e.target.value,
                type: 'string',
              },
              {
                name: 'tech_experiences.technology',
                value: e.target.value,
                type: 'string',
              },
              {
                name: 'idioms_info.name',
                value: e.target.value,
                type: 'string',
              },
            ],
          },
        ],
      })
    );
  };

  return (
    <main className={`grid mt-10 mb-10 w-full flex-grow h-screenflex`}>
      <div className="flex w-4/5 mx-auto flex-grow">
        <form className="w-full" onSubmit={onSubmit}>
          <div className="w-full mx-auto flex-grow">
            <SearchInput placeholder="Buscar talentos ..." onChange={onChange} type={'submit'} />
          </div>
        </form>
      </div>
      <div className="flex flex-grow">
        <SearchResults results={talent_result} type={'talents'} onLoadMore={onLoadMore} />
      </div>
    </main>
  );
}
