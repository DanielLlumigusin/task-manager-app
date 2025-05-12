package com.danielllumigusin.taskmanager.IntegrationTest;

import com.danielllumigusin.taskmanager.controller.TaskController;
import com.danielllumigusin.taskmanager.entity.EstadoEnum;
import com.danielllumigusin.taskmanager.entity.Task;
import com.danielllumigusin.taskmanager.service.TaskService;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.fasterxml.jackson.databind.ObjectMapper;

@WebMvcTest(TaskController.class)
class TaskControllerTest {

    @Autowired
    private MockMvc mockMvc; // Simula peticiones HTTP hacia el controlador

    @MockBean
    private TaskService taskService;

    @Autowired
    private ObjectMapper objectMapper; // Convierte objetos Java a JSON y viceversa

    @Test
    void shouldReturnAllTasks() throws Exception {
        // Mockea la respuesta del servicio
        Task task = new Task(1L, "Test", "Descripción", EstadoEnum.PENDIENTE, LocalDateTime.now(), LocalDate.now().plusDays(1));
        when(taskService.findAllTask()).thenReturn(List.of(task));

        // Simula GET /tasks y valida que retorne 200 OK y contenga el campo 'titulo'
        mockMvc.perform(get("/tasks"))
            .andExpect(status().isOk())
            .andExpect(jsonPath("$[0].titulo").value("Test"));
    }

    @Test
    void shouldReturnNotFoundIfTaskMissing() throws Exception {
        // Simula que no se encuentra la tarea
        when(taskService.findTaskById(1L)).thenReturn(Optional.empty());

        // Simula GET /tasks/1 y espera un 404 Not Found
        mockMvc.perform(get("/tasks/1"))
            .andExpect(status().isNotFound());
    }

    @Test
    void shouldCreateTask() throws Exception {
        // Crea una nueva tarea como objeto Java y la convierte a JSON
        Task task = new Task(null, "Nueva tarea", "Detalles", EstadoEnum.PENDIENTE, LocalDateTime.now(), LocalDate.now().plusDays(1));
        String json = objectMapper.writeValueAsString(task);

        // Simula POST /tasks con el JSON de la tarea, espera 201 Created
        mockMvc.perform(post("/tasks")
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andExpect(status().isCreated());
    }

    @Test
    void shouldUpdateTask() throws Exception {
        Long id = 1L;
        Task task = new Task(id, "Actualizada", "desc act", EstadoEnum.EN_PROGRESO, LocalDateTime.now(), LocalDate.now().plusDays(2));
        String json = objectMapper.writeValueAsString(task);

        // Simula que la tarea existe y que el servicio la guarda exitosamente
        when(taskService.findTaskById(id)).thenReturn(Optional.of(task));
        when(taskService.saveTask(any(Task.class))).thenReturn(task);

        // Simula PUT /tasks/1 con el JSON y espera 200 OK + mensaje de éxito
        mockMvc.perform(put("/tasks/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andExpect(status().isOk())
            .andExpect(content().string("Tarea actualizada correctamente."));
    }

    @Test
    void shouldReturnNotFoundOnUpdateIfTaskMissing() throws Exception {
        Long id = 123L;
        Task task = new Task(id, "No existe", "ninguna", EstadoEnum.PENDIENTE, LocalDateTime.now(), LocalDate.now().plusDays(1));
        String json = objectMapper.writeValueAsString(task);

        // Simula que no se encuentra la tarea al intentar actualizar
        when(taskService.findTaskById(id)).thenReturn(Optional.empty());

        // PUT /tasks/123 debe retornar 404
        mockMvc.perform(put("/tasks/" + id)
                .contentType(MediaType.APPLICATION_JSON)
                .content(json))
            .andExpect(status().isNotFound());
    }

    @Test
    void shouldDeleteTask() throws Exception {
        Long id = 1L;
        // Simula que la tarea existe y puede ser eliminada
        when(taskService.removeTask(id)).thenReturn(true); // Eliminar una tarea

        // DELETE /tasks/1 espera 200 OK y mensaje de éxito
        mockMvc.perform(delete("/tasks/" + id))
            .andExpect(status().isOk())
            .andExpect(content().string("Tarea eliminada correctamente."));
    }

    @Test
    void shouldReturnNotFoundOnDeleteIfMissing() throws Exception {
        Long id = 999L;
        // Simula que la tarea no existe al intentar eliminar
        when(taskService.removeTask(id)).thenReturn(false); // Tarea no encontrada

        // DELETE /tasks/999 espera 404 y mensaje de error
        mockMvc.perform(delete("/tasks/" + id))
            .andExpect(status().isNotFound())
            .andExpect(content().string("Tarea no encontrada."));
    }
}
