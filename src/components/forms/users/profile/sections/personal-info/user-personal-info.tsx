import SectionComponent from '@/components/common/section/section';
import { UserProfile } from '@/services/users/users.service';

interface UserPersonalInfoProps {
  profile: UserProfile;
}

export default function UserPersonalInfo({ profile }: UserPersonalInfoProps) {
  return (
    <SectionComponent
      title={'Dados pessoais'}
      fields={[{ name: 'first_name' }, { name: 'last_name' }, { name: 'email' }, { name: 'city' }, { name: 'state' }]}
      entry={profile}
      editLink={'/edit-intro'}
    />
  );
}
