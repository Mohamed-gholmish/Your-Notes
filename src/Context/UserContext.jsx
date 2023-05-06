import { useState } from "react";
import { createContext } from "react";

export let UserContext = createContext({});

export default function UserContextProvider({children}){
    const [token , setToken] = useState(localStorage.getItem("token"));
    const [userInfo , setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
 
    return<><UserContext.Provider value={{token , setToken ,userInfo , setUserInfo}}>{children}</UserContext.Provider></> ;
}