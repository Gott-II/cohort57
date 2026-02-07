package de.ait.demojavafxapp.controller;

import de.ait.demojavafxapp.model.Task;
import de.ait.demojavafxapp.repository.SqliteTaskRepository;
import de.ait.demojavafxapp.service.SettingsService;
import de.ait.demojavafxapp.service.TaskService;
import de.ait.demojavafxapp.util.UndoRedoManager;
import javafx.collections.transformation.FilteredList;
import javafx.fxml.FXML;
import javafx.fxml.FXMLLoader;
import javafx.scene.Scene;
import javafx.scene.control.Button;
import javafx.scene.control.CheckBox;
import javafx.scene.control.ComboBox;
import javafx.scene.control.Label;
import javafx.scene.control.MenuButton;
import javafx.scene.control.TableCell;
import javafx.scene.control.TableColumn;
import javafx.scene.control.TableRow;
import javafx.scene.control.TableView;
import javafx.scene.control.TextField;
import javafx.scene.control.Tooltip;
import javafx.scene.control.cell.CheckBoxTableCell;
import javafx.scene.input.ClipboardContent;
import javafx.scene.input.Dragboard;
import javafx.scene.input.TransferMode;
import javafx.stage.Stage;

import java.io.IOException;
import java.util.Locale;
import java.util.ResourceBundle;


public class TaskController {
    public TaskController() {
        System.out.println("TaskController wird erzeugt...");
    }


    // UI Elemente
    @FXML private TextField titleField;
    @FXML private ComboBox<String> priorityBox;
    @FXML private CheckBox showOnlyDoneCheckBox;
    @FXML private TableView<Task> taskTable;
    @FXML private Label statusLabel;

    @FXML private TableColumn<Task, Number> idColumn;
    @FXML private TableColumn<Task, String> titleColumn;
    @FXML private TableColumn<Task, String> priorityColumn;
    @FXML private TableColumn<Task, Boolean> doneColumn;

    @FXML private Button undoButton;
    @FXML private Button redoButton;
    @FXML private MenuButton langButton;

    @FXML private Button themeButton;
    @FXML private TableColumn<Task, Void> deleteColumn;


    private final TaskService taskService = new TaskService(new SqliteTaskRepository());

    private final UndoRedoManager undoRedo = new UndoRedoManager();
    private final SettingsService settings = new SettingsService();

    private FilteredList<Task> filteredTasks;

    private boolean exampleTasksAdded = false;

    @FXML
    public void initialize() {

        // --- PRIORITY COMBOBOX ---
        priorityBox.getItems().addAll("LOW", "MEDIUM", "HIGH");
        priorityBox.setValue("LOW");
        updateLanguageIcon();
        setupDeleteColumn();



        // --- TABLE COLUMNS ---
        idColumn.setCellValueFactory(c -> c.getValue().idProperty());
        titleColumn.setCellValueFactory(c -> c.getValue().nameProperty());
        priorityColumn.setCellValueFactory(c -> c.getValue().priorityProperty());
        doneColumn.setCellValueFactory(c -> c.getValue().doneProperty());
        doneColumn.setCellFactory(tc -> new CheckBoxTableCell<>());
        langButton.setTooltip(new Tooltip("Sprache wechseln"));

        // --- FILTER ---
        filteredTasks = new FilteredList<>(taskService.getTasks(), t -> true);
        taskTable.setItems(filteredTasks);

        showOnlyDoneCheckBox.selectedProperty().addListener((obs, oldVal, newVal) ->
                filteredTasks.setPredicate(task -> !newVal || task.isDone())
        );

        // --- DRAG & DROP SORTIERUNG ---
        enableDragAndDrop();

        // --- BEISPIELTASKS NUR BEI KLICK AUF LEERES FENSTER ---
        taskTable.sceneProperty().addListener((obs, oldScene, newScene) -> {
            if (newScene != null) { newScene.setOnMouseClicked(event -> {
                if (!exampleTasksAdded && taskTable.getItems().isEmpty()) {
                    addExampleTasks();
                    exampleTasksAdded = true;
                    statusLabel.setText("Beispiel‑Tasks hinzugefügt");
                    }
                });
            }
        });

        statusLabel.setText("Bereit.");
    }

    // ---------------------------------------------------------
    // Aktionen
    // ---------------------------------------------------------

    @FXML
    public void onAddTask() {
        String title = titleField.getText().trim();
        if (title.isEmpty()) {
            statusLabel.setText("Titel darf nicht leer sein.");
            return;
        }

        String priority = priorityBox.getValue();

        undoRedo.execute(
                () -> taskService.addTask(title, priority),
                () -> {
                    Task last = taskService.getTasks().get(taskService.getTasks().size() - 1);
                    taskService.deleteTask(last);
                }
        );

        titleField.clear();
        statusLabel.setText("Aufgabe hinzugefügt.");
    }

    @FXML
    public void onDeleteSelected() {
        Task selected = taskTable.getSelectionModel().getSelectedItem();
        if (selected == null) {
            statusLabel.setText("Keine Aufgabe ausgewählt.");
            return;
        }

        undoRedo.execute(
                () -> taskService.deleteTask(selected),
                () -> taskService.addTask(selected.getName(), selected.getPriority())
        );

        statusLabel.setText("Aufgabe gelöscht.");
    }

