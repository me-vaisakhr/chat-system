import { useEffect, useRef, useState } from "react";
import instance from "../../api/httpService";
import ChatSection from "../ChatSection";
import ChattingSection from "../ChattingSection";
import "./index.scss";

export interface ChatProps {
  message: string;
  isQuestion: boolean;
}

interface Answer {
  input: string;
  output: string;
  explanantion: string;
}

const Layout = () => {
  const [isLoading, setLoader] = useState<boolean>(false);
  const [chats, setChat] = useState<ChatProps[]>([
    {
      message: "Ask your doubts!!",
      isQuestion: false,
    },
  ]);

  async function fetchAnswer(question: string) {
    setLoader(true);
    instance
      .post("/language-learning", { question })
      .then((response) => response.data)
      .then((data: Answer) => {
        if (data) {
          const { output, explanantion } = data;
          if (output) {
            setChat((chats) => [
              ...chats,
              { message: output, isQuestion: false },
            ]);
          }
          if (explanantion) {
            setTimeout(() => {
              setChat((chats) => [
                ...chats,
                { message: explanantion, isQuestion: false },
              ]);
            }, 500);
          }
        }
        setLoader(false);
      })
      .catch((error) => console.error(error));
  }

  const addToChat = (message: string, isQuestion: boolean = false) => {
    setChat((chats) => [...chats, { message, isQuestion }]);
  };

  const handleQuestion = (question: string) => {
    addToChat(question, true);
    fetchAnswer(question);
  };

  return (
    <main className="container">
      <section className="container__chat_header">
        <p>learn english bot</p>
      </section>
      <section className="container__chat_section">
        <ChatSection chats={chats} />
      </section>
      <section className="container__chating_section">
        <ChattingSection
          onQuestionEntered={handleQuestion}
          isLoading={isLoading}
        />
      </section>
    </main>
  );
};

export default Layout;
