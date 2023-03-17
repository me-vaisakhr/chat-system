import { FC, useEffect, useRef } from "react";
import Bubble from "../Bubble";
import { ChatProps } from "../Layout";
import "./index.scss";

interface ChatSectionProps {
  chats: ChatProps[];
}

const ChatSection: FC<ChatSectionProps> = ({ chats }) => {
  const ref = useRef<HTMLDivElement>(null);

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
          />
        ))}
      </div>
      <div className="bottom_wrapper" ref={ref} />
    </div>
  );
};

export default ChatSection;
