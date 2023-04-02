import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export type RecongnitionStatus =
  | "IDLE"
  | "PROCESS_STARTED"
  | "PROCESS_ENDED"
  | "AUDIO_STARTED"
  | "AUDIO_STOPPED"
  | "SOUND_STARTED"
  | "SOUND_ENDED"
  | "SPEECH_STARTED"
  | "SPEECH_ENDED";

const getSpeechRecognizer = () => {
  try {
    const SpeechRecognizer =
      window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognizer = new SpeechRecognizer();
    recognizer.continuous = false;
    recognizer.lang = "en-US";
    recognizer.interimResults = true;
    recognizer.maxAlternatives = 1;

    return recognizer;
  } catch (e) {
    console.info("Speech is not supported", e);
    return null;
  }
};

const useSpeechRecognition = () => {
  const [isSupported, setSupportStatus] = useState<boolean>(false);
  const recognizer = getSpeechRecognizer();
  const [status, setRecognitionStatus] = useState<RecongnitionStatus>("IDLE");
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    setSupportStatus(!!recognizer);
  }, [recognizer]);

  const startListening = () => {
    recognizer?.start();
  };

  const abortListning = () => {
    recognizer?.abort();
  };

  const stopListening = () => {
    recognizer?.stop();
  };

  if (!!recognizer) {
    recognizer.onaudiostart = (event: any) => {
      setRecognitionStatus("AUDIO_STARTED");
    };
    recognizer.onaudioend = (event: any) => {
      setRecognitionStatus("AUDIO_STOPPED");
    };
    recognizer.onstart = (event: any) => {
      setRecognitionStatus("PROCESS_STARTED");
      setResult("");
    };
    recognizer.onend = (event: any) => {
      setRecognitionStatus("PROCESS_ENDED");
      setTimeout(() => setRecognitionStatus("IDLE"), 500);
    };
    recognizer.onerror = (event: any) => {
      console.info("ERROR", event);
    };
    recognizer.onsoundstart = (event: any) => {
      setRecognitionStatus("SOUND_STARTED");
    };
    recognizer.onsoundend = (event: any) => {
      setRecognitionStatus("SOUND_ENDED");
    };
    recognizer.onspeechstart = (event: any) => {
      setRecognitionStatus("SPEECH_STARTED");
    };
    recognizer.onspeechend = (event: any) => {
      setRecognitionStatus("SPEECH_ENDED");
    };
    recognizer.onresult = (event: any) => {
      setResult(event.results[0][0].transcript);
    };
  }

  return {
    isSupported,
    status,
    result,
    startListening,
    stopListening,
    abortListning,
  } as const;
};

export default useSpeechRecognition;
