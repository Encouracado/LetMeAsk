import styled from "styled-components";

export const RoomCodeButton = styled.button`

    height: 40px;
    border-radius: 8px;
    overflow: hidden;

    background: var(--theme-page-background);
    border: 1px solid #835afd;
    cursor: pointer;
    width:25rem;
    position:relative;

    @media(max-width:700px){
       width:4rem;
     }
    div {
        background: #835afd;
        padding: 8px 14px 8px 8px;
        display: flex;
        justify-content: center;
        align-items: center; 
        position:absolute;
        margin-bottom: 40px;
        @media(max-width:700px){
            margin-right: 5px;
            padding: 0 22px 4px;
        }
      }
    span{
        
        display: block;
        align-self: center;
        flex: 1;
        padding: 0 16px 0 12px;
        width: 230px;
        font-size: 14px;
        font-weight: 500;
        color: var(--theme-page-text);
        margin-left: 40px;
        @media(max-width:700px){
            display:none;
         }
    }


`;