import SectionComponent from '@/components/common/section/section';
import { UserProfile } from '@/services/users/users.service';
import { FormDefinition } from '../../user-profile-forms';

interface UserProfileSectionProps {
  profile: UserProfile;
  form: FormDefinition;
}

export default function UserProfileSection({ profile, form }: UserProfileSectionProps) {
  return <SectionComponent title={form.title} fields={form.simple_definition} entry={profile} data={form.key} />;
}
