import {useHistory} from 'react-router-dom'
import Illustrationimg from '../assets/illustration.svg'
import Logo from '../assets/logo.svg'
import GoogleImg from '../assets/google-icon.svg'
import {Button} from '../components/Button'
import '../styles/auth.scss'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'
import { database } from '../services/firebase'
export function Home (){
     
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

        history.push(`rooms/${roomRef.key}`)
    }

    return(

        <div id="page-auth">
            <aside>
                <img src={Illustrationimg} alt="ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de perguntas ao-vivo</strong>
                <p>tire as dúvidas da sua audiência em tempo real</p>
                
            </aside>
            <main>
                <div className="main-content">
                    <img src={Logo} alt="Let me Ask" />
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