import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate, } from "react-router-dom";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import { Validations } from "../../../Constants/Validations";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
import { ForgetPasswordd,type ForgetPasswordData } from "../../../api/modules/Auth";


export default function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgetPasswordData>();

  const onsubmit = async (data: ForgetPasswordData) => {
    setLoading(true);
    ForgetPasswordd(data).then(()=>navigate("/reset-password")).finally(()=>setLoading(false))
  };

  return (
    <>
      <CustomHeader title="Forget Password" />
      <form className="my-3.5" onSubmit={handleSubmit(onsubmit)}>
        <CustomInput
          register={register("email", Validations.email)}
          HTMLtype="email"
          label="E-mail"
          error={errors.email?.message}
        />
        <div className="links flex justify-end my-3">
          <Link className="text-muted text-decoration-none" to="/login">
            Login Now?
          </Link>
        </div>
        <CustomButton
          text="Verify"
          loading={loading}
          disabled={false}
        />
      </form>
    </>
  );
}
