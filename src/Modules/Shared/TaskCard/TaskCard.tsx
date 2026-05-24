import { useDraggable } from "@dnd-kit/core";
import type { Task } from "../../Dashboard/Tasks/Tasks";
import {  Eye } from "lucide-react";
import TaskViewModal from "../TaskViewModal/TaskViewModal";
import { useState } from "react";

export default function TaskCard({ task }: { task: Task }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: task.id,
    });
    const style = transform ? { transform: `translate3d(${transform.x}px, ${transform.y}px, 0)` } : undefined;
  return (
    <div className="relative">

    
      <div onClick={()=>setIsModalOpen(true)} style={style} className="absolute w-6 top-2 z-10 right-2 cursor-pointer">
        <Eye size={24} strokeWidth={2} color="white" />
      </div>
    <div className='bg-accent text-white p-2 relative rounded mb-2 w-full cursor-grab active:cursor-grabbing' {...attributes} {...listeners} ref={setNodeRef} style={style}>
      {task.title}
    </div>
    <TaskViewModal task={task} isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
    </div>
  )
}
