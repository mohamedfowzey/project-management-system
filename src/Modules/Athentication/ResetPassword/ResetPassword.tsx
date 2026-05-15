import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { Validations } from "../../../Constants/Validations";
import { Resett, type ResetPasswordData } from "../../../api/modules/Auth";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import CustomInput from "../../Shared/CustomInput/CustomInput";



export default function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ResetPasswordData>();

  const onsubmit = async (data: ResetPasswordData) => {
    setLoading(true);
    try {
      await Resett(data);

      navigate("/login");
    }  finally {
      setLoading(false);
    }
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <form className="my-3.5" onSubmit={handleSubmit(onsubmit)}>
      <CustomInput
        register={register("email", Validations.email)}
        HTMLtype="email"
        label="E-mail"
        error={errors.email?.message}
      />

      <CustomInput
        register={register("password", Validations.password)}
        HTMLtype="password"
        label="New Password"
        error={errors.password?.message}
      />

      <CustomInput
        register={register("confirmPassword", {...Validations.confirmPassword, validate: (value) =>
            value === password || "Passwords do not match"})}
        HTMLtype="password"
        label="Confirm Password"
        error={errors.confirmPassword?.message}
        showSuccess={!!confirmPassword && password === confirmPassword}

        
      />

      <CustomInput
        register={register("seed", Validations.otp)}
        HTMLtype="text"
        label="OTP Verification"
        error={errors.seed?.message}
      />

      <CustomButton
        text="Save"
        loading={loading}
        disabled={false}
      />
    </form>
  );
}
