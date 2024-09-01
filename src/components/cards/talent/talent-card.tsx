import Image from 'next/image';
import Link from 'next/link';
import UserIcon from '@/assets/user-icon.png';

interface TalentCardProps {
  talent: any;
}
const TalentCard: React.FC<TalentCardProps> = ({ talent }) => {
  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg p-4 mb-4">
      <div className="p-4">
        <div className="flex items-center">
          <div className="flex-shrink-0">{/* <img className="h-12 w-12 rounded-full" src={talent.avatar} alt={talent.name} /> */}</div>
          <div className="ml-4">
            {/** Profile picture: profile_image_url */}
            {talent.profile_image_url ? (
              <Image src={talent.profile_image_url} alt={`${talent.first_name} ${talent.last_name}`} width={48} height={48} className="rounded-full" />
            ) : (
              <Image src={UserIcon} alt={`${talent.first_name} ${talent.last_name}`} width={48} height={48} className="rounded-full" />
            )}
            <p className="text-sm font-medium text-gray-900 dark:text-white">{`${talent.first_name} ${talent.last_name}`}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{talent.city}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400">{talent.state}</p>
            {talent.user_name && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                <Link href={`/im/${talent.user_name}`} className="text-blue-500 hover:text-blue-700 underline">
                  <strong>Meu Perfil</strong>
                </Link>
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TalentCard;
