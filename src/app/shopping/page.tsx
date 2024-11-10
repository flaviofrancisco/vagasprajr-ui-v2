'use client';
import { v4 as uuidv4 } from 'uuid';
import Image from 'next/image';
import { getAdReferences } from '@/services/amazon/amazon-associate.service';
import { useAppDispatch } from '@/services/store';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './page.module.scss';
import Link from 'next/link';

import NordVPN from '@/assets/nordvpn.svg';
import Wise from '@/assets/wise.png';
import MercadoPago from '@/assets/mercado-pago.webp';
import PagBank from '@/assets/pagbank.png';

const ShoppingPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const { adReferences } = useSelector((state: any) => state.amazonAssociateSliceReducer);

  useEffect(() => {
    dispatch(getAdReferences());
  }, [dispatch]);

  return (
    <main className="flex-grow">
      <div className="container mx-auto">
        <h1 className="text-2xl font-bold text-center mt-8">Shopping</h1>
        <h2 className="text-lg text-center mt-4">
          Aqui você encontra cupons de desconto e ofertas exclusivas. Comprando qualquer produto nos links abaixo você vai ajudar nosso projeto e assim poderemos continuar a postar vagas e melhorar
          nosso site. Você pode nos ajudar também através do nosso pix: <strong>contato@vagasprajr.com.br</strong><br/>Muito obrigado! 🚀
        </h2>
        {/* create a div to insert cupons */}
        <div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8 justify-center items-center">
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 justify-center items-center">
              <Link href="https://refer-nordvpn.com/KqOnCVfyCYw" target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center h-48">
                  <Image src={NordVPN} width={500} height={300} sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" alt="NordVPN" className={`${styles['full-height-image']}`} />
                </div>
              </Link>
              Até 3 meses GRÁTIS com o planos de 1 ou 2 anos da NordVPN
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4">
              <Link href="https://t.co/f1y90hxfc9" target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center h-48">
                  <Image src={Wise} width={500} height={300} alt="Wise" className={`w-full h-48 object-cover aspect-ratio`} />
                </div>
              </Link>
              Na sua primeira transferência internacional com a Wise, você não paga nada até £500
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 align-center">
              <Link href="http://mpago.li/32vbRT6" target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center h-48">
                  <Image src={MercadoPago} width={500} height={300} alt="MercadoPago" className={`w-full ${styles['full-height-image']}`} />
                </div>
              </Link>
              Até 84% de desconto na sua PRO 2
            </div>
            <div className="bg-white rounded-lg shadow-lg overflow-hidden p-4 align-center">
              <Link href="http://pagbank.vc/indica-maquininhas-072adfa75" target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center h-48">
                  <Image src={PagBank} width={500} height={300} sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw" alt="NordVPN" className={`${styles['full-height-image']}`} />
                </div>
              </Link>
              Adiquira a sua maquininha do PagBank com até 73% de desconto
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-8">
          {adReferences.map((adReference: any) => (
            <div key={adReference.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
              <Link href={`${adReference.url}`} target="_blank" rel="noopener noreferrer">
                <div className="flex justify-center items-center h-48">
                  <Image
                    src={adReference.image_url}
                    width={500}
                    height={300}
                    sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 25vw"
                    alt={adReference.title}
                    className={`${styles['full-height-image']}`}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-bold">{adReference.title}</h2>
                  <p className="text-sm text-gray-500">{adReference.description}</p>
                  <p className="text-lg font-bold mt-2">{adReference.price}</p>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default ShoppingPage;
