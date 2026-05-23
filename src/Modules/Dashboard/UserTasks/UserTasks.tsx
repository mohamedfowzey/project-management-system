
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import Column from '../../Shared/BoardColumn/Column';
import { getMyTasks, updateTaskStatus } from '../../../api/modules/myTasks';

export interface Task {
  id: string;
  title: string;
  status: string;
}
export interface Column {
  id: string;
  title: string;
}
export default function UserTasks() {
  const [tasksState, setTasksState] = useState<Task[]|undefined>(undefined);
  const [columnsState, setColumnsState] = useState<Column[]>([
    { id: 'ToDo', title: 'To Do' },
    { id: 'InProgress', title: 'In Progress' },
    { id: 'Done', title: 'Done' },
  ]);
  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }
    const taskId = active.id as string;
    const newcolumnId = over.id as string;
    updateTaskStatus(taskId, newcolumnId).then((res) => {
      console.log(res);
      
    })
    setTasksState((prev) => {
       return prev?.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: newcolumnId };
        }
        return task;
      });
    })

  };
  useEffect(() => {
    
    getMyTasks({ pageNumber: 1, pageSize: 10000 }).then((response) => {
      console.log(response?.data?.data);
      
      setTasksState(response.data?.data);
    })
    
  }, [])
    return (
      <div className='h-[calc(100vh-80px)] w-full bg-gray-100 dark:bg-neutral-800 flex flex-col'>
          <div className="py-6 ps-8 bg-white dark:bg-neutral-700 shrink">
            <h1 className="text-3xl font-semibold" >Task Board</h1>
          </div>
          <div className='flex gap-4 p-4 grow text-white w-full overflow-x-auto scrollbar-none'>
        <DndContext onDragEnd={onDragEnd}>
            {columnsState?.map((column) => (
              <Column key={column.id} column={column} tasks={tasksState?.filter((task) => task.status === column.id)} />
            ))}
        </DndContext>
          </div>
      </div>
  )
}
