package de.ait.demojavafxapp.util;

import java.util.ArrayDeque;
import java.util.Deque;

public class UndoRedoManager {

    private record Command(Runnable doAction, Runnable undoAction) {}

    private final Deque<Command> undoStack = new ArrayDeque<>();
    private final Deque<Command> redoStack = new ArrayDeque<>();

    public void execute(Runnable action, Runnable undoAction) {
        Command cmd = new Command(action, undoAction);

        action.run();
        undoStack.push(cmd);
        redoStack.clear();
    }

    public void undo() {
        if (!undoStack.isEmpty()) {
            Command cmd = undoStack.pop();
            cmd.undoAction().run();
            redoStack.push(cmd);
        }
    }

    public void redo() {
        if (!redoStack.isEmpty()) {
            Command cmd = redoStack.pop();
            cmd.doAction().run();
            undoStack.push(cmd);
        }
    }
}



