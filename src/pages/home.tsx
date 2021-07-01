import {useHistory} from 'react-router-dom'
import Illustrationimg from '../assets/illustration.svg'
import LogoLight from '../assets/logo.svg'
import LogoDark from '../assets/logoDark.svg'
import GoogleImg from '../assets/google-icon.svg'
import {Button} from '../components/Button'
import {IoInvertModeSharp} from 'react-icons/io5'
import '../styles/auth.scss'
import '../styles/theme.scss'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
import { useContext } from 'react'
import {ThemeContextMode} from '../contexts/ThemeContext'
export function Home (){
    const {theme,toggleThemeMode} = useContext(ThemeContextMode)
    const {SinginWithGoogle, user} = useAuth();
    const history = useHistory();
    const [joinRoom, setJoinRoom] = useState('');

    async function HandleCreateRoom(){
        if(!user){
            await SinginWithGoogle()
        }
        history.push('/rooms/new')
    }

    async function HandleJoinRoom(event: FormEvent){
        event.preventDefault()
        if(joinRoom.trim() === ''){
            return
        }

        const roomRef = await database.ref(`rooms/${joinRoom}`).get()

        if(!roomRef.exists()){
          alert('Room does not exists')
          return
        }
        if(roomRef.val().endedAt){
            alert('Room alredy closed.')
            return
        }

        history.push(`rooms/${roomRef.key}`)
    }

    return(

        <div id="page-auth" className={theme}>
            <aside>
                <img src={Illustrationimg} alt="ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de perguntas ao-vivo</strong>
                <p>tire as dúvidas da sua audiência em tempo real</p>
                
            </aside>
            <div className="buttonToggleTheme">
                    <button type="button" onClick={toggleThemeMode}>
                        <IoInvertModeSharp />
                    </button>
                    
                </div>
            <main>
                
                <div className="main-content">
                   
                    <img src={theme==='dark' ? (LogoDark): (LogoLight)} alt="Let me Ask" />
                    <button className="create-room" onClick={HandleCreateRoom}>Crie sua sala com o Google <img src={GoogleImg} alt="logo google" /></button>
                    <div className="separator">ou entre em uma sala</div>
                    <form onSubmit={HandleJoinRoom}>
                        <input 
                          type="text"
                          placeholder="digite o código da sala"
                          onChange={event=> setJoinRoom(event.target.value)}
                          value={joinRoom}
                          />
                          <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}