import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export interface VerifyData {
  email: string;
  code: string;
}
export default function VerifyEmail() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<VerifyData>();

  const onsubmit = async (data: VerifyData) => {
    setLoading(true);
    try {
      const response = await axios.put(
        "https://upskilling-egypt.com:3003/api/v1/Users/verify",
        data,
      );
      console.log(response);
      toast.success(response?.data?.message);
      navigate("/login");

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="my-3.5" onSubmit={handleSubmit(onsubmit)}>
        {/* <CustomInput name="email" register = {register('email',Validations?.email)} HTMLtype="email" />
              {!! errors && <span className='text-xs text-red-600'>{errors?.email?.message}</span>} */}
        <div className="relative z-0 w-full mb-5 group">
          {/* <CustomInput name="email" register = {register('email',Validations?.email)} HTMLtype="email" />
              {!! errors && <span className='text-xs text-red-600'>{errors?.email?.message}</span>} */}
          <input
            type="email"
            className="block custom-input py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=""
            {...register("email", { required: " email is required" })}
          />
          <label
            htmlFor="floating_email"
            className="absolute text-sm text-main-color duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            E-mail
          </label>
          <div>
            {!!errors && (
              <span className="text-xs text-red-600 ">
                {errors?.email?.message}
              </span>
            )}
          </div>
        </div>
        <div className="relative z-0 w-full mb-5 group">
          <input
            type="text"
            className="block custom-input py-2.5 px-0 w-full text-sm text-heading bg-transparent border-0 border-b-2 border-default-medium appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
            placeholder=""
            {...register("code", { required: " OTP is required" })}
          />
          <label
            htmlFor="floating_OTP"
            className="absolute text-sm text-main-color duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto"
          >
            OTP Verification
          </label>
          <div>
            {!!errors && (
              <span className="text-xs text-red-600 ">
                {errors?.code?.message}
              </span>
            )}
          </div>
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`main-Bg-btn w-full py-2 rounded-full ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {loading ? (
            <>
              {" "}
              <span> loading...</span>
            </>
          ) : (
            "Save"
          )}
        </button>{" "}
      </form>
    </>
  );
}
