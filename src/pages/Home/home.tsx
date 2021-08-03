import { useHistory } from "react-router-dom";
import Illustrationimg from "../../assets/illustration.svg";
import LogoLight from "../../assets/logo.svg";
import LogoDark from "../../assets/logoDark.svg";
import GoogleImg from "../../assets/google-icon.svg";
import { Button } from "../../components/Button/Button";
import { IoInvertModeSharp } from "react-icons/io5";
import { useAuth } from "../../hooks/useAuth";
import { FormEvent, useState } from "react";
import { database } from "../../services/firebase";
import { useContext } from "react";
import { ThemeContextMode } from "../../contexts/ThemeContext";

import {
  PageAuth,
  Aside,
  Main,
  DivForButtonToggleTheme,
  ButtonToggleTheme,
  MainContent,
  GoogleButton,
  DivForFormEnterRoom,
} from "./styleHome";

//<div id="page-auth" className={theme}>

export function Home() {
  const { theme, toggleThemeMode } = useContext(ThemeContextMode);
  const { SinginWithGoogle, user } = useAuth();
  const history = useHistory();
  const [joinRoom, setJoinRoom] = useState("");

  async function HandleCreateRoom() {
    if (!user) {
      await SinginWithGoogle();
    }
    history.push("/rooms/new");
  }

  async function HandleJoinRoom(event: FormEvent) {
    event.preventDefault();
    if (joinRoom.trim() === "") {
      return;
    }

    const roomRef = await database.ref(`rooms/${joinRoom}`).get();

    if (!roomRef.exists()) {
      alert("Room does not exists");
      return;
    }
    if (roomRef.val().endedAt) {
      alert("Room alredy closed.");
      return;
    }

    history.push(`rooms/${roomRef.key}`);
  }

  return (
    <PageAuth className={theme}>
      <Aside>
        <img
          src={Illustrationimg}
          alt="ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de perguntas ao-vivo</strong>
        <p>tire as dúvidas da sua audiência em tempo real</p>
      </Aside>
      <DivForButtonToggleTheme>
        <ButtonToggleTheme type="button" onClick={toggleThemeMode}>
          <IoInvertModeSharp />
        </ButtonToggleTheme>
      </DivForButtonToggleTheme>
      <Main>
        <MainContent>
          <img src={theme === "dark" ? LogoDark : LogoLight} alt="Let me Ask" />
          <GoogleButton onClick={HandleCreateRoom}>
            Crie sua sala com o Google <img src={GoogleImg} alt="logo google" />
          </GoogleButton>
          <DivForFormEnterRoom>ou entre em uma sala</DivForFormEnterRoom>
          <form onSubmit={HandleJoinRoom}>
            <input
              type="text"
              placeholder="digite o código da sala"
              onChange={(event) => setJoinRoom(event.target.value)}
              value={joinRoom}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </MainContent>
      </Main>
    </PageAuth>
  );
}
