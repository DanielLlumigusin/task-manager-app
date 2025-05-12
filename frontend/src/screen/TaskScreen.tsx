import { useEffect, useState } from "react";
import useTask from "../hooks/useTask";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import TaskFilters from "../components/TaskFilters";
import type { TaskModel } from "../models/TaskModel";

const TaskScreen = () => {
  const { addTask, editTask, listTask, removeTask } = useTask();
  const [taskToEdit, setTaskToEdit] = useState<TaskModel | null>(null);
  const [filteredTasks, setFilteredTasks] = useState<TaskModel[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const tasksPerPage = 3;

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  useEffect(() => {
    if (currentPage > totalPages) setCurrentPage(totalPages || 1);
  }, [totalPages]);

  const handleCreate = async (task: TaskModel) => {
    await addTask(task);
  };

  const handleUpdate = async (task: TaskModel) => {
    await editTask(task);
    setTaskToEdit(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-10">
      <title>Tasks</title>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-800 mb-2">Tareas</h2>
            <TaskFilters tasks={listTask} onFilter={setFilteredTasks} />
          </div>

          <TaskList
            tasks={paginatedTasks}
            onEdit={(task) => setTaskToEdit(task)}
            onDelete={(id) => removeTask(id)}
          />

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                disabled={currentPage === 1}
              >
                Anterior
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 text-sm rounded ${
                    currentPage === i + 1
                      ? "bg-indigo-600 text-white"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-3 py-1 text-sm rounded bg-gray-200 hover:bg-gray-300"
                disabled={currentPage === totalPages}
              >
                Siguiente
              </button>
            </div>
          )}
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-6 h-fit sticky top-6">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-4">
            Crear nueva tarea
          </h2>
          <TaskForm onSave={handleCreate} />
        </div>
      </div>

      {taskToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in">
            <TaskForm
              taskToEdit={taskToEdit}
              onSave={handleUpdate}
              onCancel={() => setTaskToEdit(null)}
              isEditMode
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskScreen;
