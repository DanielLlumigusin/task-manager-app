package com.danielllumigusin.taskmanager.service;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.danielllumigusin.taskmanager.entity.Task;
import com.danielllumigusin.taskmanager.repository.ITaskRepository;

@Service
public class TaskService {
	
	private final ITaskRepository taskRepository;
	
	public TaskService(ITaskRepository taskRepository) {
		this.taskRepository = taskRepository;
	}
	
	public List<Task> findAllTask(){
		return (List<Task>) taskRepository.findAll();
	}
	
	public Optional<Task> findTaskById(Long id) {
		return taskRepository.findById(id);
	}
	
	public Task saveTask(Task newTask) {
		 return taskRepository.save(newTask);
	}
	
	public boolean removeTask(Long id) {
		Optional<Task> findTask = findTaskById(id);
		if(findTask.isPresent()) {
			taskRepository.deleteById(id);
			return true;			
		}else {
			return false;
		}
	}
}
