import axiosURL from "./axios";

export const getTasksRequest = () => axiosURL.get("/tasks")
export const getTaskRequest = (task) => axiosURL.get(`/tasks/${task._id}`)
export const createTasksRequest = (task) => axiosURL.post("/tasks", task)
export const updateTasksRequest = (task) => axiosURL.put(`/tasks/${task._id}`,task)
export const deleteTasksRequest = (id) => axiosURL.delete(`/tasks/${id}`)
