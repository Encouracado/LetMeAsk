import {ButtonHTMLAttributes} from 'react'

import '../styles/button.scss'
import '../styles/theme.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
    isOutlined?: boolean,
}

export function Button({isOutlined, ...props}: ButtonProps){
    return(
        <button 
        className={`button ${isOutlined? 'outlined' : ''}`} 
        {...props} /> 

        
        
    )
}