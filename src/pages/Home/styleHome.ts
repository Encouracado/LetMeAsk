import styled from "styled-components";

export const PageAuth = styled.div`

display: flex;
    align-items: stretch;
    height: 100vh;

    @media(max-width:700px){
        display:flex;
        align-items: flex-start;
        justify-content: center;
        flex-direction: column;
        height: 100vh;
        .buttonToggleTheme{
            width: 10rem;
            height:10rem;
        }
    }



`;

export const Aside = styled.aside`

        flex: 7;
        background: var(--theme-page-aside-background);
        color: #fff;
        display: flex;
        flex-direction: column;
        justify-content: center;

        padding: 120px 80px;
        img{
            max-width: 320px; 
        }
       
        strong{
            font: 700 36px 'Poppins', sans-serif;
            line-height: 42px;
            margin-top: 16px;
        }
        p{
            font-size: 24px;
            line-height: 32px;
            margin-top: 16px;
            color: #f8f8f8;
            
        }

        @media(max-width:700px){
           display:none;
        }

`;

export const Main = styled.main`

        flex: 8;
        background: var(--theme-page-background);
        padding: 0 32px;

        display: flex;
        align-items: center;
        justify-content: center;

       
        @media(max-width:700px){
            margin-left:3rem;    
         }


`;

export const ButtonToggleTheme =  styled.button`



svg{
    width:40px;
    height: 40px;
    color:#4B5563;
    
}

background: none;
border:0;
margin-bottom: 35rem;
right:0;


`;

export const DivForButtonToggleTheme = styled.div`

        margin:0;
        display:flex;
        flex-direction: row-reverse;

`;

export const MainContent = styled.div`
        display: flex;
        flex-direction: column;
        width: 100%;
        max-width: 320px;
        align-items: stretch;
        text-align: center;
        > img{
            align-self: center;
        }

        h2{
            font-size: 24px;
            margin: 64px 2px 24px 4px;
            font-family: 'Poppins', sans-serif;
            color:var(--theme-page-text);
        }
        form{
            input{
                height: 50px;
                border-radius: 8px;
                padding: 0 16px;
                background: #fff;
                border: 1px solid #a8a8b3;
            }
            button{
                margin-top: 16px;

            }
            button, input{
                width: 100%;
            }
            
        }
        p{
            font-size: 14px;
            color: #737380;
            margin-top: 16px;
            
            a{  
                margin-left: 10px;
                color: #e559f9;
            }
        }

`;

export const GoogleButton = styled.button`

margin-top: 64px;
        height: 50px;
        border-radius: 8px;
        font-weight: 500;
        background: #ea4335;
        color: #fff;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border:0;

        transition: filter 0.2s;

        img{
            margin-left:8px;
        }

        &:hover{
            filter:brightness(0.9)
        }

`;

export const DivForFormEnterRoom = styled.div`
font-size:14px;
color:#a8a8b3;

margin: 32px 0;
display: flex;
align-items: center;

&::before{
  content: '';
  flex: 1;
  height: 1px;
  background: #a8a8b3;
  margin-right: 16px;
}
&::after{
  content: '';
  flex: 1;
  height: 1px;
  background: #a8a8b3;
  margin-left: 16px;
}
`;