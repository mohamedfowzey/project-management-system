import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import CustomInput from '../../Shared/CustomInput/CustomInput';
import CustomButton from '../../Shared/CustomButton/CustomButton';


export interface forgetData {
  email: string,
  password: string,
  confirmPassword: string,
  seed: string

}

export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm<forgetData>();


  const onsubmit = async (data: forgetData) => {
    setLoading(true)
    try {
      const response = await axios.post("https://upskilling-egypt.com:3003/api/v1/Users/Reset", data);

      toast.success(response?.data?.message);
      navigate('/login')

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message)
    } finally {
      setLoading(false)
    }
  }


  return (
    <>
      <form className='my-3.5' onSubmit={handleSubmit(onsubmit)}>

        <CustomInput
          register={register("email", { required: "Email is required" })}
          HTMLtype="email"
          label="E-mail"
          error={errors.email?.message}
        />

        <CustomInput
          register={register("password", { required: "Password is required" })}
          HTMLtype="password"
          label="Password"
          error={errors.password?.message}
        />

        <CustomInput
          register={register("confirmPassword", { required: "confirm Password is required" })}
          HTMLtype="password"
          label="confirm Password"
          error={errors.confirmPassword?.message}
        />

        <CustomInput
          register={register("seed", { required: "OTP is required" })}
          HTMLtype="text"
          label="OTP Verification"
          error={errors.seed?.message}
        />
        <CustomButton
          text="Save"
          loading={loading}
          disabled={false}
          onClick={handleSubmit(onsubmit)}
        />

      </form>



    </>
  )
}
