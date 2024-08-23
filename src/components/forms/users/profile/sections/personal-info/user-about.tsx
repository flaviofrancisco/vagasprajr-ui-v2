import SectionComponent from '@/components/common/section/section';
import { UserProfile } from '@/services/users/users.service';

interface UserAboutProps {
  profile: UserProfile;
}

export default function UserAbout({ profile }: UserAboutProps) {
  return <SectionComponent title={'Sobre mim'} fields={[{ name: 'about_me' }]} entry={profile} />;
}
