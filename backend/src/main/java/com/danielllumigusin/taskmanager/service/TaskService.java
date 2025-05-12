package com.danielllumigusin.taskmanager.service;

import com.danielllumigusin.taskmanager.entity.Task;
import com.danielllumigusin.taskmanager.exception.TaskNotFoundException; // Importa excepción personalizada
import com.danielllumigusin.taskmanager.repository.ITaskRepository;
import jakarta.transaction.Transactional;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;
import org.springframework.validation.annotation.Validated;

import java.util.List;
import java.util.Optional;

@Service
@Validated // Habilita la validación a nivel de servicio
public class TaskService {

    private final ITaskRepository taskRepository;

    public TaskService(ITaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    public List<Task> findAllTask() {
        return (List<Task>) taskRepository.findAll();
    }

    public Optional<Task> findTaskById(Long id) {
        return taskRepository.findById(id);
    }

    @Transactional
    public Task saveTask(@Valid Task task) {
        return taskRepository.save(task);
    }

    @Transactional
    public boolean removeTask(Long id) {
        if (!taskRepository.existsById(id)) {
            return false;
        }
        taskRepository.deleteById(id);
        return true;
    }

    @Transactional
    public Task updateTask(Long id, @Valid Task updatedTask) {
        return taskRepository.findById(id)
                .map(existingTask -> {
                    existingTask.setTitulo(updatedTask.getTitulo());
                    existingTask.setDescripcion(updatedTask.getDescripcion());
                    existingTask.setEstado(updatedTask.getEstado());
                    existingTask.setFechaLimite(updatedTask.getFechaLimite());
                    return taskRepository.save(existingTask);
                })
                .orElseThrow(() -> new TaskNotFoundException("No se encontró una tarea con ID: " + id + " para actualizar."));
    }
}