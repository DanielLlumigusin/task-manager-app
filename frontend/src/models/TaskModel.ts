export const EstadoTarea = {
  PENDIENTE: "PENDIENTE",
  EN_PROGRESO: "EN_PROGRESO",
  COMPLETADO: "COMPLETADO",
} as const;

export type EstadoTarea = (typeof EstadoTarea)[keyof typeof EstadoTarea];

export interface TaskModel {
  id?: number;
  titulo: string;
  descripcion: string;
  estado: EstadoTarea;
  fechaCreacion: string;
  fechaLimite?: string;
  fechaFinalizacion?: string;
}
