import Illustrationimg from '../assets/illustration.svg'
import Logo from '../assets/logo.svg'
import {Button} from '../components/Button'
import '../styles/auth.scss'
export function NewRoom (){
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
                    <h2>Criar uma nova sala.</h2>
                    <form>
                        <input 
                          type="text"
                          placeholder="digite o código da sala"
                          />
                          <Button type="submit">Criar Sala</Button>
                    </form>
                    <p>
                        Quer entrar em uma sala existente?<a href="#">Clique aqui</a>
                    </p>
                </div>
            </main>
        </div>
    )
}