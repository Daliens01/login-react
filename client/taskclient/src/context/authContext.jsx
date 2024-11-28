import { createContext, useContext, useState, useEffect } from "react";
import { registerRequest, loginRequest } from "../api/auth";
import Cookies from "js-cookie"
import { verifyTokenRequest } from "../api/auth";
export const AuthContext = createContext()
export const useAuth = () => {
    const context = useContext(AuthContext)
    if (!context) {
        throw new Error("useauth must be used within an authprovider")
    }
    return context
}
export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [isAuthenticated, setisAuthnticated] = useState(false)
    const [errors, setErrors] = useState([])
    const [loading, setLoading] = useState(true)
    const signup = async (user) => {
        try {
            const res = await registerRequest(user)

            setUser(res.data)
            setisAuthnticated(true)
        } catch (error) {
            setErrors(error.response.data)

        }
    }
    const signin = async (user) => {
        try {
            const res = await loginRequest(user)
            console.log(res);
            setisAuthnticated(true)
            setUser(res.data)
        } catch (error) {
            if (Array.isArray(error.response.data)) {
                return setErrors(error.response.data)
            }
            setErrors([error.response.data.message])

        }
    }
    const logout = ( )=>{
        Cookies.remove("token")
        setisAuthnticated(false)
        setUser(null)
    }

    useEffect(() => {
        if (errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 5000);
            return () => clearTimeout(timer)
        }
    }, [errors])
    useEffect(() => {
        const checkLogin = async () =>{
            const cookies = Cookies.get()

        if (!cookies.token) {
            setisAuthnticated(false)
            setLoading(false)
           return setUser(null)
        }
            try {
                const res = await verifyTokenRequest(cookies.token)
                if (!res.data) {
                     setisAuthnticated(false)
                     return setLoading(false)
                }
                setisAuthnticated(true)
                setUser(res.data)
                setLoading(false)
            } catch (error) {
                setisAuthnticated(false)
                setUser(null)
                setLoading(false)
            }
        
        }
        checkLogin()
    }, [])
    return (
        <AuthContext.Provider value={{
            signup, signin, user, isAuthenticated, errors, loading,logout
        }}>
            {children}
        </AuthContext.Provider>
    )
}