import type { TaskModel } from "../models/TaskModel";
import TaskForm from "./TaskForm";

type Props = {
  taskToEdit: TaskModel;
  onSave: (task: TaskModel) => void;
  onCancel: () => void;
};

const EditTaskModal = ({ taskToEdit, onSave, onCancel }: Props) => (
  <div className="fixed inset-0 bg-black bg-opacity-40 backdrop-blur-sm flex items-center justify-center z-50">
    <div className="bg-white rounded-2xl shadow-xl p-6 w-[90%] max-w-md animate-fade-in">
      <TaskForm taskToEdit={taskToEdit} onSave={onSave} onCancel={onCancel} isEditMode />
    </div>
  </div>
);

export default EditTaskModal;
