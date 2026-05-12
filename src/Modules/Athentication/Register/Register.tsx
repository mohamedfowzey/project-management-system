import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import CustomButton from "../../Shared/CustomButton/CustomButton";

export interface RegisterData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterData>();

  const onsubmit = async (data: RegisterData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Register",
        data,
      );
      toast.success(response?.data?.message);
      navigate("/verify-email");

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            register={register("userName", {
              required: "User name is required",
            })}
            HTMLtype="text"
            label="User Name"
            error={errors.userName?.message}
          />
          <CustomInput
            register={register("email", { required: "Email is required" })}
            HTMLtype="email"
            label="E-mail"
            error={errors.email?.message}
          />
          <CustomInput
            register={register("country", { required: "Country is required" })}
            HTMLtype="text"
            label="Country"
            error={errors.country?.message}
          />
          <CustomInput
            register={register("phoneNumber", {
              required: "Phone number is required",
            })}
            HTMLtype="text"
            label="Phone Number"
            error={errors.phoneNumber?.message}
          />
          <CustomInput
            register={register("password", {
              required: "Password is required",
            })}
            HTMLtype="password"
            label="Password"
            error={errors.password?.message}
          />
          <CustomInput
            register={register("confirmPassword", {
              required: "Confirm Password is required",
            })}
            HTMLtype="password"
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          />
        </div>
        <CustomButton
          text="Save"
          loading={loading}
          disabled={false}
          onClick={handleSubmit(onsubmit)}
        />
      </form>
    </>
  );
}
