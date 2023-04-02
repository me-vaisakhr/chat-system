import React, { FC, useEffect, useRef, useState } from "react";
import { HiStop } from "react-icons/hi";
import "./index.scss";
interface SpeechListnerProps {
  value?: string;
  onStopListening: Function;
}

const SpeechListner: FC<SpeechListnerProps> = ({ value, onStopListening }) => {
  const ref = useRef(".");
  const [animateDots, setAnimated] = useState<string>("");
  const MAX_DOTS = 3;
  useEffect(() => {
    let interval = setInterval(() => {
      if (ref.current.length >= MAX_DOTS) {
        ref.current = ".";
      } else {
        ref.current = `${ref.current}.`;
      }
      setAnimated(ref.current);
    }, 1300);

    return () => {
      clearInterval(interval);
    };
  }, []);
  return (
    <div className="listner__container">
      <button
        className="listner_listen_action"
        onClick={() => onStopListening()}
      >
        <HiStop size={32} />
      </button>
      <p>{!!value ? value : `Listening you speech${animateDots}`}</p>
    </div>
  );
};

export default SpeechListner;
