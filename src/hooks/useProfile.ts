import { Profile } from '@/types/profile';
import { useEffect, useState } from 'react';
import { nip19 } from 'nostr-tools';
import { useSubscription } from './useSubscription';

interface UseProfileReturn {
  profile: Profile;
  id: string;
}

export const useProfile = (pubKey: string): UseProfileReturn => {
  const profileId = nip19.npubEncode(pubKey);

  const { events: userMetadata } = useSubscription({
    filters: [
      {
        kinds: [0],
        authors: [pubKey],
      },
    ],
    options: {
      closeOnEose: true,
    },
    enabled: Boolean(pubKey.length),
  });
  const [profile, setProfile] = useState<Profile>(null);

  useEffect(() => {
    userMetadata.map((event) => {
      try {
        setProfile(JSON.parse(event.content) as Profile);
      } catch {
        alert('ocurrió un error al cargar el perfil');
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userMetadata]);

  return { profile, id: profileId };
};

export default useProfile;
