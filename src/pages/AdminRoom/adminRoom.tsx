import LogoLight from "../../assets/logo.svg";
import LogoDark from "../../assets/logoDark.svg";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "../../components/Button/Button";
import { RoomCode } from "../../components/RoomCode/RoomCode";
import deleteImg from "../../assets/delete.svg";
import checkImg from "../../assets/check.svg";
import asnwerImg from "../../assets/answer.svg";
import { Question } from "../../components/Question/Question";
import { useRoom } from "../../hooks/useRoom";
import { database } from "../../services/firebase";
import { useContext } from "react";
import { ThemeContextMode } from "../../contexts/ThemeContext";

import {
  ContentForHeader,
  PageRoom,
  QuestionList,
  HeaderRoom,
  MainRoom,
  RoomTitle,
} from "./adminRoomStyles";

type roomParams = {
  id: string;
};

export function AdminRoom() {
  const { theme } = useContext(ThemeContextMode);
  const history = useHistory();
  const params = useParams<roomParams>();
  const roomId = params.id;
  const { questions, title } = useRoom(roomId);

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm("voce quer excluir a pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });
    history.push("/");
  }
  async function handleCheckQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    });
  }
  async function handleAnswerQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    });
  }

  return (
    <PageRoom id="page-room">
      <HeaderRoom>
        <ContentForHeader>
          <img src={theme === "dark" ? LogoDark : LogoLight} alt="LetmeAsk" />
          <div>
            <RoomCode code={params.id} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar a sala
            </Button>
          </div>
        </ContentForHeader>
      </HeaderRoom>
      <MainRoom>
        <RoomTitle>
          <h1>Sala {title}</h1>
          <span>
            {questions.length > 0 && <span> {questions.length} perguntas</span>}
          </span>
        </RoomTitle>

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
                  <>
                    <button
                      type="button"
                      onClick={() => handleAnswerQuestion(question.id)}
                    >
                      <img src={asnwerImg} alt="dar destaque a pergunta" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestion(question.id)}
                    >
                      <img
                        src={checkImg}
                        alt="marcar pergunta como respondida"
                      />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="deletar pergunta" />
                </button>
              </Question>
            );
          })}
        </QuestionList>
      </MainRoom>
    </PageRoom>
  );
}
