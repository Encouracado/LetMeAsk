import Illustrationimg from '../assets/illustration.svg'
import LogoLight from '../assets/logo.svg'
import LogoDark from '../assets/logoDark.svg'
import {Link, useHistory} from 'react-router-dom'
import {Button} from '../components/Button'
import {FormEvent, useState} from 'react'
import '../styles/auth.scss'

import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { useContext } from 'react'
import {ThemeContextMode} from '../contexts/ThemeContext'

export function NewRoom (){
    const {theme} = useContext(ThemeContextMode)
    const history = useHistory();
    const [newRoom, setNewRoom] = useState('');
    async function HandleCreateRoom(event: FormEvent){
        event.preventDefault();

        if(newRoom.trim() === ''){
            return
        }

        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,

        })

        history.push(`/rooms/admin/${firebaseRoom.key}`)
    }

    const {user} = useAuth();
    return(
        <div id="page-auth" className={theme}>
            <aside>
                <img src={Illustrationimg} alt="ilustração simbolizando perguntas e respostas"/>
                <strong>Crie salas de perguntas ao-vivo</strong>
                <p>tire as dúvidas da sua audiência em tempo real</p>
                
            </aside>
            <main>
                <div className="main-content">
                    <img src={theme==='dark' ? (LogoDark): (LogoLight)} alt="Let me Ask" />
                    
                    <h2>Criar uma nova sala.</h2>
                    <form onSubmit={HandleCreateRoom}>
                        <input 
                          type="text"
                          placeholder="digite o código da sala"
                          onChange = { event => setNewRoom(event.target.value)}
                          value={newRoom}
                          />
                          <Button type="submit">Criar Sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?<Link to="/">Clique aqui</Link>
                    </p>
                </div>
            </main>
        </div>
    )
}