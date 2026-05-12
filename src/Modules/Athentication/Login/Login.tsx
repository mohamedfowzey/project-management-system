import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthContext";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import CustomButton from "../../Shared/CustomButton/CustomButton";

export interface loginData {
  email: string;
  password: string;
}
interface AuthContextType {
  saveUserData: () => void;
}
export default function Login() {
  const [loading, setLoading] = useState(false);
  const { saveUserData } = useContext(AuthContext) as AuthContextType;

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<loginData>();

  const onsubmit = async (data: loginData) => {
    setLoading(true);
    try {
      const response = await axios.post(
        "https://upskilling-egypt.com:3003/api/v1/Users/Login",
        data,
      );
      localStorage.setItem("token", response.data.token);
      saveUserData();
      toast.success(response?.data?.message || "login successfully");
      navigate("/dashboard/home");
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
          register={register("password", { required: "Password is required" })}
          HTMLtype="password"
          label="Password"
          error={errors.password?.message}
        />
        <div className="links flex justify-between my-3">
          <Link className="text-muted text-decoration-none" to="/register">
            Register Now?
          </Link>
          <Link className="text-decoration-none" to="/forget-password">
            Forget Password?
          </Link>
        </div>
        <CustomButton
          text="Login"
          loading={loading}
          disabled={false}
          onClick={handleSubmit(onsubmit)}
        />
      </form>
    </>
  );
}
