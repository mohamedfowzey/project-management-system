import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Verifyy, type VerifyData } from "../../../api/modules/Auth";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
import CustomInput from "../../Shared/CustomInput/CustomInput";


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
    Verifyy(data)
    .then(()=>navigate("/login"))
    .finally(()=> setLoading(false))
    
  };

  return (
    <>
    <CustomHeader title="Verify Email" /> 
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
