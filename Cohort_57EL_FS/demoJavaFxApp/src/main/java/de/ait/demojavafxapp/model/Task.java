package de.ait.demojavafxapp.model;

import javafx.beans.property.*;

public class Task {

    private final LongProperty id = new SimpleLongProperty();
    private final StringProperty name = new SimpleStringProperty();
    private final StringProperty priority = new SimpleStringProperty();
    private final BooleanProperty done = new SimpleBooleanProperty();

    public Task() {}

    public Task(long id, String name, String priority, boolean done) {
        setId(id);
        setName(name);
        setPriority(priority);
        setDone(done);
    }

    public long getId() { return id.get(); }
    public void setId(long id) { this.id.set(id); }
    public LongProperty idProperty() { return id; }

    public String getName() { return name.get(); }
    public void setName(String name) { this.name.set(name); }
    public StringProperty nameProperty() { return name; }

    public String getPriority() { return priority.get(); }
    public void setPriority(String priority) { this.priority.set(priority); }
    public StringProperty priorityProperty() { return priority; }

    public boolean isDone() { return done.get(); }
    public void setDone(boolean done) { this.done.set(done); }
    public BooleanProperty doneProperty() { return done; }
}


