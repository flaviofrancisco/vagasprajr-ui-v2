import Link from 'next/link';
import Image from 'next/image';
import VagasPraJrLogo from '@/assets/logo.png';

export interface ProfileLinkPreviewProps {
  url: string;
}

async function ProfileLinkPreview({ url }: ProfileLinkPreviewProps) {
  return (
    <Link
      href={url}
      target="_blank"
      className="text-black  w-[50%] h-[200px] cursor-pointer flex items-center bg-[#f3f3f3] gap-3 text-left border-white border-[2px]"
      style={{
        textDecoration: 'none',
      }}
    >
      <div className="object-cover h-full">
        <Image src={VagasPraJrLogo} alt={'Profile preview image'} width={500} height={300} />
      </div>
      <div className="p-4 w-[60%]">
        <h3 className="text-3xl font-bold leading-[2rem] mb-2 ">Website Title</h3>
        <p className="text-base  line-clamp-3 mb-2 ">Estou no @vagasprajr, a plataforma de vagas para devs juniores. Acesse e confira as vagas disponíveis!</p>
        <span className="mt-3 opacity-50 text-xs">&nbsp;{`${url}`}</span>
      </div>
    </Link>
  );
}

export default ProfileLinkPreview;
