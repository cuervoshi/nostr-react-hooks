'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';

import { useNostrify } from '@/contexts/Nostrify';
import useProfile from '@/hooks/useProfile';

const Component = () => {
  const { userPubkey } = useNostrify();
  const { id } = useProfile(userPubkey);

  return (
    <nav>
      <ul>
        <li>
          <Link href='/'>Inicio</Link>
        </li>
        {userPubkey && (
          <li>
            <Link href={`/p/${id}`}>Perfil</Link>
          </li>
        )}
        <li>
          <Link href='/settings'>Configuracion</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Component;
