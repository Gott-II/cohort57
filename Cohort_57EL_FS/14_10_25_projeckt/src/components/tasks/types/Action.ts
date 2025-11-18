import type TaskCredentials from '../types/TaskCredentials';

export type Action =
  | { type: 'TASKS/ADD'; payload: TaskCredentials }
  | { type: 'TASKS/changeStatus'; payload: string }
  | { type: 'DELETE_TASKS'; payload: string };



