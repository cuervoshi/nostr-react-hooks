//@ts-nocheck
import usePublishEvent from "@/hooks/usePublishEvent";
import { useRef } from "react";

const PublishPost = () => {
  const { publish } = usePublishEvent();
  const inputRef = useRef();

  return (
    <div>
      <h1>Publicar un posteo</h1>
      <input ref={inputRef} type="text" />
      <button
        type="submit"
        onClick={() => {
          const text = inputRef.current.value;
          if (text) publish({ kind: 1, content: text });
        }}
      >
        Enviar
      </button>
    </div>
  );
};

export default PublishPost;
