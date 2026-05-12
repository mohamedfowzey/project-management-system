import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import noUserImg from "../../../assets/Images/noDataUser.jpg";
import { Validations } from "../../../Constants/Validations";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
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
    watch,
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
    <CustomHeader title="register"/>
      <form className="my-3.5" onSubmit={handleSubmit(onsubmit)}>
        <div className="text-center rounded-full w-24 h-24 mx-auto mb-8">
          <img
            className="mx-auto  w-24 h-24 rounded-full "
            src={noUserImg}
            alt="No User"
          />
          <label htmlFor="imageProfile" className=""></label>
          <input type="file" id="imageProfile" hidden/>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <CustomInput
            register={register("userName", Validations.userName
            )}
            HTMLtype="text"
            label="User Name"
            error={errors.userName?.message}
          />
          <CustomInput
            register={register("email", Validations.email)}
            HTMLtype="email"
            label="E-mail"
            error={errors.email?.message}
          />
          <CustomInput
            register={register("country", Validations.country)}
            HTMLtype="text"
            label="Country"
            error={errors.country?.message}
          />
          <CustomInput
            register={register("phoneNumber", Validations.phoneNumber)}
            HTMLtype="text"
            label="Phone Number"
            error={errors.phoneNumber?.message}
          />
          <CustomInput
            register={register("password", Validations.password)}
            HTMLtype="password"
            label="Password"
            error={errors.password?.message}
          />
          <CustomInput
            register={register("confirmPassword", {...Validations.confirmPassword,validate: (value) => value === watch("password") || "Passwords do not match"})}
            HTMLtype="password"
            label="Confirm Password"
            error={errors.confirmPassword?.message}
          />
        </div>
        <div className="links flex justify-end my-3">
          <Link className="text-muted text-decoration-none" to="/login">
            Login Now?
          </Link>
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
