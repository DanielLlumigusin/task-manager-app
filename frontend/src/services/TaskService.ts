import axios from "axios";
import type { TaskModel } from "../models/TaskModel";

const apiUrl = import.meta.env.VITE_API_URL;

export const getAllTasks = async () => {
  try {
    const response = await axios.get<TaskModel[]>(apiUrl);
    return response.data;
  } catch (error: any) {
    return [];
  }
};

export const getTaskById = async (idTask: number) => {
  try {
    const response = await axios.get<TaskModel>(`${apiUrl}/${idTask}`);
    return response.data;
  } catch (error: any) {
    return {
      error: true,
      message: "No se encontró una tarea con esa identificación.",
    };
  }
};

export const createTask = async (newTask: TaskModel) => {
  try {
    const response = await axios.post<TaskModel>(apiUrl, newTask);
    return response.data;
  } catch (error: any) {
    return {
      error: true,
      message: "No se pudo crear la tarea.",
    };
  }
};

export const updateTask = async (updateTask: TaskModel) => {
  try {
    const response = await axios.put<TaskModel>(
      `${apiUrl}/${updateTask.id}`,
      updateTask
    );
    return response.data;
  } catch (error: any) {
    return {
      error: true,
      message: "No se pudo actualizar la tarea.",
    };
  }
};

export const deleteTask = async (idTask: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/${idTask}`);
    return response.data;
  } catch (error: any) {
    return {
      error: true,
      message: "No se pudo eliminar la tarea.",
    };
  }
};
