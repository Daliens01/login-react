import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";

export const AuthContext = createContext()
export const useAuth = ()=>{
    const context = useContext(AuthContext)
    if(!context){
        throw new Error("useauth must be used within an authprovider")
    }
    return context
}
export const AuthProvider = ({children})=>{
    const [user,setUser] = useState(null)
    const [isAuthenticated, setisAuthnticated] = useState(false)
    const [errors, setErrors] =  useState([])
    const signup = async (user) =>{
        try {
            const res = await registerRequest(user)
        
        setUser(res.data)
        setisAuthnticated(true)
        } catch (error) {
            setErrors(error.response.data)
            
        }
    }
    const signin = async (user) =>{
        try {
            const res = await loginRequest(user)
            console.log(res);
            
        } catch (error) {
            if(Array.isArray(error.response.data)){
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])
            
        }
    }

    useEffect(()=>{
        if(errors.length > 0){
           const timer =  setTimeout(() => {
                setErrors([])
            }, 5000);
            return ()=> clearTimeout(timer)
        }
    },[errors])
    return(
        <AuthContext.Provider value={{
            signup,signin,user,isAuthenticated,errors
        }}>
            {children}
        </AuthContext.Provider>
    )
}