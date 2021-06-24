import copyImg from '../assets/copy.svg'
import '../styles/roomCode.scss'

type RoomCodeProps = {
  code: string;
}

export function RoomCode(props: RoomCodeProps){
    function copyRoomCodeToClipBoard(){
        navigator.clipboard.writeText(props.code)
    }
    return(
        <button className="room-code" onClick={copyRoomCodeToClipBoard}>
            <div>
                <img src={copyImg} alt="copy" />  
            </div>
            <span>Sala #{props.code}</span>
        </button>
    )
}