package com.danielllumigusin.taskmanager.UnitTest;

import static org.mockito.Mockito.*;
import static org.assertj.core.api.Assertions.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import com.danielllumigusin.taskmanager.entity.EstadoEnum;
import com.danielllumigusin.taskmanager.entity.Task;
import com.danielllumigusin.taskmanager.repository.ITaskRepository;
import com.danielllumigusin.taskmanager.service.TaskService;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;

class TaskServiceTest {

    @Mock
    private ITaskRepository taskRepository; // Simula la capa de acceso a datos

    @InjectMocks
    private TaskService taskService;

    @BeforeEach
    void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    void shouldReturnAllTasks() {
        // Crea dos tareas simuladas con fechas
        Task task1 = new Task(1L, "Tarea 1", "Descripción 1", EstadoEnum.PENDIENTE, LocalDateTime.now(), LocalDate.now().plusDays(1));
        Task task2 = new Task(2L, "Tarea 2", "Descripción 2", EstadoEnum.COMPLETADO, LocalDateTime.now().minusDays(1), LocalDate.now());

        // Simula la respuesta del repositorio
        when(taskRepository.findAll()).thenReturn(Arrays.asList(task1, task2));

        // Llama al método y verifica el resultado
        List<Task> result = taskService.findAllTask();

        assertThat(result).hasSize(2);
        assertThat(result.get(0).getTitulo()).isEqualTo("Tarea 1");
        assertThat(result.get(0).getFechaCreacion()).isBeforeOrEqualTo(LocalDateTime.now()); // Verifica la fecha de creación
    }

    @Test
    void shouldReturnTaskByIdIfExists() {
        Task task = new Task(1L, "Tarea única", "Descripción", EstadoEnum.PENDIENTE, LocalDateTime.now(), LocalDate.now().plusDays(1));
        when(taskRepository.findById(1L)).thenReturn(Optional.of(task));

        Optional<Task> result = taskService.findTaskById(1L);

        assertThat(result).isPresent(); // Verifica que el Optional no esté vacío
        assertThat(result.get().getTitulo()).isEqualTo("Tarea única");
        assertThat(result.get().getFechaCreacion()).isBeforeOrEqualTo(LocalDateTime.now()); // Verifica la fecha de creación
    }

    @Test
    void shouldDeleteTaskIfExists() {
        Long taskId = 1L;
        Task task = new Task(taskId, "Eliminar", "desc", EstadoEnum.PENDIENTE, LocalDateTime.now(), LocalDate.now().plusDays(1));

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(task));

        boolean deleted = taskService.removeTask(taskId);

        assertThat(deleted).isTrue(); // Debe devolver true si se eliminó
        verify(taskRepository).deleteById(taskId); // Verifica que se haya llamado a delete
    }

    @Test
    void shouldUpdateExistingTask() {
        Long taskId = 1L;
        Task existing = new Task(taskId, "Viejo", "desc", EstadoEnum.PENDIENTE, LocalDateTime.now(), LocalDate.now().plusDays(1));
        Task updates = new Task(taskId, "Nuevo", "actualizado", EstadoEnum.COMPLETADO, LocalDateTime.now(), LocalDate.now().plusDays(1));

        when(taskRepository.findById(taskId)).thenReturn(Optional.of(existing));
        when(taskRepository.save(any(Task.class))).thenAnswer(invocation -> invocation.getArgument(0));

        Task result = taskService.saveTask(updates);

        // Verifica que se hayan aplicado los cambios esperados
        assertThat(result.getTitulo()).isEqualTo("Nuevo");
        assertThat(result.getDescripcion()).isEqualTo("actualizado");
        assertThat(result.getEstado()).isEqualTo(EstadoEnum.COMPLETADO);
        assertThat(result.getFechaCreacion()).isBeforeOrEqualTo(LocalDateTime.now()); // Verifica la fecha de creación
    }

    @Test
    void shouldReturnFalseIfTaskNotFoundForDelete() {
        // Simula que la tarea no existe
        when(taskRepository.findById(999L)).thenReturn(Optional.empty());

        boolean result = taskService.removeTask(999L);

        assertThat(result).isFalse(); // No se puede eliminar una tarea inexistente
    }
}
