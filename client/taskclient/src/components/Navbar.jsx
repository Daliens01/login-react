import { Link } from "react-router-dom"
import { useAuth } from "../context/authContext"
const Navbar = () => {
    const { isAuthenticated, logout, user } = useAuth()
    
    return (
        <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
            <h1 className="text-2xl font-bold"><Link to={
                isAuthenticated?"/tasks":"/"
            }>Task Manager</Link></h1>
            <ul className=" flex gap-x-2">
                {
                    isAuthenticated ?
                        (
                            <>
                                <li>
                                    Wellcome {user.username}
                                </li>
                                <li>
                                    <Link to="/new"
                                    className="bg-indigo-500 px-4 py-1 rounded-sm">Add Task</Link>
                                </li>
                                <li>
                                    <Link to="//" onClick={()=>{
                                        logout()
                                    }}
                                    className="bg-indigo-500 px-4 py-1 rounded-sm">Logout</Link>
                                </li>
                            </>
                        ) :
                        (
                            <>
                                <li>
                                    <Link to="/login"
                                    className="bg-indigo-500 px-4 py-1 rounded-sm">Login</Link>
                                </li>
                                <li>
                                    <Link to="/register"
                                    className="bg-indigo-500 px-4 py-1 rounded-sm">Register</Link>
                                </li>
                            </>
                        )
                }
            </ul>
        </nav>

    )
}

export default Navbar