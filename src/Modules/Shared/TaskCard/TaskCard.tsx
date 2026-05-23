import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../Dashboard/UserTasks/UserTasks";

export default function TaskCard({ task }: { task: Task }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });
    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div className='bg-accent text-white p-2 rounded mb-2 w-full cursor-grab active:cursor-grabbing' {...attributes} {...listeners} ref={setNodeRef} style={style}>
      {task.title}
    </div>
  )
}
