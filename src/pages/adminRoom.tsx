import Logo from '../assets/logo.svg'
import {useHistory, useParams} from  'react-router-dom'
import {Button }from '../components/Button'
import {RoomCode} from '../components/RoomCode'
import '../styles/room.scss'
import deleteImg from '../assets/delete.svg'
//import {  useState } from 'react'
//import { useAuth } from '../hooks/useAuth'
//import { database } from '../services/firebase'
import {Question} from '../components/Question'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
 
type roomParams = {
    id: string,
}




export function AdminRoom(){
    const history = useHistory()
    //const {user} = useAuth()
    //const [question, setNewQuestion] = useState('');
    const params = useParams<roomParams>();
    const roomId = params.id;
    const {questions, title} = useRoom(roomId);
 
    async function handleDeleteQuestion(questionId: string){
      if(window.confirm('voce quer excluir a pergunta?')){
           await database.ref(`rooms/${roomId}/questions/${questionId}`).remove()
      }
    }

    async function handleEndRoom(){
        await database.ref(`rooms/${roomId}`).update(
            {
                endedAt: new Date(),
            }
        )
        history.push('/');
    }

    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={Logo} alt="LetmeAsk" />
                    <div>
                      <RoomCode code={params.id} />
                      <Button isOutlined onClick={handleEndRoom}>Encerrar a sala</Button>
                    </div>
                    
                </div>
                
            </header>
            <main className="content">
              <div className="room-title"> 
                <h1>
                    Sala {title}
                </h1>
                <span>
                    {questions.length > 0 && <span> {questions.length} perguntas</span>}
                </span>
                </div>


                <div className="question-list">
                  {questions.map(question => {
                  return( <Question
                           key={question.id}
                           content={question.content}
                           author={question.author}
                           >
                               <button 
                                className="like-button"
                                aria-label="marcar como gostei"
                                type="button"
                                >
                                 <span>10</span>
                                 <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                                 </svg>
 
                               </button>
                               <button
                                 className="delete-button"
                                 aria-label="excluir pergunta"
                                 type="button"
                                 onClick={()=>handleDeleteQuestion(question.id)}
                                 >
                                <img src={deleteImg} alt="deletar pergunta"/>
                               </button>
                            </Question>  
                                )
                   })}
                </div>

            </main>

        </div>
    )
}