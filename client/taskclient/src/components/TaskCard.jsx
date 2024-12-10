import { useTasks } from "../context/TasksContext"
import { useNavigate } from "react-router-dom"
import dayjs from "dayjs"
import  utc  from "dayjs/plugin/utc"
dayjs.extend(utc)
const TaskCard = ({task}) => {
    const {deleteTask} = useTasks()
    const navigate = useNavigate()
    return (
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <header className="flex justify-between">
            <h1 className="text-2xl font-bold">{task.title}</h1>
            <div className="flex gap-x-2 items-center">
                <button
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
                onClick={()=>{
                    deleteTask(task._id)
                }}>Delete</button>
                <button 
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
                onClick={()=>{
                    navigate(`/tasks/${task._id}`)
                }}>Edit</button>
            </div>
            </header>
            <p className="text-slate-300">{task.description}</p>
            <p>{dayjs(task.date).utc().format("DD/MM/YYYY")}</p>
        </div>
    )
}

export default TaskCard