//@ts-nocheck
import { useNostrify } from "@/contexts/Nostrify";
import { useRef } from "react";

const ConnectWithKey = () => {
  const { connectWithHexKey } = useNostrify();
  const hexInputRef = useRef();

  return (
    <div>
      <h1>Escribe tu clave privada en formato hex</h1>
      <input ref={hexInputRef} type="text" />
      <button
        onClick={async () => {
          const connected = await connectWithHexKey(hexInputRef.current.value);
          if (!connected) alert("ocurrió un error");
        }}
      >
        Ingresar
      </button>
    </div>
  );
};

export default ConnectWithKey;
