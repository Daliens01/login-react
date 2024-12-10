import Task from "../models/task.model.js"

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find({
            user: req.user.id
        }).populate("user")//agrega los datos del usuario a la busqueda de las tareas del usuario
        res.json(tasks)
    } catch (error) {
        return res.status(404).json({message: "task not found"})
    }
}

const createTasks = async (req, res) => {
    

   try {
    const {title, description, date} = req.body

    const newTask = new Task({
        title,
         description, 
         date,
         user: req.user.id
    })
    const savedTask = await newTask.save()
    res.json(savedTask)
   } catch (error) {
    return res.status(404).json({message: "error creating a task"})
   }
}

const getTask = async (req, res) => {
   try {
    const task = await Task.findById(req.params.id)
   if(!task) return res.status(404).json({message: "nothing found"})
    res.json(task)
   } catch (error) {
    return res.status(404).json({message: "task not found"})
   }
}

const updateTasks = async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
            new: true
        })
        if(!task) return res.status(404).json({message: "nothing found"})
         res.json(task)
    } catch (error) {
        return res.status(404).json({message: "task not found"})
    }
}

const deleteTasks = async (req, res) => {
   try {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: "nothing found"})
     return res.sendStatus(204)
   } catch (error) {
    return res.status(404).json({message: "cant delete task"})
   }
}

export {getTask, getTasks, createTasks, updateTasks, deleteTasks}