import {useForm} from "react-hook-form"
import { useTasks } from "../context/TasksContext"
 
 const TaskFormPage =()=>{

    const {register,handleSubmit}= useForm()
    const {createTasks} = useTasks()
    
    const onSubmit = handleSubmit(data=>{
       createTasks(data)
        
    })
    return(
        <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
            <form onSubmit={onSubmit}>
                <input type="text" name="" placeholder="Title" 
                {...register("title")}
                autoFocus
                className="w-full bg-zinc-700 text-white px-4  rounded-md my-2"/>
                <textarea name="" id="" rows="3" placeholder="Description"
                {...register("description")}
                className="w-full bg-zinc-700 text-white px-4  rounded-md my-2"></textarea>
                <button type="submit">Save</button>
            </form>
        </div>
    )
}
export default TaskFormPage