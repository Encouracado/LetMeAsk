import  { createContext, useState, useEffect, ReactNode } from 'react'

type Theme = {
    theme: string,
    toggleThemeMode: () => void,
}

type ThemeContextProviderProps = {
    children: ReactNode
}

export const ThemeContextMode = createContext({} as Theme)

export function ThemeContext(props :ThemeContextProviderProps){

    const[theme, setTheme] = useState('light');
    useEffect(() => {
        if (
          localStorage.getItem('theme') === 'dark' ||
          (!('theme' in localStorage) &&
            window.matchMedia('(prefers-color-scheme: dark)').matches)
        ) {
          document.querySelector<any>('html').classList.add('dark')
          setTheme('dark')
        } else {
          document.querySelector<any>('html').classList.remove('dark')
          setTheme('light')
        }
    }, [])

    function toggleThemeMode() {
        if (
           !localStorage.getItem('theme') ||
           localStorage.getItem('theme') === 'light'
        ) {
           localStorage.theme = 'dark'
           document.querySelector<any>('html').classList.add('dark')
           setTheme('dark')
        } else {
           localStorage.theme = 'light'
           document.querySelector<any>('html').classList.remove('dark')
           setTheme('light')
        }
     }
   
     return (
        <ThemeContextMode.Provider value={{ theme, toggleThemeMode }}>
          {props.children}
        </ThemeContextMode.Provider>
    )


}