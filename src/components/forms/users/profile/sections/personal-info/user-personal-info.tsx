import PencilSvg from "@/components/svg/pencil.svg";
import { UserProfile } from "@/services/users/users.service";
import styles from "./user-personal-info.module.scss";
import Link from "next/link";

interface UserPersonalInfoProps {
  profile: UserProfile;
}

export default function UserPersonalInfo({ profile }: UserPersonalInfoProps) {
  return (
    <>
      <h2 className={`${styles['form-cell']} text-xl font-bold`}>Dados pessoais</h2>
      <div className={`${styles['form-row']}`}>
        <div className={`${styles['form-cell']} break-words overflow-hidden text-ellipsis`}>
          <p>
            {profile.first_name} {profile.last_name}
          </p>
          <p>
            {profile.city} {profile.state}
          </p>
          <p>{profile.email}</p>
          <h2 className={`${styles['form-cell']} text-l mt-4 font-bold`}>Sobre mim</h2>
          <p>{profile.about_me}</p>
        </div>
        <div className={`${styles['form-cell']}`}>
          <Link href={'/edit-intro'} key={`edit-intro`} className="float-right">
            <PencilSvg className="h-6 w-6" />
          </Link>
        </div>
      </div>
    </>
  );
}
