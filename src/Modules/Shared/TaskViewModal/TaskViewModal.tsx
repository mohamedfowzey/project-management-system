import React from 'react'
import { Calendar, Clock, X } from 'lucide-react';
import type { Task } from '../../Dashboard/Tasks/Tasks';

interface TasksViewModalProps {
  task: Task;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function TaskViewModal({ task, isOpen, setIsOpen }: TasksViewModalProps) {


  if (!isOpen) return null;
  return (
    <>

      <div>
        <div className="">

          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[95%] md:w-[70%] lg:w-[50%] overflow-y-scroll scrollbar-track-gray-800 scrollbar- scrollbar-thumb-accent scrollbar-thin max-h-full bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-xl p-10 relative transition-all duration-300 scale-100"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>

                <h2 className=" font-black uppercase tracking-[0.3em] text-blue-500 mb-1">Task Details</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 border-t border-b border-gray-100 dark:border-gray-700 py-3 mb-8">
                  <div className='space-y-1'>
                    <h3 className='text-3xl font-bold text-slate-800 dark:text-white tracking-tight leading-none'>{task?.title}</h3>
                  </div>
                  <div className='space-y-1'> </div>
                  {/* Project Title */}
                  <div className="space-y-1">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">Project Name</p>
                    <p className="text-base font-bold text-slate-700 dark:text-slate-200">{task?.project?.title}</p>
                  </div>
                  {/* Status */}
                  <div className="space-y-1">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">Status</p>
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${task?.status === "ToDo"
                        ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                        : task?.status === "InProgress"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full mr-1.5 ${task?.status === "ToDo"
                          ? "bg-amber-500"
                          : task?.status === "InProgress"
                            ? "bg-blue-500"
                            : "bg-green-500"
                          }`}
                      ></span>
                      {task?.status}
                    </span>
                  </div>
                  {/* Assigned Employee */}
                  <div className="space-y-1">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">Assigned Employee</p>
                    <p className="text-base font-semibold">{task?.employee?.userName || 'N/A'}</p>
                    <p className="text-xs  font-medium text-blue-600 dark:text-blue-400 break-all leading-tight">{task?.employee?.email}</p>
                  </div>
                  {/* Project Manager */}
                  <div className="space-y-1">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">Project Manager</p>
                    <p className="text-base font-semibold">{task?.project?.manager?.userName}</p>
                    <p className="text-xs  font-medium text-blue-600 dark:text-blue-400 break-all leading-tight">{task?.project?.manager?.email}</p>
                  </div>
                  {/* Contact & Phone Number */}
                  <div className="space-y-1">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">Manager Contact</p>
                    <p className="text-sm">
                      <span className="font-bold uppercase text-gray-700 dark:text-gray-300">{task?.project?.manager?.country}</span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-gray-600 dark:text-gray-400">{task?.project?.manager?.phoneNumber}</span>
                    </p>
                  </div>
                  {/* Manager Status */}
                  <div className="space-y-1">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">Manager Account Status</p>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-bold ${task?.project?.manager?.isActivated
                      ? 'bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400'
                      }`}>
                      {task?.project?.manager?.isActivated ? 'Activated' : 'Deactivated'}
                    </span>
                  </div>
                  {/* Timeline Panel */}
                  <div className="space-y-3 col-span-1 md:col-span-2 bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">Timeline</p>
                    <div className="flex flex-wrap gap-6">
                      <div className="flex items-center gap-2">
                        <Calendar size={16} className="text-blue-500" />
                        <span className="text-sm font-medium">Created: <span className="text-gray-500">{new Date(task?.creationDate).toLocaleDateString()}</span></span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock size={16} className="text-purple-500" />
                        <span className="text-sm font-medium">Modified: <span className="text-gray-500">{new Date(task?.modificationDate).toLocaleDateString()}</span></span>
                      </div>
                    </div>
                  </div>
                  {/* task description */}
                  <div className="col-span-1 md:col-span-2 space-y-2">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">Description</p>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-300 bg-slate-50 dark:bg-transparent p-3 rounded-lg border border-dashed border-gray-200 dark:border-gray-700">
                      {task?.description || "No description provided for this task."}
                    </p>
                  </div>

                </div>

                <div className="flex justify-end">
                  <button
                    onClick={() => setIsOpen(false)}
                    className="px-6 py-2.5 bg-slate-900 dark:bg-white dark:text-slate-900 text-white font-bold rounded-xl hover:opacity-90 transition-all shadow-lg active:scale-95 cursor-pointer text-sm"
                  >
                    Close Details
                  </button>
                </div>
              </div>

            </div>

          )}
        </div>
      </div >


    </>
  )
}
