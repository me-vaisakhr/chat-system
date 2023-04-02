import { FC } from "react";
import "./index.scss";
import { AiOutlineSound } from "react-icons/ai";

interface BubbleProps {
  message: string;
  isQuestion: boolean;
  onPlayMessage?: (message: string) => void;
}

const Bubble: FC<BubbleProps> = ({ message, isQuestion, onPlayMessage }) => {
  return (
    <article
      className={`${
        isQuestion ? "question_message_bubble" : "answer_message_bubble"
      }`}
    >
      <div className="answer_text">{message}</div>
      <div className="answer_actions">
        <button
          className="answer_voice_play"
          onClick={() => onPlayMessage?.(message)}
        >
          <AiOutlineSound size={24} />
        </button>
      </div>
    </article>
  );
};

export default Bubble;
