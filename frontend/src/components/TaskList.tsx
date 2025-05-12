import { Edit, Trash2 } from "lucide-react";
import type { TaskModel } from "../models/TaskModel";

interface Props {
  tasks: TaskModel[];
  onEdit: (task: TaskModel) => void;
  onDelete: (id: number) => void;
}

const TaskList = ({ tasks, onEdit, onDelete }: Props) => {
  const estadoColor = {
    PENDIENTE: "bg-yellow-100 text-yellow-800 border-yellow-200",
    EN_PROGRESO: "bg-blue-100 text-blue-800 border-blue-200",
    COMPLETADO: "bg-green-100 text-green-800 border-green-200",
  };

  const estadoIcon = {
    PENDIENTE: "⏳",
    EN_PROGRESO: "⚙️",
    COMPLETADO: "✅",
  };

  if (tasks.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 bg-gray-50 rounded-lg border border-dashed border-gray-300">
        <div className="text-gray-400 mb-2">🔍</div>
        <h3 className="text-lg font-medium text-gray-700">
          No se encontraron tareas
        </h3>
        <p className="text-sm text-gray-500">
          Intenta con otros términos de búsqueda o filtros
        </p>
      </div>
    );
  }

  return (
    <ul className="space-y-4">
      {tasks.map((task) => (
        <li
          key={task.id}
          className="bg-white shadow rounded-lg border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md"
        >
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">
                  {task.titulo}
                </h3>
                <p className="mt-1 text-sm text-gray-600 line-clamp-2">
                  {task.descripcion}
                </p>

                <div className="mt-3">
                  <p className="text-sm text-gray-500">
                    Creada el:{" "}
                    {new Date(task.fechaCreacion).toLocaleDateString()}
                  </p>

                  {task.fechaLimite && (
                    <p className="text-sm text-gray-500">
                      Fecha límite:{" "}
                      {task.fechaLimite
                        ? task.fechaLimite
                        : ""}
                    </p>
                  )}
                </div>

                <div className="mt-3 flex items-center">
                  <span
                    className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${
                      estadoColor[task.estado]
                    }`}
                  >
                    <span className="mr-1">{estadoIcon[task.estado]}</span>
                    {task.estado}
                  </span>
                </div>
              </div>

              <div className="flex space-x-1 ml-4">
                <button
                  onClick={() => onEdit(task)}
                  className="p-2 text-blue-600 hover:bg-blue-50 rounded-full transition-colors"
                  aria-label="Editar tarea"
                >
                  <Edit size={16} />
                </button>
                {typeof task.id === "number" && (
                  <button
                    onClick={() => onDelete(task.id!)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
                    aria-label="Eliminar tarea"
                  >
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TaskList;
