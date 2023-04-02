import { ChangeEvent, FC, useEffect, useState } from "react";
import "./index.scss";
import { MdKeyboardVoice } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import useSpeechRecognition from "../../../hook/useSpeechRecognition";
import Toast from "../../Toast";
import SpeechListner from "../SpeechListner";
import { NOT_SUPPORTED_TEXT } from "../../../common/constants";

interface InputWithRecordProps {
  value: string;
  disable?: boolean;
  placeholder?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  onEnterPress?: () => void;
  onSpeechRecognizedResult?: (result: string) => void;
}

const InputWithRecord: FC<InputWithRecordProps> = ({
  value,
  disable,
  placeholder,
  onChange,
  onEnterPress,
  onSpeechRecognizedResult,
}) => {
  const {
    isSupported,
    status: listenStatus,
    result: speechRecognizedResult,
    startListening,
    stopListening,
    abortListning,
  } = useSpeechRecognition();
  const [isSpeechListening, setStatus] = useState<boolean>(false);

  useEffect(() => {
    if (listenStatus === "IDLE") {
      setStatus(false);
    }
  }, [listenStatus]);

  useEffect(() => {
    if (!isSupported) return;
    if (isSpeechListening) startListening();
    else stopListening();
  }, [isSpeechListening]);

  useEffect(() => {
    if (!isSupported) return;
    if (listenStatus === "PROCESS_ENDED") {
      stopListening();
      if (!!speechRecognizedResult) {
        onSpeechRecognizedResult?.(speechRecognizedResult);
      }
    }
  }, [listenStatus]);

  const handleSpeechListening = () => {
    setStatus((status) => !status);
  };

  const handleStopListening = () => {
    handleSpeechListening();
    if (!!speechRecognizedResult) {
      onSpeechRecognizedResult?.(speechRecognizedResult);
    }
  };

  const handleToastClose = () => {
    handleSpeechListening();
  };

  const handleClear = () => {
    onSpeechRecognizedResult?.("");
  };

  return (
    <div className="input__wrapper">
      <input
        value={value}
        className={"text_input"}
        placeholder={placeholder}
        autoFocus
        disabled={disable || isSpeechListening}
        onChange={onChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            onEnterPress?.();
          }
        }}
      />
      {value && (
        <button className="record_base" onClick={handleClear}>
          <IoCloseSharp size={24} />
        </button>
      )}
      {!value && (
        <button className="record_base" onClick={handleSpeechListening}>
          <MdKeyboardVoice size={24} />
        </button>
      )}
      <Toast
        open={isSpeechListening}
        showCloseButton={!isSupported}
        onClose={handleToastClose}
      >
        {isSupported ? (
          <SpeechListner
            onStopListening={() => handleStopListening()}
            value={speechRecognizedResult}
          />
        ) : (
          NOT_SUPPORTED_TEXT
        )}
      </Toast>
    </div>
  );
};

export default InputWithRecord;
