import { useState } from "react";
import { createContext } from "react";

export let UserContext = createContext({});

export default function UserContextProvider({children}){
    const [token , setToken] = useState(localStorage.getItem("token"));
    const [userInfo , setUserInfo] = useState(JSON.parse(localStorage.getItem("userInfo")));
    function logOut(){
        localStorage.removeItem("token");
        localStorage.removeItem("userInfo")
        setToken(null);
        setUserInfo(null);
    }
 
    return<><UserContext.Provider value={{token , setToken ,userInfo , setUserInfo,logOut}}>{children}</UserContext.Provider></> ;
}