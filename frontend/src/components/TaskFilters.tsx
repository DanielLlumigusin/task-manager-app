import { useState, useEffect } from "react";
import { Search, Filter, ChevronDown } from "lucide-react";
import type { TaskModel } from "../models/TaskModel";

interface Props {
  tasks: TaskModel[];
  onFilter: (filtered: TaskModel[]) => void;
}

const TaskFilters = ({ tasks, onFilter }: Props) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterState, setFilterState] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      const matchesSearch =
        task.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.descripcion.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterState ? task.estado === filterState : true;
      return matchesSearch && matchesFilter;
    });

    onFilter(filtered);
  }, [tasks, searchTerm, filterState]);

  const clearFilters = () => {
    setSearchTerm("");
    setFilterState(null);
  };

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 mb-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search size={18} className="text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar tareas..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-3 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>

        <div className="relative">
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className="flex items-center px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Filter size={18} className="mr-2 text-gray-500" />
            <span>Filtrar</span>
            <ChevronDown size={18} className="ml-2 text-gray-500" />
          </button>

          {isFilterOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              <div className="py-1">
                {["Todos", "PENDIENTE", "EN_PROGRESO", "COMPLETADO"].map((estado) => (
                  <button
                    key={estado}
                    onClick={() => {
                      setFilterState(estado === "Todos" ? null : estado);
                      setIsFilterOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                  >
                    {estado === "Todos" ? "Todos" : estado.charAt(0).toUpperCase() + estado.slice(1).toLowerCase()}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {(searchTerm || filterState) && (
        <div className="flex items-center mb-4 px-3 py-2 bg-blue-50 rounded-md">
          <span className="text-sm text-blue-700">Filtros activos:</span>
          {searchTerm && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              "{searchTerm}"
            </span>
          )}
          {filterState && (
            <span className="ml-2 text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
              {filterState}
            </span>
          )}
          <button
            onClick={clearFilters}
            className="ml-auto text-xs text-blue-600 hover:text-blue-800"
          >
            Limpiar filtros
          </button>
        </div>
      )}
    </>
  );
};

export default TaskFilters;
