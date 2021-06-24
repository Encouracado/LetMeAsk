import Logo from '../assets/logo.svg'
import {useParams} from  'react-router-dom'
import {Button }from '../components/Button'
import {RoomCode} from '../components/RoomCode'
import '../styles/room.scss'
import { FormEvent, useEffect, useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'

type roomParams = {
    id: string,
}

type FirebaseQuestions = Record<string, {
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
}>

type Questions = {
    id: string,
    author: {
        name: string,
        avatar: string
    },
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,

}
export function Room(){
    const {user} = useAuth()
    const [question, setNewQuestion] = useState('');
    const params = useParams<roomParams>();
    const [questions, setQuestions] = useState<Questions[]>([])
    const [title, setTitle] = useState('');
    const roomId = params.id;


    /*useEffect(() =>{

        const roomRef = database.ref(`rooms/${roomId}`)
        console.log({ roomId, roomRef })
        roomRef.once('value', room =>{
            const databaseRoom = room.val();
            const firebaseQuestions: FirebaseQuestions = databaseRoom.quesitons ?? {}; 

            const parsedQuestions = Object.entries(firebaseQuestions).map( ([key, value]) => {
               return {
                   id: key,
                   content: value.content,
                   author: value.author,
                   isHighlighted: value.isHighlighted,
                   isAnswered: value.isAnswered
               }
           })
           setTitle(databaseRoom.title)
           setQuestions(parsedQuestions)
           console.log(questions)
        })
        

    },[roomId])*/
    useEffect(() => {
        const roomRef = database.ref(`rooms/${roomId}`);
    
        roomRef.on('value', room => {
          const databaseRoom = room.val();
          const firebaseQuestions: FirebaseQuestions = databaseRoom.questions ?? {};
    
          const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
            return {
              id: key,
              content: value.content,
              author: value.author,
              isHighlighted: value.isHighlighted,
              isAnswered: value.isAnswered,
            }
          })
          console.log(parsedQuestions);
          setTitle(databaseRoom.title);
          setQuestions(parsedQuestions);
        })
      }, [roomId]);

      
    async function HandleSendQuestion(event: FormEvent){
        event.preventDefault();
       if(question.trim()===''){
           return
       }
       if(!user){
           throw new Error('You must have logged in')
       }

       const Newquestion = {
           content: question,
           author: {
               name: user.name,
               avatar: user.avatar,

           },
           isHighLighted:false,
           isAnswered: false,
       }
      await database.ref(`rooms/${params.id}/questions`).push(Newquestion)
      setNewQuestion('')
    }


    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={Logo} alt="LetmeAsk" />
                    <RoomCode code={params.id} />
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
                <form onSubmit={HandleSendQuestion}>
                    <textarea 
                      placeholder="o que voçe quer perguntar?"
                      onChange = {event => setNewQuestion(event.target.value)}
                      value={question}
                    />
                    <div className="form-footer">
                        {user? 
                        (<div className="user-info">
                            <img src={user.avatar} alt={user.name}/>
                            <span>{user.name}</span>
                        </div>): 
                        (<span>Para Enviar uma pergunta,<button>faça seu login</button>.</span>)}
                        <Button type="submit" disabled={!user} > Enviar Pergunta </Button>
                        
                    </div>   
                    
                </form>

              
            </main>

        </div>
    )
}