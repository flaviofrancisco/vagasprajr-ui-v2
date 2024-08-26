import { useAppDispatch } from '@/services/store';
import usersSlice from '@/services/users/users.service';
import { useSelector } from 'react-redux';
import { FieldDefinition } from '../../field-definition';
import { use, useCallback, useEffect, useState } from 'react';
import EntryForm from '../../common/entry-form.component';

interface ProfileEditItemProps {
  data_key: string;
  id: any;
  onSubmit: () => void;
  fieldDefintion: FieldDefinition[];
}

const ProfileEditItem: React.FC<ProfileEditItemProps> = ({ data_key, id, onSubmit, fieldDefintion }) => {
  const dispatch = useAppDispatch();
  const { onChangeFieldInput } = usersSlice.actions;
  const { profile } = useSelector((state: any) => state.usersReducer);
  const [current_entry, setCurrentEntry] = useState<any>({});
  const [formDefinition, setFormDefinition] = useState<any>([]);

  const onDelete = useCallback(() => {
    let current_profile = { ...profile };
    let current_data = current_profile[data_key];
    let entry_id = id;
    if (!isNaN(+id)) {
      entry_id = parseInt(id);
    }
    current_data = current_data.filter((entry: any) => entry.id !== entry_id);
    dispatch(onChangeFieldInput({ [data_key]: current_data || null }));
  }, [data_key, dispatch, id, onChangeFieldInput, profile]);

  const handleInputChanged = useCallback(
    (value: any, field: string) => {
      const current_profile = { ...profile };
      let current_data = current_profile[data_key];
      let entry_id = id;
      if (!isNaN(+id)) {
        entry_id = parseInt(id);
      }
      const entry = current_data.find((entry: any) => entry.id === entry_id);
      setCurrentEntry({ ...entry, [field]: value });
      current_data = current_data.map((entry: any) => (entry.id === entry_id ? { ...entry, [field]: value } : entry));
      dispatch(onChangeFieldInput({ [data_key]: current_data || null }));
    },
    [data_key, dispatch, id, onChangeFieldInput, profile]
  );

  useEffect(() => {
    let form_definition_copy = [...fieldDefintion];
    form_definition_copy = form_definition_copy.map((field: any) => {
      field.onchange = handleInputChanged;
      return field;
    });
    setFormDefinition(form_definition_copy);
  }, [fieldDefintion, handleInputChanged]);

  useEffect(() => {
    if (!data_key || !profile || !profile[data_key]) {
      return;
    }
    let entry_id = id;
    if (!isNaN(+id)) {
      entry_id = parseInt(id);
    }
    const entry = profile[data_key].find((entry: any) => entry.id === entry_id);
    setCurrentEntry(entry);
  }, [id, data_key, profile]);

  return (
    <div className="w-full">
      <EntryForm fields={formDefinition} entry={{ ...current_entry }} onSubmit={onSubmit} onDelete={onDelete} />
    </div>
  );
};

export default ProfileEditItem;
