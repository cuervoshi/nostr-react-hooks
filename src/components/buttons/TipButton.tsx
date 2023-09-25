import { useNostrify } from "@/contexts/Nostrify";

export interface TipButtonProps {
  lnURLw: string;
}

export const TipButton = ({ lnURLw }: TipButtonProps) => {
  const { providers } = useNostrify();
  const { webln } = providers;

  const sendTip = async () => {
    try {
      await webln?.enable();
      await webln?.lnurl(lnURLw);
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <button
      className="h-10 w-10 rounded-full bg-white/10 p-2 hover:bg-white/20 active:scale-95 active:bg-white/5"
      onClick={() => void sendTip()}
    >
      Enviar sats
    </button>
  );
};

export default TipButton;
