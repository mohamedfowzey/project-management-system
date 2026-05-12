import axios from "axios";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Contexts/AuthContext";
import CustomInput from "../../Shared/CustomInput/CustomInput";

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
        <button
          type="submit"
          disabled={loading}
          className={`main-Bg-btn w-full py-2 rounded-full ${loading ? "cursor-not-allowed opacity-70" : "cursor-pointer"}`}
        >
          {loading ? (
            <>
              <span> loading...</span>
            </>
          ) : (
            "submit"
          )}
        </button>
      </form>
    </>
  );
}
