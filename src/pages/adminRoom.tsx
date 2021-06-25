import Logo from '../assets/logo.svg'
import {useHistory, useParams} from  'react-router-dom'
import {Button }from '../components/Button'
import {RoomCode} from '../components/RoomCode'
import '../styles/room.scss'
import deleteImg from '../assets/delete.svg'
import checkImg from '../assets/check.svg'
import asnwerImg from '../assets/answer.svg'
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
    async function handleCheckQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
           isHighlighted: true,
        })
    }
    async function handleAnswerQuestion(questionId: string){
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        })
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
                           isAnswered={question.isAnswered}
                           isHighLighted={question.isHighlighted}
                           >
                               {!question.isAnswered && (
                                   <>
                                     <button
                                     type="button"
                                      onClick={()=>handleAnswerQuestion(question.id)}
                                     >
                                     <img src={asnwerImg} alt="dar destaque a pergunta"/>
                                     </button>
                                     <button
                                     type="button"
                                     onClick={()=>handleCheckQuestion(question.id)}
                                      >
                                     <img src={checkImg} alt="marcar pergunta como respondida"/>
                                      </button>
                                   </>
                               ) }
                               <button
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