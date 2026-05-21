import { Trash2, X } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react"; 
import ModalOverlay from "../ModalOverlay/ModalOverlay"; 

interface GenericDeleteConfirmProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onConfirm: () => void;
  title: string;
  description: ReactNode; 
  confirmText?: string;
  warningText?: string;
  icon?: LucideIcon;
  variant?: "danger" | "warning" | "success"; 
}

export default function DeleteConfirm({
  isOpen,
  setIsOpen,
  onConfirm,
  title,
  description,
  confirmText = "Yes, Proceed",
  warningText = "This action cannot be undone",
  icon: Icon = Trash2,
  variant = "danger",
}: GenericDeleteConfirmProps) {
  if (!isOpen) return null;

 
  const isDanger = variant === "danger";
  const isSuccess = variant === "success";

  const headerBg = isDanger
    ? "bg-red-50 dark:bg-red-900/10"
    : isSuccess
    ? "bg-emerald-50 dark:bg-emerald-900/10"
    : "bg-amber-50 dark:bg-amber-900/10";

  const iconBg = isDanger
    ? "bg-red-100 dark:bg-red-900/30"
    : isSuccess
    ? "bg-emerald-100 dark:bg-emerald-900/30"
    : "bg-amber-100 dark:bg-amber-900/30";

  const iconColor = isDanger
    ? "text-red-600 dark:text-red-500"
    : isSuccess
    ? "text-emerald-600 dark:text-emerald-500"
    : "text-amber-600 dark:text-amber-500";

  const btnBg = isDanger
    ? "bg-red-700 hover:bg-red-600 shadow-red-600/40"
    : isSuccess
    ? "bg-emerald-600 hover:bg-emerald-700 shadow-emerald-500/40"
    : "bg-amber-600 hover:bg-amber-700 shadow-amber-500/40";

  const warningColor = isDanger
    ? "text-red-500/80 dark:text-red-400/70"
    : isSuccess
    ? "text-emerald-500/80 dark:text-emerald-400/70"
    : "text-amber-500/80 dark:text-amber-400/70";

  return (
    <ModalOverlay>
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transform transition-all scale-100 relative "
      >
        {/* Close Button X */}
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full text-gray-400 hover:text-gray-600 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors cursor-pointer"
        >
          <X size={18} strokeWidth={2.5} />
        </button>

        <div className={`${headerBg} p-8 flex flex-col items-center`}>
          <div
            className={`${iconBg} w-20 h-20 rounded-full flex items-center justify-center mb-4 animate-bounce transition-all  ease-in`}
          >
            <Icon className={iconColor} size={40} />
          </div>
          <h2 className="text-xl font-black text-gray-900 dark:text-white text-center">
            {title}
          </h2>
        </div>

        <div className="p-6 text-center">
          <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
            {description}
          </div>
          {warningText && (
            <p
              className={`${warningColor} text-[10px] mt-3 uppercase tracking-widest font-black`}
            >
              {warningText}
            </p>
          )}
        </div>

        <div className="p-6 pt-0 flex flex-col gap-3">
          <button
            onClick={() => {
              onConfirm();
              setIsOpen(false);
            }}
            className={`w-full py-4 text-white font-bold rounded-2xl transition-all shadow-lg active:scale-[0.98] cursor-pointer text-sm ${btnBg}`}
          >
            {confirmText}
          </button>

          <button
            onClick={() => setIsOpen(false)}
            className="w-full py-3 bg-transparent text-gray-500 dark:text-gray-400 font-semibold hover:text-gray-700 dark:hover:text-white transition-colors cursor-pointer text-sm"
          >
            Cancel
          </button>
        </div>
      </div>
    </ModalOverlay>
  );
}