import styled from "styled-components";

export const QuestionContainer = styled.div`

    background: var(--theme-question-background);
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.4);
    padding: 24px;
    border: 1px solid var(--theme-border-question);
 
    &.highlighted{
      background: #f4f0ff;
      border: 1px solid #835afd;

      footer .user-info span{
          color: #29292E;
      }
    }
    &.answered{
    background: var(--theme-background-question-answered);
    
    }

    & + .question{
        margin-top: 8px;
    }
    p{
      color: var(--theme-page-text);
    }
    footer{
        display: flex;
        justify-content: space-between;
        align-items: center;

        >div{
            display: flex;
            gap: 4px;
        }
        button{
            
            border:0;
            background: transparent;
            cursor: pointer;

            gap: 8px;
            transition: filter 0.2s;

            &.like-button{
                display: flex;
                align-items: flex-end;
                color: #737380;
                &.liked{
                    color:#835afd;
                    svg path{
                        stroke: #835afd;
                    }
                }
            }
            &.delete-img{
              margin-left:50px;
              
            }
            &:hoveR{
                filter: brightness(0.7);
            }
        }
    }

`;

export const UserInfo = styled.div`


            display: flex;
            align-items:center;

            img{
                width: 32px;
                height: 32px;
                border-radius: 50%;
            }
            span{
                margin-left: 8px;
                
                color: var(--theme-span-user-color-name);
                font-size: 14px;
                @media(max-width:700px){
                    margin: 10px;
                    font-size: 10px;
                }
            }
        

`;