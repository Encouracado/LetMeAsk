import copyImg from "../../assets/copy.svg";
import { RoomCodeButton } from "./RoomCodeStyles";

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipBoard() {
    navigator.clipboard.writeText(props.code);
  }
  return (
    <RoomCodeButton onClick={copyRoomCodeToClipBoard}>
      <div>
        <img src={copyImg} alt="copy" />
      </div>
      <span>Sala #{props.code}</span>
    </RoomCodeButton>
  );
}
