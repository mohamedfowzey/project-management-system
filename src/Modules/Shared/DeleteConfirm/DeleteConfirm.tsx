import { X, Trash2 } from 'lucide-react';
import React from 'react';

interface Project {
  id: number;
  title: string;
  manager: {
    userName: string;
  };
}

interface DeleteConfirmProps {
  project: Project | null;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirmDelete: (id: number) => void;
}

export default function DeleteConfirm({ project, isOpen, setIsOpen, onConfirmDelete }: DeleteConfirmProps) {
  
  if (!isOpen || !project) return null;

  return (
    <div
      onClick={() => setIsOpen(false)}
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-[100] backdrop-blur-[2px] px-4 transition-opacity"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all scale-100 relative"
      >
        {/* Close Button X */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        {/* Header - Danger Visual Layout */}
        <div className="bg-red-50 dark:bg-red-900/10 p-8 flex flex-col items-center">
          <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mb-4 animate-pulse">
            <Trash2 className="text-red-600 dark:text-red-500" size={40} />
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white">Delete Project?</h2>
        </div>

        {/* Message Body */}
        <div className="p-6 text-center">
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            You are about to delete the project <br />
            <span className="font-bold text-red-600 dark:text-red-400 text-lg">"{project.title}"</span>
          </p>
          <p className="text-[10px] text-red-500/80 dark:text-red-400/70 mt-3 uppercase tracking-widest font-black">
            This action cannot be undone
          </p>
        </div>

        {/* Action Buttons */}
        <div className="p-6 pt-0 flex flex-col gap-3">
          <button
            onClick={() => onConfirmDelete(project.id)}
            className="w-full py-4 bg-red-600 hover:bg-red-700 text-white font-bold rounded-2xl transition-all shadow-lg shadow-red-500/40 active:scale-[0.98] cursor-pointer text-sm"
          >
            Yes, Delete Permanently
          </button>
          
          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-transparent text-gray-500 dark:text-gray-400 font-semibold hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}