import useProfile from "@/hooks/useProfile";
import TipButton from "../buttons/TipButton";

interface ProfileProps {
  pubKey: string;
}

export const Profile = ({ pubKey }: ProfileProps) => {
  const { profile } = useProfile(pubKey);
  if (!profile) return <div>Cargando perfil...</div>;

  return (
    <div className="text-md mb-5 flex flex-col justify-center md:flex-row">
      <div className="flex flex-row justify-center">
        {profile.picture ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            className="h-52 min-h-fit w-52 min-w-fit rounded-full"
            alt=""
            src={profile.picture}
            width={400}
            height={400}
          />
        ) : (
          "No image"
        )}
      </div>
      <div className="flex flex-col p-4 text-lg">
        <div className="text-3xl">{profile?.display_name}</div>
        {profile.about && <div>{profile.about}</div>}
        {profile.nip05 && <div>{profile.nip05}</div>}
        {profile.website && (
          <div>
            Sitio web:{" "}
            <a href={profile.website} target="_blank">
              {profile.website}
            </a>
          </div>
        )}
        <div className="text-xs">{profile?.npub}</div>
        {profile.lud16 && (
          <div className="mt-3 flex flex-row justify-center">
            <TipButton lnURLw={profile?.lud16} />
          </div>
        )}
        {/* <BadgesList pubKey={pubKey} /> */}
      </div>
    </div>
  );
};

export default Profile;
