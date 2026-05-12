import { useState } from 'react';
import {Eye,EyeOff} from 'lucide-react'
import type { UseFormRegisterReturn } from 'react-hook-form'

export default function CustomInput({register,HTMLtype,name}:{register:UseFormRegisterReturn,HTMLtype:string,name:string}) {
    const [passVisible, setPassVisible] = useState(true);   
  
  return (
    <>
    <div className="relative z-0 w-full mb-5 group">
      <input {...register} type={HTMLtype=='password'?passVisible?'text':'password':HTMLtype} name="floating_email" id="floating_email" className="block custom-input py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer" placeholder=" " required />
      <label htmlFor="floating_email" className="custom-input-label absolute text-sm text-body duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto">{name}</label>
      <span className='absolute' onClick={()=>setPassVisible(p=>!p)}>{HTMLtype == 'password'? passVisible? <Eye/>:<EyeOff/>:''}</span>
  </div>
    </>
  )
}
