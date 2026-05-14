import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import { Validations } from "../../../Constants/Validations";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
import { changePasswordd ,type ChangePasswordData } from "../../../api/modules/Auth";



export default function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<ChangePasswordData>();

  const onsubmit = async (data: ChangePasswordData) => {
    setLoading(true);
    try {
      const response = await changePasswordd(data);

      toast.success(response?.data?.message || "Password changed successfully");
      navigate("/login");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to change password");
    } finally {
      setLoading(false);
    }
  };

  const password = watch("newPassword");
  const confirmNewPassword = watch("confirmNewPassword");

  return (
    <>
      <CustomHeader title="Change Password" />

      <form className="my-3.5" onSubmit={handleSubmit(onsubmit)}>
        <CustomInput
          register={register("oldPassword", Validations.oldPassword)}
          HTMLtype="password"
          label="Enter your Old Password"
          error={errors.oldPassword?.message}
        />

        <CustomInput
          register={register("newPassword", Validations.newPassword)}
          HTMLtype="password"
          label="Enter your New Password"
          error={errors.newPassword?.message}
        />

        <CustomInput
          register={register("confirmNewPassword",
            {
              ...Validations.confirmNewPassword, validate: (value) =>
                value === password || "Passwords do not match"
            })}
          HTMLtype="password"
          label="Confirm New Password"
          error={errors.confirmNewPassword?.message}
          showSuccess={!!confirmNewPassword && password === confirmNewPassword}
        />

        <CustomButton
          text="Save"
          loading={loading}
          disabled={false}
        />
      </form>
    </>

  );
}
