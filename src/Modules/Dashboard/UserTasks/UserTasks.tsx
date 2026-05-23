
import { DndContext, type DragEndEvent } from '@dnd-kit/core';
import { useEffect, useState } from 'react';
import Column from '../../Shared/BoardColumn/Column';
import { getMyTasks } from '../../../api/modules/myTasks';

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
    console.log('active',active, 'over',over);
    const taskId = active.id as string;
    const newcolumnId = over.id as string;
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
    console.log('getting tasks');
    
    getMyTasks({ pageNumber: 1, pageSize: 10000 }).then((response) => {
      console.log(response?.data?.data);
      
      setTasksState(response.data?.data);
    })
    
  }, [])
    return (
      <>
        <DndContext onDragEnd={onDragEnd}>
          <div className='flex gap-4 p-4 h-[calc(100vh-80px)]'>
            {columnsState?.map((column) => (
              <Column key={column.id} column={column} tasks={tasksState?.filter((task) => task.status === column.id)} />
            ))}
          </div>
        </DndContext>
      </>
  )
}
