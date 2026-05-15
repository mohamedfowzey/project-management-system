import { Check, Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { type UseFormRegisterReturn } from 'react-hook-form';

interface Props {
  register: UseFormRegisterReturn;
  HTMLtype: string;
  label: string; 
  error?: string; 
  showSuccess?: boolean;
}


export default function CustomInput({ register, HTMLtype, label, error,showSuccess }: Props) {
  const [passVisible, setPassVisible] = useState(false);
  
  const isPassword = HTMLtype === 'password';
  const actualType = isPassword ? (passVisible ? 'text' : 'password') : HTMLtype;



  return (
    <div className="w-full mb-5">
      <div className="relative z-0 group">
        <input
          {...register}
          type={actualType}
          id={register.name} 
          className={`block py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 appearance-none focus:outline-none focus:ring-0 peer ${
            error ? 'border-red-500 focus:border-red-500' : 'border-default-medium focus:border-brand'
          }`}
          placeholder=" "
        />
        <div className="absolute right-0 top-2 flex items-center gap-2">
          
          {showSuccess && (
            <Check color="#09ff05" />
          )}

          {isPassword && (
            <button
              type="button" 
              onClick={() => setPassVisible(!passVisible)}
              className="text-body hover:text-brand transition-colors cursor-pointer"
            >
              {passVisible ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          )}
        </div>
      
        
        <label
          htmlFor={register.name}
          className="text-main-color absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          {label}
        </label>

        

        {/* {isPassword && (
          <button
            type="button" 
            onClick={() => setPassVisible(!passVisible)}
            className="absolute right-0 top-3 text-body hover:text-brand transition-colors cursor-pointer"
          >
            {passVisible ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        )} */}

      </div>
      
      {error && <p className="mt-1 text-xs text-red-500">{error}</p>}
    </div>
  );
}
