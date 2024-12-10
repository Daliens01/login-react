import axiosURL from "./axios";

export const getTasksRequest = () => axiosURL.get("/tasks")
export const getTaskRequest = (task) => axiosURL.get(`/tasks/${task}`)
export const createTasksRequest = (task) => axiosURL.post("/tasks", task)
export const updateTasksRequest = (id,task) => axiosURL.put(`/tasks/${id}`,task)
export const deleteTasksRequest = (id) => axiosURL.delete(`/tasks/${id}`)
