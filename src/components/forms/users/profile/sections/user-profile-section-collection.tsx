import SectionCollectionComponent from '@/components/common/section/section-collection';
import { FormDefinition } from '../../user-profile-forms';

export interface UserProfileSectionCollectionProps {
  entries: any[];
  form_definition: FormDefinition;
}

export default function UserProfileSectionCollection({ entries, form_definition }: UserProfileSectionCollectionProps) {
  return <SectionCollectionComponent hasDates={form_definition.hasDates} title={form_definition.title} fields={form_definition.simple_definition} entries={entries} entityKey={form_definition.key} />;
}
