import { useNostrify } from "@/contexts/Nostrify";

const ConnectWithExtension = () => {
  const { connect } = useNostrify();

  return (
    <div>
      <button onClick={connect}>Conectar</button>
    </div>
  );
};

export default ConnectWithExtension;
