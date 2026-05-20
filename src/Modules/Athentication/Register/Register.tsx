import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { Registerr } from "../../../api/modules/Auth";
import noUserImg from "../../../assets/Images/noDataUser.jpg";
import { Validations } from "../../../Constants/Validations";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import CustomHeader from "../../Shared/CustomHeader/CustomHeader";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import { X } from "lucide-react";
interface RegisterData {
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  profileImage: File | null;
  password: string;
  confirmPassword: string;
}

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(noUserImg);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterData>();

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setPreviewImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const onsubmit = async (data: RegisterData) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("password", data.password);
    formData.append("confirmPassword", data.confirmPassword);

    const profileFile = fileInputRef.current?.files?.[0];
    if (profileFile) {
      formData.append("profileImage", profileFile);
    }

    Registerr(formData)
      .then(() => navigate("/verify-email"))
      .finally(() => setLoading(false));
  };

  const password = watch("password");
  const confirmPassword = watch("confirmPassword");

  return (
    <>
      <CustomHeader title="register" />
      <form onSubmit={handleSubmit(onsubmit)}>
        <div
          className="text-center rounded-full w-24 h-24 mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity relative"
          onClick={handleImageClick}
        >
          <img
            className="mx-auto w-24 h-24 rounded-full object-cover"
            src={previewImage}
            alt="Profile"
          />
          <input
            ref={fileInputRef}
            type="file"
            id="imageProfile"
            hidden
            accept="image/*"
            onChange={handleImageChange}
          />
          <button
            type="button"
            className="absolute top-0  left-full text-white rounded-full px-2 opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={(e) => {
              setPreviewImage(noUserImg);
              fileInputRef.current!.value = "";
              e.stopPropagation();
            }}
          >
            <X className="text-main-color" opacity={1} strokeWidth={4} />
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <CustomInput
            register={register("userName", Validations.userName)}
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
              ...Validations.confirmPassword,
              validate: (value) =>
                value === password || "Passwords do not match",
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
