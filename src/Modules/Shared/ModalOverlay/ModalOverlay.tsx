import type { ReactNode } from "react";
import ReactDOM from "react-dom";

interface ModalOverlayProps {
  children: ReactNode;
}

const ModalOverlay = ({ children }: ModalOverlayProps) => {
 
  const isDarkMode = document.querySelector('.dark') !== null;

  return ReactDOM.createPortal(
    
    <div className={`${isDarkMode ? 'dark' : ''} fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-[2px]`}>
      <div className="w-full flex items-center justify-center">
         {children}
      </div>
    </div>,
    document.body
  );
};

export default ModalOverlay;