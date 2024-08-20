import { useAppDispatch } from '@/services/store';
import EntryForm from '../../common/entry-form.component';
import styles from './edit-intro.component.module.scss';
import { useSelector } from 'react-redux';
import { useCallback } from 'react';
import usersSlice from '@/services/users/users.service';

export interface EditIntroProps {
  onSubmit: () => void;
}

const EditIntro: React.FC<EditIntroProps> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const { onChangeFieldInput } = usersSlice.actions;
  const { profile } = useSelector((state: any) => state.usersReducer);

  const handleInputChanged = useCallback(
    (value: any, field: string) => {
      dispatch(onChangeFieldInput({ [field]: value || null }));
    },
    [dispatch, onChangeFieldInput]
  );

  const formFields = [
    { name: 'first_name', label: 'Nome', type: 'text', onchange: handleInputChanged },
    { name: 'last_name', label: 'Sobrenome', type: 'text', onchange: handleInputChanged },
    { name: 'city', label: 'Cidade', type: 'text', onchange: handleInputChanged },
    { name: 'state', label: 'UF', type: 'text', onchange: handleInputChanged },
    { name: 'about_me', label: 'Sobre mim', type: 'textarea', onchange: handleInputChanged },
  ];

  return (
    <div className={styles['edit-intro']}>
      <EntryForm fields={formFields} entry={{ ...profile }} onSubmit={onSubmit} />
    </div>
  );
};

export default EditIntro;
