import { ReactNode } from "react";
import { QuestionContainer, UserInfo } from "./QuestionStyles";
import cx from "classnames";
type questionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighLighted?: boolean;
};

export function Question({
  author,
  content,
  children,
  isAnswered = false,
  isHighLighted = false,
}: questionProps) {
  return (
    <QuestionContainer
      className={cx(
        "question",
        { answered: isAnswered },
        { highlighted: isHighLighted && !isAnswered }
      )}
    >
      <p>{content}</p>
      <footer>
        <UserInfo>
          <img src={author.avatar} alt={author.name} />
          <span>{author.name}</span>
        </UserInfo>
        <div>{children}</div>
      </footer>
    </QuestionContainer>
  );
}
