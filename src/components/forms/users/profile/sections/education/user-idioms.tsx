import SectionCollectionComponent from '@/components/common/section/section-collection';
import { UserCertification, UserIdiomInfo } from '@/services/users/users.service';

export interface UserIdiomsProps {
  idioms: UserIdiomInfo[];
}

export default function UserIdioms({ idioms }: UserIdiomsProps) {
  return (
    <SectionCollectionComponent
      hasDates={true}
      title="Idioma(s)"
      fields={[
        { name: 'name', className: 'font-bold' },
        { name: 'level', className: 'font-semibold mb-4' },
      ]}
      entries={idioms}
    />
  );
}
