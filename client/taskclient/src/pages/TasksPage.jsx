 import { useEffect } from "react"
 import { useTasks } from "../context/TasksContext"
 const TasksPage =()=>{
    const {getTasks,tasks} = useTasks()
    useEffect(()=>{
        getTasks()
    },[])
    if(tasks.length === 0) return (
        <div>
            <p>No hay tareas, crea una</p>
            <a style={{cursor:"pointer",color:"#1997b0"}} href="/new">Crear tarea nueva</a>
        </div>
    )
    return(
        <div>
           {
             tasks.map((task)=>(
                <div key={task._id}>
                    <h1>{task.title}</h1>
                    <p>{task.description}</p>
                    </div>
                ))
           }
        </div>
    )
}

export default TasksPage