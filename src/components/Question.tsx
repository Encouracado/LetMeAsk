import { ReactNode } from 'react'
import '../styles/question.scss'
type questionProps = {
  content: string,
  author: {
      name: string,
      avatar: string,
  };
  children?:ReactNode;
}

export function Question( props: questionProps){
    return(
        <div className="question">
            <p>{props.content}</p>
            <footer>
                <div className="user-info"> 
                 <img src={props.author.avatar} alt={props.author.name}  />
                 <span>{props.author.name}</span>
                </div>
                <div>
                    {props.children}
                </div>
            </footer>
        </div>
    )
}