package com.danielllumigusin.taskmanager.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.danielllumigusin.taskmanager.entity.Task;
import com.danielllumigusin.taskmanager.service.TaskService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(path = "/tasks")
public class TaskController {

	private final TaskService taskService;

	public TaskController(TaskService taskService) {
		this.taskService = taskService;
	}

	// Obtener todas las tareas
	@GetMapping
	public ResponseEntity<List<Task>> getAllTask() {
		List<Task> tasks = taskService.findAllTask();
		return ResponseEntity.ok(tasks);
	}

	// Obtener una tarea por ID
	@GetMapping("/{id}")
	public ResponseEntity<Task> getTaskById(@PathVariable Long id) {
		Optional<Task> task = taskService.findTaskById(id);
		return task.map(ResponseEntity::ok)
		           .orElseGet(() -> ResponseEntity.status(HttpStatus.NOT_FOUND)
		                                         .body(null));
	}

	// Crear nueva tarea
	@PostMapping
	public ResponseEntity<String> createTask(@Valid @RequestBody Task newTask) {
		try {
			taskService.saveTask(newTask);
			return ResponseEntity.status(HttpStatus.CREATED).body("Tarea creada exitosamente.");
		} catch (Exception e) {
			return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
			                     .body("Error al crear la tarea.");
		}
	}
	
	// Actualizar una tarea existente
	@PutMapping("/{id}")
	public ResponseEntity<String> updateTask(@PathVariable Long id, @Valid @RequestBody Task updatedTask) {
		Optional<Task> existingTask = taskService.findTaskById(id);

		if (existingTask.isPresent()) {
			Task task = existingTask.get();
			task.setTitulo(updatedTask.getTitulo());
			task.setDescripcion(updatedTask.getDescripcion());
			task.setEstado(updatedTask.getEstado());
			// Reutilizo el método actualizando el objeto Task
			taskService.saveTask(task); 

			return ResponseEntity.ok("Tarea actualizada correctamente.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea no encontrada.");
		}
	}


	// Eliminar tarea por ID
	@DeleteMapping("/{id}")
	public ResponseEntity<String> deleteTask(@PathVariable Long id) {
		boolean deleted = taskService.removeTask(id);
		if (deleted) {
			return ResponseEntity.ok("Tarea eliminada correctamente.");
		} else {
			return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Tarea no encontrada.");
		}
	}
}
