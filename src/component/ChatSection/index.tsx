import { FC, useEffect, useRef, useState } from "react";
import { NOT_SUPPORTED_TEXT } from "../../common/constants";
import useTextToVoice from "../../hook/useTextToVoice";
import Bubble from "../Bubble";
import { ChatProps } from "../Layout";
import Toast from "../Toast";
import "./index.scss";

interface ChatSectionProps {
  chats: ChatProps[];
}

const ChatSection: FC<ChatSectionProps> = ({ chats }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [showUnSupportedToast, setShowToast] = useState(false);
  const { isSupported, playTextToVoice } = useTextToVoice();
  const handleCloseToast = () => {
    setShowToast(false);
  };

  const handlePlayAsVoice = (message: string) => {
    if (!isSupported) setShowToast(true);
    else playTextToVoice(message);
  };

  useEffect(() => {
    if (!ref.current) return;
    ref.current.scrollIntoView({ behavior: "smooth" });
  }, [chats]);
  return (
    <div>
      <div>
        {chats.map(({ message, isQuestion }, index) => (
          <Bubble
            key={`message-bubble-${index}`}
            message={message}
            isQuestion={isQuestion}
            onPlayMessage={handlePlayAsVoice}
          />
        ))}
      </div>
      <div className="bottom_wrapper" ref={ref} />
      <Toast
        open={showUnSupportedToast}
        showCloseButton
        onClose={handleCloseToast}
      >
        {NOT_SUPPORTED_TEXT}
      </Toast>
    </div>
  );
};

export default ChatSection;
