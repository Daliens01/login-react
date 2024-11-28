import { createContext, useContext, useState } from "react";
import { createTasksRequest, getTasksRequest } from "../api/tasks";
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
    const getTasks = async () => {
        const res = await getTasksRequest()
        setTasks(res.data)

    }
    return (
        <TasksContext.Provider value={{ tasks, createTasks, getTasks }}>
            {children}
        </TasksContext.Provider>
    )
}