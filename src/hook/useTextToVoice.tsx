import { useEffect, useState } from "react";

declare global {
  interface Window {
    webkitSpeechSynthesis: any;
  }
}

const getSpeechSynthesis = () => {
  try {
    const synthesis =
      window.speechSynthesis ||
      new SpeechSynthesis() ||
      window.webkitSpeechSynthesis;
    return synthesis;
  } catch (e) {
    console.info(e);
    return null;
  }
};

const useTextToVoice = () => {
  const [isSupported, setSupportStatus] = useState<boolean>(false);
  const synth = getSpeechSynthesis();
  useEffect(() => {
    setSupportStatus(!!synth);
  }, [synth]);

  const playTextToVoice = (text: string) => {
    try {
      if (!synth) return;
      if (!isSupported) return;

      const utterThis = new SpeechSynthesisUtterance(text);
      synth.speak(utterThis);
    } catch (e) {}
  };

  return { isSupported, playTextToVoice };
};

export default useTextToVoice;
