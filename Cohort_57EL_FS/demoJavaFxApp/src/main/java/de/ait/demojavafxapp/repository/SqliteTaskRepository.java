package de.ait.demojavafxapp.repository;

import de.ait.demojavafxapp.model.Task;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;

public class SqliteTaskRepository implements TaskRepository {

    private static final String DB_URL = "jdbc:sqlite:tasks.db";
    private final Connection connection;

    public SqliteTaskRepository() {
        try {
            connection = DriverManager.getConnection(DB_URL);
            connection.setAutoCommit(true); // oder false, wenn du Transaktionen willst
            init();
        } catch (SQLException e) {
            throw new RuntimeException("Fehler beim Herstellen der DB-Verbindung", e);
        }
    }

    private void init() throws SQLException {
        String sql = """
            CREATE TABLE IF NOT EXISTS tasks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL,
                priority TEXT NOT NULL,
                done INTEGER NOT NULL
            );
        """;

        try (Statement stmt = connection.createStatement()) {
            stmt.execute(sql);
        }
    }

    @Override
    public List<Task> findAll() {
        List<Task> list = new ArrayList<>();

        String sql = "SELECT id, name, priority, done FROM tasks ORDER BY id DESC";

        try (PreparedStatement ps = connection.prepareStatement(sql);
             ResultSet rs = ps.executeQuery()) {

            while (rs.next()) {
                list.add(new Task(
                        rs.getLong("id"),
                        rs.getString("name"),
                        rs.getString("priority"),
                        rs.getInt("done") == 1
                ));
            }

        } catch (SQLException e) {
            throw new RuntimeException("Fehler beim Laden der Tasks", e);
        }

        return list;
    }

    @Override
    public Task save(Task task) {
        String sql = "INSERT INTO tasks(name, priority, done) VALUES (?, ?, ?)";

        try (PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS)) {

            ps.setString(1, task.getName());
            ps.setString(2, task.getPriority());
            ps.setInt(3, task.isDone() ? 1 : 0);
            ps.executeUpdate();

            try (ResultSet keys = ps.getGeneratedKeys()) {
                if (keys.next()) {
                    task.setId(keys.getLong(1));
                }
            }

        } catch (SQLException e) {
            throw new RuntimeException("Fehler beim Speichern des Tasks", e);
        }

        return task;
    }

    @Override
    public void update(Task task) {
        String sql = "UPDATE tasks SET name=?, priority=?, done=? WHERE id=?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {

            ps.setString(1, task.getName());
            ps.setString(2, task.getPriority());
            ps.setInt(3, task.isDone() ? 1 : 0);
            ps.setLong(4, task.getId());
            ps.executeUpdate();

        } catch (SQLException e) {
            throw new RuntimeException("Fehler beim Aktualisieren des Tasks", e);
        }
    }

    @Override
    public void delete(long id) {
        String sql = "DELETE FROM tasks WHERE id=?";

        try (PreparedStatement ps = connection.prepareStatement(sql)) {
            ps.setLong(1, id);
            ps.executeUpdate();
        } catch (SQLException e) {
            throw new RuntimeException("Fehler beim Löschen des Tasks", e);
        }
    }
}