    @FXML
    public void onToggleDone() {
        Task selected = taskTable.getSelectionModel().getSelectedItem();
        if (selected == null) {
            statusLabel.setText("Keine Aufgabe ausgewählt.");
            return;
        }

        boolean oldValue = selected.isDone();

        undoRedo.execute(
                () -> taskService.toggleDone(selected),
                () -> {
                    selected.setDone(oldValue);
                    taskService.toggleDone(selected);
                }
        );

        statusLabel.setText("Status geändert.");
    }

    private void setupDeleteColumn() {
        deleteColumn.setCellFactory(col -> new TableCell<>() {

            private final Button deleteBtn = new Button("🗑️");

            {
                deleteBtn.setStyle("-fx-background-color: transparent; -fx-font-size: 16px;");
                deleteBtn.setTooltip(new Tooltip("Löschen"));

                deleteBtn.setOnAction(e -> {
                    Task task = getTableView().getItems().get(getIndex());
                    if (task != null) {
                        undoRedo.execute(
                                () -> taskService.deleteTask(task),
                                () -> taskService.addTask(task.getName(), task.getPriority())
                        );
                        statusLabel.setText("Aufgabe gelöscht.");
                    }
                });
            }

            @Override
            protected void updateItem(Void item, boolean empty) {
                super.updateItem(item, empty);

                if (empty) {
                    setGraphic(null);
                    return;
                }

                TableRow<Task> row = getTableRow();

                // Button nur anzeigen, wenn Maus über der Zeile ist
                row.hoverProperty().addListener((obs, wasHovered, isHovered) -> {
                    setGraphic(isHovered ? deleteBtn : null);
                });

                // Falls die Zeile bereits gehovt ist (z. B. beim Scrollen)
                setGraphic(row.isHover() ? deleteBtn : null);
            }
        });
    }



    // ---------------------------------------------------------
    // Undo / Redo
    // ---------------------------------------------------------

    @FXML
    public void onUndo() {
        undoRedo.undo();
        statusLabel.setText("Undo ausgeführt.");
    }

    @FXML
    public void onRedo() {
        undoRedo.redo();
        statusLabel.setText("Redo ausgeführt.");
    }

    // ---------------------------------------------------------
    // Sprache ändern
    // ---------------------------------------------------------

    @FXML
    public void switchToGerman() {
        settings.setLanguage("de");
        updateLanguageIcon();
        reloadUI();
    }

    @FXML
    public void switchToEnglish() {
        settings.setLanguage("en");
        updateLanguageIcon();
        reloadUI();
    }

    private void updateLanguageIcon() {
        String lang = settings.getLanguage();
        langButton.setText(lang.equals("de") ? "🇩🇪" : "🇬🇧");
    }


    // ---------------------------------------------------------
    // Theme ändern
    // ---------------------------------------------------------

    @FXML
    public void onSwitchTheme() {
        String current = settings.getTheme();
        String next = current.equals("light") ? "dark" : "light";
        settings.setTheme(next);
        reloadUI();
    }

    // ---------------------------------------------------------
    // UI neu laden
    // ---------------------------------------------------------

    private void reloadUI() {
        try {
            Locale locale = new Locale(settings.getLanguage());
            ResourceBundle bundle = ResourceBundle.getBundle("de.ait.demojavafxapp.i18n.messages", locale);

            FXMLLoader loader = new FXMLLoader(getClass().getResource("/de/ait/demojavafxapp/task-view.fxml"), bundle);
            Stage stage = (Stage) taskTable.getScene().getWindow();

            Scene scene = new Scene(loader.load());
            scene.getStylesheets().add(getClass().getResource("/de/ait/demojavafxapp/css/" + settings.getTheme() + ".css").toExternalForm());

            stage.setScene(scene);

        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    // ---------------------------------------------------------
    // Beispiel‑Tasks
    // ---------------------------------------------------------

    private void addExampleTasks() {
        taskService.addTask("Beispiel 1", "LOW");
        taskService.addTask("Beispiel 2", "MEDIUM");
        taskService.addTask("Beispiel 3", "HIGH");
    }

    // ---------------------------------------------------------
    // Drag & Drop Sortierung
    // ---------------------------------------------------------

    private void enableDragAndDrop() {
        taskTable.setRowFactory(tv -> {
            TableRow<Task> row = new TableRow<>();

            row.setOnDragDetected(event -> {
                if (!row.isEmpty()) {
                    Dragboard db = row.startDragAndDrop(TransferMode.MOVE);
                    ClipboardContent cc = new ClipboardContent();
                    cc.putString(String.valueOf(row.getIndex()));
                    db.setContent(cc);
                    event.consume();
                }
            });

            row.setOnDragOver(event -> {
                if (event.getGestureSource() != row && event.getDragboard().hasString()) {
                    event.acceptTransferModes(TransferMode.MOVE);
                }
                event.consume();
            });

            row.setOnDragDropped(event -> {
                Dragboard db = event.getDragboard();
                if (db.hasString()) {
                    int draggedIndex = Integer.parseInt(db.getString());
                    Task draggedTask = taskTable.getItems().remove(draggedIndex);

                    int dropIndex = row.isEmpty() ? taskTable.getItems().size() : row.getIndex();
                    taskTable.getItems().add(dropIndex, draggedTask);

                    event.setDropCompleted(true);
                    taskTable.getSelectionModel().select(dropIndex);
                    event.consume();
                }
            });

            return row;
        });
    }
}



