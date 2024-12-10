import { useForm } from "react-hook-form"
import { useAuth } from "../context/authContext"
import { useEffect } from "react"
import { useNavigate, Link } from "react-router-dom"
const RegisterPage = () => {
    const inputClassName = "w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
    const { register, handleSubmit, formState: {
        errors
    } } = useForm()
    const { signup, isAuthenticated, errors: RegisterErrors } = useAuth()
    const navigate = useNavigate()
    useEffect(() => {
        if (isAuthenticated) navigate("/login")
    }, [isAuthenticated])

    const onSubmit = handleSubmit(async values => {
        signup(values)

    }
    )
    return (
        <div className="flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-zinc-800 max-w-md p-10 rounded-md">
                {
                    RegisterErrors.map((error, i) => (
                        <div className="bg-red-500 p-2 text-white" key={i}>
                            {error}
                        </div>
                    ))
                }
                <label htmlFor="Register" className="text-2xl font-bold"> Register</label>
                <form onSubmit={onSubmit} >
                    
                    <input type="text" {...register("username", { required: true })}
                        className={inputClassName} placeholder="username" />
                    {errors.username && <p className="text-red-500">Username is required</p>}
                    <input type="email" {...register("email", { required: true })}
                        className={inputClassName} placeholder="email" />
                    {errors.email && <p className="text-red-500">email is required</p>}
                    <input type="password" {...register("password", { required: true })}
                        className={inputClassName} placeholder="password" />
                    {errors.password && <p className="text-red-500">password is required</p>}
                    <button type="submit"
                     className="bg-indigo-500 px-3 py-2 rounded-md">register</button>
                </form>
                <p className="flex gap-x-2 justify-between">Already have an account?
                    <Link to="/login" className="text-sky-500">Login</Link> </p>

            </div>
        </div>
    )
}

export default RegisterPage