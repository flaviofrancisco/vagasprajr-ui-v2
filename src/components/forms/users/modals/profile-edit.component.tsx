'use client';
import { useAppDispatch } from '@/services/store';
import EntryForm from '../../common/entry-form.component';
import { useSelector } from 'react-redux';
import { useCallback, useEffect, useState } from 'react';
import usersSlice from '@/services/users/users.service';
import { FieldDefinition } from '../../field-definition';

export interface ProfileEditProps {
  onSubmit: () => void;
  fieldDefintion: FieldDefinition[];
}

const ProfileEdit: React.FC<ProfileEditProps> = ({ onSubmit, fieldDefintion }) => {
  const dispatch = useAppDispatch();
  const { onChangeFieldInput } = usersSlice.actions;
  const { profile } = useSelector((state: any) => state.usersReducer);
  const [formDefinition, setFormDefinition] = useState<any>([]);

  const handleInputChanged = useCallback(
    (value: any, field: string) => {
      dispatch(onChangeFieldInput({ [field]: value || null }));
    },
    [dispatch, onChangeFieldInput]
  );

  useEffect(() => {
    let form_definition_copy = [...fieldDefintion];
    form_definition_copy = form_definition_copy.map((field: any) => {
      field.onchange = handleInputChanged;
      return field;
    });
    setFormDefinition(form_definition_copy);
  }, [fieldDefintion, handleInputChanged]);

  return <EntryForm fields={formDefinition} entry={{ ...profile }} onSubmit={onSubmit} />;
};

export default ProfileEdit;
