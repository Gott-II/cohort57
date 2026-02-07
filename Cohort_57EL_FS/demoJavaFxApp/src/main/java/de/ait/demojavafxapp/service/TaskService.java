package de.ait.demojavafxapp.service;

import de.ait.demojavafxapp.model.Task;
import de.ait.demojavafxapp.repository.TaskRepository;
import javafx.collections.FXCollections;
import javafx.collections.ObservableList;

import java.util.Comparator;

public class TaskService {

    private final TaskRepository repo;
    private final ObservableList<Task> tasks = FXCollections.observableArrayList();

    public TaskService(TaskRepository repo) {
        this.repo = repo;
        loadTasks();
    }

    private void loadTasks() {
        tasks.setAll(repo.findAll());
        sortTasks();
    }

    public ObservableList<Task> getTasks() {
        return tasks;
    }

    public Task addTask(String name, String priority) {

        if (name == null || name.isBlank()) {
            throw new IllegalArgumentException("Task name cannot be empty");
        }

        Task t = new Task(0, name.trim(), priority, false);
        repo.save(t);

        tasks.add(t);
        sortTasks();

        return t;
    }

    public void deleteTask(Task t) {
        repo.delete(t.getId());
        tasks.remove(t);
    }

    public void toggleDone(Task t) {
        t.setDone(!t.isDone());
        repo.update(t);

        sortTasks();
    }

    private void sortTasks() {
        tasks.sort(Comparator
                .comparing(Task::isDone)
                .thenComparing(Task::getId).reversed());
    }
}




