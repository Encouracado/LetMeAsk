import Illustrationimg from '../assets/illustration.svg'
import Logo from '../assets/logo.svg'
import GoogleImg from '../assets/google-icon.svg'
import {Button} from '../components/Button'
import '../styles/auth.scss'
export function Home (){
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
                    <button className="create-room">Crie sua sala com o Google <img src={GoogleImg} alt="logo google" /></button>
                    <div className="separator">ou entre em uma sala</div>
                    <form>
                        <input 
                          type="text"
                          placeholder="digite o código da sala"
                          />
                          <Button type="submit">Entrar na sala</Button>
                    </form>
                </div>
            </main>
        </div>
    )
}