import React from "react";
import { X } from "lucide-react";
import type { Profile } from "../../../Contexts/AuthContext";
import noUserImg from "../../../assets/Images/noDataUser.jpg";
import { API_BASE_URL } from "../../../api/axsiosClient";


interface ProfileViewModalProps {
  user: Profile;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ProfileViewModal({
  user,
  isOpen,
  setIsOpen,
}: ProfileViewModalProps) {
  if (!isOpen) return null;
  return (
    <>
      <div>
        <div className="">
          {isOpen && (
            <div
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 flex items-center justify-center bg-black/70 z-50 backdrop-blur-sm h-screen"
            >
              <div
                onClick={(e) => e.stopPropagation()}
                className="w-[95%] md:w-[70%] lg:w-[50%] bg-white dark:bg-gray-800 dark:text-white rounded-2xl shadow-xl p-10 relative transition-all duration-300 scale-100 overflow-y-auto scrollbar-track-gray-800 scrollbar- scrollbar-thumb-accent scrollbar-thin max-h-full"
              >
                <button
                  onClick={() => setIsOpen(false)}
                  className="absolute top-4 right-4 p-2 rounded-full text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors cursor-pointer"
                >
                  <X size={20} strokeWidth={2.5} />
                </button>
                <div
                  className="text-center rounded-full w-40 h-40 mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity relative"
                  
                >
                  <img
                    className="mx-auto w-40 h-40 rounded-full object-cover"
                    src={user.imagePath ? `${API_BASE_URL}/${user.imagePath}` : noUserImg}
                    alt="Profile"
                  />
                 
                </div>
                <h2 className=" font-black uppercase tracking-[0.3em] text-blue-500 mb-1">
                  Profile Details
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-t border-b border-gray-100 dark:border-gray-700 py-3 mb-4">
                  {/* User Name */}
                  <div className="col-span-1 md:col-span-2 space-y-1">
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white tracking-tight leading-none">
                      {user?.userName}
                    </h3>
                  </div>
                  {/* Assigned User Info */}
                  <div className="space-y-1">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">
                      User Details
                    </p>
                    <p className="text-base font-semibold">
                      {user?.userName || "N/A"}
                    </p>
                    <p className="text-xs font-medium text-blue-600 dark:text-blue-400 break-all leading-tight">
                      {user?.email}
                    </p>
                  </div>
                  {/* Contact & Phone Number */}
                  <div className="space-y-1">
                    <p className="text-[14px] font-black uppercase tracking-widest text-gray-400">
                      User Contact
                    </p>
                    <p className="text-sm">
                      <span className="font-bold uppercase text-gray-700 dark:text-gray-300">
                        {user?.country || "N/A"}
                      </span>
                      <span className="mx-2 text-gray-300">|</span>
                      <span className="text-gray-600 dark:text-gray-400">
                        {user?.phoneNumber || "N/A"}
                      </span>
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
      </div>
    </>
  );
}
