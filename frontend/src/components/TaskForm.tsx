import { useState, useEffect, useRef } from "react";
import { EstadoTarea } from "../models/TaskModel";
import type { TaskModel } from "../models/TaskModel";

interface Props {
  onSave: (task: TaskModel) => void;
  taskToEdit?: TaskModel;
  onCancel?: () => void;
  isEditMode?: boolean;
}

const TaskForm = ({
  onSave,
  taskToEdit,
  onCancel,
  isEditMode = false,
}: Props) => {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [estado, setEstado] = useState<EstadoTarea>(EstadoTarea.PENDIENTE);
  const [fechaLimite, setFechaLimite] = useState<string | undefined>(undefined);
  const tituloInputRef = useRef<HTMLInputElement>(null);

  // Obtener la fecha de hoy en formato YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  useEffect(() => {
    if (taskToEdit) {
      setTitulo(taskToEdit.titulo);
      setDescripcion(taskToEdit.descripcion);
      setEstado(taskToEdit.estado);
      setFechaLimite(taskToEdit.fechaLimite);
    } else {
      setTitulo("");
      setDescripcion("");
      setEstado(EstadoTarea.PENDIENTE);
      setFechaLimite(undefined);
    }

    tituloInputRef.current?.focus();
  }, [taskToEdit]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTask: TaskModel = {
      id: taskToEdit?.id,
      titulo: titulo.trim(),
      descripcion: descripcion.trim(),
      estado,
      fechaCreacion: taskToEdit?.fechaCreacion || new Date().toISOString(),
      fechaLimite: fechaLimite ? fechaLimite : undefined,
      fechaFinalizacion:
        estado === EstadoTarea.COMPLETADO
          ? new Date().toISOString()
          : undefined,
    };

    onSave(newTask);

    if (!isEditMode) {
      setTitulo("");
      setDescripcion("");
      setEstado(EstadoTarea.PENDIENTE);
      setFechaLimite(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded-xl shadow-md">
      <h2 className="text-center text-xl font-bold">
        {isEditMode ? "Editar Tarea" : "Nueva Tarea"}
      </h2>

      <input
        ref={tituloInputRef}
        className="w-full p-2 border rounded"
        placeholder="Título"
        value={titulo}
        onChange={(e) => setTitulo(e.target.value)}
        required
        autoComplete="off"
      />

      <textarea
        className="w-full p-2 border rounded"
        placeholder="Descripción"
        value={descripcion}
        onChange={(e) => setDescripcion(e.target.value)}
        required
      />

      <select
        className="w-full p-2 border rounded"
        value={estado}
        onChange={(e) => setEstado(e.target.value as EstadoTarea)}
      >
        {Object.values(EstadoTarea).map((estado) => (
          <option key={estado} value={estado}>
            {estado}
          </option>
        ))}
      </select>

      {/* Campo de fecha (solo permite seleccionar fechas a partir de hoy) */}
      <div>
        <label className="block font-semibold mb-1">
          {estado === EstadoTarea.COMPLETADO
            ? "Fecha de finalización (opcional)"
            : "Fecha límite (opcional)"}
        </label>
        <input
          type="date"
          className="w-full p-2 border rounded"
          value={fechaLimite ?? ""}
          onChange={(e) => setFechaLimite(e.target.value)}
          min={today} // Establece la fecha mínima a hoy
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
        >
          {isEditMode ? "Actualizar" : "Guardar"}
        </button>
        {isEditMode && onCancel && (
          <button
            type="button"
            className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400"
            onClick={() => {
              onCancel();
              setTitulo("");
              setDescripcion("");
              setEstado(EstadoTarea.PENDIENTE);
              setFechaLimite(undefined);
            }}
          >
            Cancelar
          </button>
        )}
      </div>
    </form>
  );
};

export default TaskForm;

