package de.ait.demojavafxapp.repository;

import de.ait.demojavafxapp.model.Task;

import java.util.List;

public interface TaskRepository {
    List<Task> findAll();
    Task save(Task task);
    void delete(long id);
    void update(Task task);
}


