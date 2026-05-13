import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import noUserImg from "../../../assets/Images/noDataUser.jpg";
import { Validations } from "../../../Constants/Validations";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import { Registerr, type RegisterData } from "../../../api/modules/Auth";

// export interface RegisterData {
//   userName: string;
//   email: string;
//   country : string;
//   phoneNumber : string;
//   profileImage : File | null;
//   password: string;
//   confirmPassword : string;
// }

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

    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);


    if (data.profileImage && (data.profileImage as any).length > 0) {
      formData.append("profileImage", (data.profileImage as any)[0]);
    }

    try {

      const response = await Registerr(formData as any);
      toast.success(response?.data?.message || "Registration successful");
      navigate("/verify-email");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  // const onsubmit = async (data: RegisterData) => {
  //   setLoading(true);
  //   try {
  //     const response = await Registerr(data);
  //     toast.success(response?.data?.message);
  //     navigate("/verify-email");
  //   } catch (error: any) {
  //     toast.error(error.response?.data?.message);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <>
      <CustomHeader title="register" />
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="text-center rounded-full w-24 h-24 mx-auto mb-4">
          <img
            className="mx-auto  w-24 h-24 rounded-full "
            src={noUserImg}
            alt="No User"
          />
          <label htmlFor="imageProfile" className=""></label>
          <input type="file" id="imageProfile" hidden {...register("profileImage")} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            register={register("confirmPassword", {
              ...Validations.confirmPassword, validate: (value) =>
                value === password || "Passwords do not match"
            })}
            HTMLtype="password"
            label="Confirm Password"
            error={errors.confirmPassword?.message}
            showSuccess={!!confirmPassword && password === confirmPassword}

          />
        </div>
        <div className="links flex justify-end my-2">
          <Link className="text-muted text-decoration-none" to="/login">
            Login Now?
          </Link>
        </div>
        <CustomButton
          text="Save"
          loading={loading}
          disabled={false}
        // onClick={handleSubmit(onsubmit)}
        />
      </form>
    </>
  );
}
