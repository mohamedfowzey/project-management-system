import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import CustomButton from "../../Shared/CustomButton/CustomButton";

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
        <CustomInput
          register={register("email", { required: "Email is required" })}
          HTMLtype="email"
          label="E-mail"
          error={errors.email?.message}
        />
        <CustomInput
          register={register("code", { required: "OTP is required" })}
          HTMLtype="text"
          label="OTP Verification"
          error={errors.code?.message}
        />
        <CustomButton
          text="Verify"
          loading={loading}
          disabled={false}
          onClick={handleSubmit(onsubmit)}
        />
      </form>
    </>
  );
}
