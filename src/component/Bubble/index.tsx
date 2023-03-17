import React, { FC } from "react";
import "./index.scss";

interface BubbleProps {
  message: string;
  isQuestion: boolean;
}

const Bubble: FC<BubbleProps> = ({ message, isQuestion }) => {
  return <article className={`${isQuestion ? 'question_message_bubble': 'answer_message_bubble'}`}>{message}</article>;
};

export default Bubble;
