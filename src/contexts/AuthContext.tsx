import { createContext, ReactNode, useEffect, useState } from "react";
import {firebase, auth} from '../services/firebase'
type AuthContextType = {
    user: User | undefined,
    SinginWithGoogle: () => Promise<void>,
  }
  
  type User = {
    id: string,
    name: string,
    avatar: string | undefined,
  }
  
  type AuthContextProviderProps = {
      children: ReactNode
  }

export const AuthContext = createContext({} as AuthContextType)
export function AuthContextProvider(props: AuthContextProviderProps){
    useEffect(() =>{

        //se o usuario ja tiver se autenticado e der f5 o login nao é perdido com essa função
        const unsubscribe = auth.onAuthStateChanged(user=>{
          if(user){
            const {displayName, photoURL, uid} = user
    
            if(!displayName || !photoURL){
              throw new Error('Missing information from Google Account')
            }
            setUser({
              id: uid,
              name: displayName,
              avatar: photoURL,
            })
          }
          
        })
        return () =>{
          unsubscribe();
        }
      }, [])
    
      const [user, setUser] = useState<User>();
    
      async function SinginWithGoogle(){
        const provider = new firebase.auth.GoogleAuthProvider();
        const result = await auth.signInWithPopup(provider);
        
         
            if(result.user){
              const {displayName, photoURL, uid} = result.user
    
              if(!displayName || !photoURL){
                throw new Error('Missing information from Google Account')
              }
              setUser({
                id: uid,
                name: displayName,
                avatar: photoURL,
              })
            }
    
        
       
      }
    return(
        <AuthContext.Provider value={{user, SinginWithGoogle}}>
        
        {props.children}

        </AuthContext.Provider>

    );
}