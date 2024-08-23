import SectionCollectionComponent from '@/components/common/section/section-collection';
import { UserExperience } from '@/services/users/users.service';

interface UserExperiencesProps {
  experiences: UserExperience[];
}

export default function UserExperiences({ experiences }: UserExperiencesProps) {
  return (
    <SectionCollectionComponent
      hasDates={true}
      title="Experiências"
      fields={[{ name: 'position', className: 'font-bold' }, { name: 'company', className: 'font-semibold mb-4' }, { name: 'description' }]}
      entries={experiences}
    />
  );
}
