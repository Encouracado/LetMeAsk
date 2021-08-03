import LogoLight from "../../assets/logo.svg";
import LogoDark from "../../assets/logoDark.svg";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { RoomCode } from "../../components/RoomCode/RoomCode";
import { FormEvent, useState } from "react";
import { useAuth } from "../../hooks/useAuth";
import { database } from "../../services/firebase";
import { Question } from "../../components/Question/Question";
import { useRoom } from "../../hooks/useRoom";
import { useContext } from "react";
import { ThemeContextMode } from "../../contexts/ThemeContext";

import {
  PageRoom,
  ContentForHeader,
  HeaderRoom,
  MainRoom,
  RoomTitle,
  RoomFormQuestion,
  FormFooter,
  UserInfo,
  QuestionList,
} from "./roomStyles";

type roomParams = {
  id: string;
};

export function Room() {
  const { theme } = useContext(ThemeContextMode);
  const { user } = useAuth();
  const [question, setNewQuestion] = useState("");
  const params = useParams<roomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);
  console.log(questions);

  async function HandleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if (question.trim() === "") {
      return;
    }
    if (!user) {
      throw new Error("You must have logged in");
    }

    const Newquestion = {
      content: question,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighLighted: false,
      isAnswered: false,
    };
    await database.ref(`rooms/${params.id}/questions`).push(Newquestion);
    setNewQuestion("");
  }

  async function handleLikeQuestion(
    questionId: string,
    likeId: string | undefined
  ) {
    if (likeId) {
      await database
        .ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
        .remove();
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      });
    }
  }

  return (
    <PageRoom className={theme}>
      <HeaderRoom>
        <ContentForHeader>
          <img src={theme === "dark" ? LogoDark : LogoLight} alt="LetmeAsk" />
          <RoomCode code={params.id} />
        </ContentForHeader>
      </HeaderRoom>
      <MainRoom>
        <RoomTitle>
          <h1>Sala {title}</h1>
          <span>
            {questions.length > 0 && <span> {questions.length} perguntas</span>}
          </span>
        </RoomTitle>
        <RoomFormQuestion onSubmit={HandleSendQuestion}>
          <textarea
            placeholder="o que voçe quer perguntar?"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={question}
          />
          <FormFooter>
            {user ? (
              <UserInfo>
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </UserInfo>
            ) : (
              <span>
                Para Enviar uma pergunta,<button>faça seu login</button>.
              </span>
            )}
            <Button type="submit" disabled={!user}>
              {" "}
              Enviar Pergunta{" "}
            </Button>
          </FormFooter>
        </RoomFormQuestion>

        <QuestionList>
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
                isAnswered={question.isAnswered}
                isHighLighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    className={`like-button ${question.likeId ? "liked" : ""}`}
                    type="button"
                    aria-label="marcar como gostei"
                    onClick={() =>
                      handleLikeQuestion(question.id, question.likeId)
                    }
                  >
                    {question.likeCount > 0 && (
                      <span>{question.likeCount}</span>
                    )}
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z"
                        stroke="#737380"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                )}
              </Question>
            );
          })}
        </QuestionList>
      </MainRoom>
    </PageRoom>
  );
}
