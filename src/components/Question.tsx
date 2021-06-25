import { ReactNode } from 'react'
import '../styles/question.scss'
import cx from 'classnames'
type questionProps = {
  content: string,
  author: {
      name: string,
      avatar: string,
  };
  children?:ReactNode;
  isAnswered?:boolean;
  isHighLighted?:boolean;
}

export function Question({author, content, children, isAnswered= false, isHighLighted= false}: questionProps){
   
    return(
        <div className={cx('question', {answered: isAnswered}, {highlighted: isHighLighted && !isAnswered})}>
            <p>{content}</p>
            <footer>
                <div className="user-info"> 
                 <img src={author.avatar} alt={author.name}  />
                 <span>{author.name}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}