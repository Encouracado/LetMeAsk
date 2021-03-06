import styled from "styled-components";

export const StyledButton = styled.button`

        height: 50px;
        border-radius: 8px;
        font-weight: 500;
        background: var(--theme-page-buttons);
        color: #fff;
        padding: 0 32px;

        display: flex;
        align-items: center;
        justify-content: center;

        cursor: pointer;
        border:0;

        transition: filter 0.2s;

        &.outlined{
            background: #835afd;
            border: 1px solid #835afd;
            color: #fff;
        }

        img{
            margin-left:8px;
        }

        &:not(:disabled):hover{
            filter:brightness(0.9)
        }

        &:disabled{
            opacity: 0.6;
            cursor: not-allowed;
        }



`;