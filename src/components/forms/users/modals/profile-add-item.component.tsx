import { FormEvent, useCallback, useEffect, useState } from 'react';
import EntryForm from '../../common/entry-form.component';
import { FieldDefinition } from '../../field-definition';

export interface ProfileAddItemProps {
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  fieldDefintion: FieldDefinition[];
}

const ProfileAddItem: React.FC<ProfileAddItemProps> = ({ onSubmit, fieldDefintion }) => {
  const [entry, setEntry] = useState<any>({});

  const [formDefinition, setFormDefinition] = useState<any>([]);

  const handleInputChanged = useCallback(
    (value: any, field: string) => {
      if (!entry) {
        return;
      }

      const type = fieldDefintion.find((f) => f.name === field)?.type;

      if (type === 'number') {
        value = parseInt(value, 10);
      }

      entry[field] = value;
      setEntry({ ...entry });
    },
    [entry, fieldDefintion]
  );

  useEffect(() => {
    let form_definition_copy = [...fieldDefintion];
    form_definition_copy = form_definition_copy.map((field: any) => {
      field.onchange = handleInputChanged;
      return field;
    });
    setFormDefinition(form_definition_copy);
  }, [fieldDefintion, handleInputChanged]);
  return <EntryForm fields={formDefinition} entry={entry} onSubmit={onSubmit} />;
};

export default ProfileAddItem;
