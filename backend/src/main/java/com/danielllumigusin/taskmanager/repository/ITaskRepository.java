package com.danielllumigusin.taskmanager.repository;

import org.springframework.data.repository.CrudRepository;

import com.danielllumigusin.taskmanager.entity.Task;

public interface ITaskRepository extends CrudRepository<Task, Long>{

}
