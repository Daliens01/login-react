import Task from "../models/task.model.js"

const getTasks = async (req, res) => {
    const tasks = await Task.find({
        user: req.user.id
    }).populate("user")//agrega los datos del usuario a la busqueda de las tareas del usuario
    res.json(tasks)
}

const createTasks = async (req, res) => {
    const {title, description, date} = req.body

    const newTask = new Task({
        title,
         description, 
         date,
         user: req.user.id
    })

    const savedTask = await newTask.save()
    res.json(savedTask)
}

const getTask = async (req, res) => {
   const task = await Task.findById(req.params.id)
   if(!task) return res.status(404).json({message: "nothing found"})
    res.json(task)
}

const updateTasks = async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body,{
        new: true
    })
    if(!task) return res.status(404).json({message: "nothing found"})
     res.json(task)
}

const deleteTasks = async (req, res) => {
    const task = await Task.findByIdAndDelete(req.params.id)
    if(!task) return res.status(404).json({message: "nothing found"})
     return res.sendStatus(204)
}

export {getTask, getTasks, createTasks, updateTasks, deleteTasks}