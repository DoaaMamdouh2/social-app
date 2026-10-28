import { createContext, useEffect, useState } from "react";
import { getUserData } from "../../Pages/Login/login.api";
import type { User } from "../../Pages/Login/login.interface";


type AuthContext ={
    userData: User | null,
    setUserData: React.Dispatch<React.SetStateAction<User | null>>
}

export const UserTokenProvider = createContext<AuthContext>({
    userData: null,
    setUserData: () => {}
});

export function AuthUserContextProvider({ children }:{ children: React.ReactNode }) {
    const [userData, setUserData] = useState<User | null>(null);

useEffect(function(){
    getUserData()
      .then(function(data){
        
          setUserData(data)
      })
      
},[])

  return (
    <UserTokenProvider value={{ userData, setUserData }}>
      {children}
    </UserTokenProvider >
  );
}