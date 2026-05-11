import { Validations } from "../../../Constants/Validations";
import CustomInput from "../../Shared/CustomInput/CustomInput"
import {useForm} from 'react-hook-form'
export interface loginData{
  email:string,
  password:string
}

export default function Login() {
  const {register,handleSubmit,formState:{errors}} = useForm<loginData>();
  const onsubmit = (data:loginData)=>{
    console.log(data);
    
  }
  return (
    <>
    <form onSubmit={handleSubmit(onsubmit)}>
    <CustomInput name="email" register = {register('email',Validations?.email)} HTMLtype="email" />
          {!! errors && <span className='text-xs'>{errors?.email?.message}</span>}
    <CustomInput name="password" register = {register('password',Validations.password)} HTMLtype="password" />
          {!! errors && <span className='text-xs'>{errors?.password?.message}</span>}
</form>
    </>
  )
}
