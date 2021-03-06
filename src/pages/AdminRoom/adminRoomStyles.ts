import styled from "styled-components";

export const PageRoom = styled.div`

background: var(--theme-page-background);

`;

export const HeaderRoom = styled.header`

        padding: 24px;
        border-bottom: 1px solid var(--theme-page-border);
        background: var(--theme-page-background);

`;

export const ContentForHeader = styled.div`

        max-width: 1120px;
        margin: 0 auto;
        display:flex;
        align-items: center;
        justify-content: space-between;
        >img{
             max-height: 45px;
        }
        div{
            display: flex;
            gap:16px;
            button{
               height: 40px;
            }
        }

`;

export const MainRoom = styled.main`

@media(max-width:700px){
        display:flex;
        flex-direction: column;
        align-items: center;
        max-width: 70vw;
    }
      background: var(--theme-page-background);
      max-width: 800px;
      margin: 0 auto;

`;

export const RoomTitle = styled.div`

          display: flex;
          align-items: center;
         
          margin: 32px 0 24px;

          >h1{
              font-family: 'Poppins', sans-serif;
              font-size:24px;
              color: var(--theme-page-text);
          }
          >span{
              margin-left: 16px;
              background: #e559f9;
              border-radius: 9999px;
              padding: 8px 16px;
              color: #FFF;
              font-weight: 500;
              font-size: 14px;
          }


`;

export const RoomFormQuestion = styled.form`

>textarea{
              width: 100%;
              
              padding: 16px;
              border-radius: 8px;
              background: #fefefe;
              box-shadow: 0 12px 12px rgba(0 , 0 , 0, 0.04);
              resize: vertical;
              min-height: 130px;
              border:1px solid var(--theme-page-border);
              &.active{
                 border:#2563EB;
 
              }
          }

`;

export const FormFooter = styled.div`

              display: flex;
              align-items: center;
              justify-content: space-between;
              
              margin-top: 14px;

              >span{
                  font-size: 14px;
                  color: var(--theme-page-text);
                  font-weight: 500;
                  >button{
                      background: transparent;
                      border: 0;
                      color: #835Afd;
                      text-decoration: underline;
                      font-size:14px;
                      cursor: pointer;
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
                      color: var(--theme-page-text);
                      font-weight: 500;
                      font-size: 14px;
                  }

`;

export const QuestionList = styled.div`

margin-top: 32px;
          margin-bottom: 32px;

`;