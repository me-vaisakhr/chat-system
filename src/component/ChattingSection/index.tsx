import React, { ChangeEvent, ChangeEventHandler, FC, useState } from "react";
import "./index.scss";
import InputWithRecord from "./InputWithRecord";

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
      <InputWithRecord
        value={question}
        placeholder="ask me anything"
        disable={isLoading}
        onChange={handleQuestionChange}
        onEnterPress={() => {
          handleSubmit();
        }}
        onSpeechRecognizedResult={(question) => {
          setQuestion(question);
        }}
      />
      <button className="chat_button" onClick={handleSubmit}>
        {isLoading ? `...` : `SEND`}
      </button>
    </>
  );
};

export default ChattingSection;
