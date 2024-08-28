import SectionComponent from '@/components/common/section/section';
import { UserProfile } from '@/services/users/users.service';
import { FormDefinition } from '../../user-profile-forms';

interface UserProfileSectionProps {
  profile: UserProfile;
  form_definition: FormDefinition;
  readonly?: boolean;
}

export default function UserProfileSection({ profile, form_definition, readonly }: UserProfileSectionProps) {
  return <SectionComponent readonly={readonly} title={form_definition.title} fields={form_definition.simple_definition} entry={profile} data={form_definition.key} />;
}
