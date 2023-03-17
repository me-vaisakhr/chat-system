import React, { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import "./index.scss";

interface ChattingSectionProps {
  isLoading?: boolean;
  onQuestionEntered: (question: string) => void;
}

const ChattingSection: FC<ChattingSectionProps> = ({
  isLoading,
  onQuestionEntered,
}) => {
  const [question, setQuestion] = useState<string>("");
  const handleQuestionChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuestion(e.target.value);
  };
  const handleSubmit = () => {
    if (isLoading) return;
    if (!question) return;
    onQuestionEntered(question);
    setQuestion("");
  };
  return (
    <>
      <input
        value={question}
        className="text_input"
        placeholder="ask me anything"
        autoFocus
        disabled={isLoading}
        onChange={handleQuestionChange}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSubmit();
          }
        }}
      />
      <button className="chat_button" onClick={handleSubmit}>
        {isLoading ? `...` : `SEND`}
      </button>
    </>
  );
};

export default ChattingSection;
