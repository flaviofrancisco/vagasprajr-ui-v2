import SectionCollectionComponent from '@/components/common/section/section-collection';
import { UserEducation } from '@/services/users/users.service';

export interface UserEducationProps {
  educations: UserEducation[];
}

export default function UserEducations({ educations }: UserEducationProps) {
  return (
    <SectionCollectionComponent
      hasDates={true}
      title="Formação"
      fields={[{ name: 'institution', className: 'font-bold' }, { name: 'degree', className: 'font-semibold mb-4' }, { name: 'course' }, { name: 'field_of_study' }, { name: 'grade' }]}
      entries={educations}
    />
  );
}
