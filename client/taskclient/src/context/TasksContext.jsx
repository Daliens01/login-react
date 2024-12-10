import { createContext, useContext, useState } from "react";
import { createTasksRequest,updateTasksRequest, getTasksRequest, deleteTasksRequest, getTaskRequest } from "../api/tasks";
const TasksContext = createContext()
export const useTasks = () => {
    const context = useContext(TasksContext)
    if (!context) {
        throw new Error("userTasks must be used within a TaskProvider")
    }
    return context
}
export function TaskProvider({ children }) {

    const [tasks, setTasks] = useState([])
    const createTasks = async (task) => {
        try {
            const res = await createTasksRequest(task)
            console.log(res);
        } catch (error) {
            console.log(error);
        }
    }

    const updateTasks = async (id, task) => {
        try {
            const res = await updateTasksRequest(id, task)
        
        } catch (error) {
            console.log(error);
        }
    }


    const deleteTask = async (id) => {
      try {
        const res = await deleteTasksRequest(id)
        if(res.status === 204) setTasks(tasks.filter(task => task._id !== id))
      } catch (error) {
        console.log(error);
        
      }

    }
    const getTasks = async () => {
        const res = await getTasksRequest()
        setTasks(res.data)

    }

    const getTask = async (id)=>{
       try {
        const res = await getTaskRequest(id)
        return res.data     
       } catch (error) {
        console.log(error);
        
       }
    }
    return (
        <TasksContext.Provider value={{ tasks, createTasks, getTasks, deleteTask,getTask,updateTasks }}>
            {children}
        </TasksContext.Provider>
    )
}