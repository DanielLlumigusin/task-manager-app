import {
  createTask,
  deleteTask,
  getAllTasks,
  getTaskById,
  updateTask,
} from "../services/TaskService";

import type { TaskModel } from "../models/TaskModel";
import { useEffect, useState } from "react";

const useTask = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [listTask, setListTask] = useState<TaskModel[]>([]);

  const findAllTask = async () => {
    try {
      setLoading(true);
      const tasks = await getAllTasks();
      setListTask(tasks);
      return tasks;
    } catch (error) {
      setError("Error: no se pueden obtener las tareas.");
    } finally {
      setLoading(false);
    }
  };

  const findTaskById = async (idTask: number) => {
    try {
      setLoading(true);
      return await getTaskById(idTask);
    } catch (error) {
      setError("Error: no se encontró la tarea.");
    } finally {
      setLoading(false);
    }
  };

  const addTask = async (newTask: TaskModel) => {
    try {
      setLoading(true);
      const created = await createTask(newTask);
      await findAllTask(); 
      return created;
    } catch (error) {
      setError("Error: no se puede crear la tarea.");
    } finally {
      setLoading(false);
    }
  };

  const editTask = async (task: TaskModel) => {
    try {
      setLoading(true);
      const updated = await updateTask(task);
      await findAllTask(); 
      return updated;
    } catch (error) {
      setError("Error: no se puede actualizar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  const removeTask = async (idTask: number) => {
    try {
      setLoading(true);
      const deleted = await deleteTask(idTask);
      await findAllTask(); 
      return deleted;
    } catch (error) {
      setError("Error: no se puede eliminar la tarea.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    findAllTask();
  }, []);

  return {
    addTask,
    editTask,
    removeTask,
    findTaskById,
    findAllTask,
    listTask,
    loading,
    error,
  };
};

export default useTask;
