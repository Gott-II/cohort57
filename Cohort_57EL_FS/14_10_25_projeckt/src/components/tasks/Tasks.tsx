import React from "react";
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';
import type { JSX } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../../store"; // Pfad ggf. anpassen
import type { Task } from "./types/Task"; // Pfad ggf. anpassen

export default function Tasks(): JSX.Element {
  const tasks = useSelector((state: RootState) => state.taSelect-String -Path .\**\*.js,.\**\*.cjs,.\package.json -Pattern "tailwindcss"
sks) as Task[];
  const dispatch = useDispatch();

  function handleChangeStatus(id: string): void {
    dispatch({ type: "TASKS/changeStatus", payload: id });
  }

  function handleDeleteTask(id: string): void {
    dispatch({ type: "DELETE_TASKS", payload: id });
  }

  return (
    <div>
      <h1>Aufgabenliste</h1>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <h2>
              <span
                style={{
                  textDecoration: task.isDone ? "line-through" : "none",
                }}
              >
                <b>{task.title}</b>
              </span>
              <DeleteIcon
                onClick={() => handleDeleteTask(task.id)}
                style={{ cursor: 'pointer', marginLeft: '10px' }}
              />
            </h2>
            <p>{task.description}</p>
            <p>Status: {task.isDone ? "Erledigt" : "Offen"}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button onClick={() => handleChangeStatus(task.id)}>
                {task.isDone ? "Als offen markieren" : "Als erledigt markieren"}
              </button>
              {task.isDone ? (
                <CheckBoxIcon
                  onClick={() => handleChangeStatus(task.id)}
                  style={{ cursor: 'pointer' }}
                />
              ) : (
                <CheckBoxOutlineBlankIcon
                  onClick={() => handleChangeStatus(task.id)}
                  style={{ cursor: 'pointer' }}
                />
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
