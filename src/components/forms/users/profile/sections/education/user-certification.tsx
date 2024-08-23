import SectionCollectionComponent from '@/components/common/section/section-collection';
import { UserCertification } from '@/services/users/users.service';

export interface UserCertificationsProps {
  certifications: UserCertification[];
}

export default function UserCertifications({ certifications }: UserCertificationsProps) {
  return (
    <SectionCollectionComponent
      hasDates={true}
      title="Certificações"
      fields={[{ name: 'name', className: 'font-bold' }, { name: 'issuing_company', className: 'font-semibold mb-4' }, { name: 'credential_id' }, { name: 'credential_url' }]}
      entries={certifications}
    />
  );
}
