import { useDroppable } from "@dnd-kit/core";
import type { Column, Task } from "../../Dashboard/UserTasks/UserTasks";
import TaskCard from "../TaskCard/TaskCard";

export default function Column({ column , tasks }: { column: Column, tasks?: Task[] }) {
    const {  setNodeRef } = useDroppable({
        id: column.id,
    });
  return (
    <div ref={setNodeRef} className='w-1/3 bg-gray-200 p-4 rounded h-full'>
      <h2>{column.title}</h2>
      {tasks?.map((task) => (
        <TaskCard key={task.id} task={task}/>
      ))}
    </div>
  )
}
