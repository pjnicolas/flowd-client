import { useEffect, useState } from 'react';
import { api } from '.'
import { toastError } from '../components/lib/toast';

export interface ITask {
  id: number;
  name: string;
  start: Date | null;
}

interface ITaskCreateUpdate {
  name: string;
}

export const getTaskList = (): Promise<ITask[]> => {
  return api.get('task')
}

export const getTaskItem = (id: number): Promise<ITask> => {
  return api.get(`task/${id}`)
}

export const createTask = (data: ITaskCreateUpdate): Promise<ITask> => {
  return api.post('task', data)
}

export const updateTask = (data: ITaskCreateUpdate): Promise<ITask> => {
  return api.put('task', data)
}

export const startTask = (id: number): Promise<ITask> => {
  return api.patch(`task/${id}/start`)
}

export const stopTask = (id: number): Promise<ITask> => {
  return api.patch(`task/${id}/stop`)
}

export const useTaskList = () => {
  const [list, setList] = useState<ITask[] | null>(null)

  const reload = (wipeOldList: boolean = true) => {
    if (wipeOldList) {
      setList(null);
    }
    return getTaskList()
      .then((data) => setList(data))
      .catch(() => {
        toastError('Error loading task list')
      })
  }

  useEffect(() => {
    reload();
  }, [])

  return [list, setList, reload] as [typeof list, typeof setList, typeof reload]
}
