import { useForm } from "react-hook-form";
import { Validations } from "../../../Constants/Validations";
import CustomInput from "../../Shared/CustomInput/CustomInput";
import { Save, X } from "lucide-react";
import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import noUserImg from "../../../assets/Images/noDataUser.jpg";
import { AuthContext } from "../../../Contexts/AuthContext";
import { updateCurrentUser } from "../../../api/modules/user";


export default function EditProfile() {
    const {register,handleSubmit,formState: {errors},setValue} = useForm({mode:'onChange'});
    const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState<string>(noUserImg);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const {currentUserData,saveUserData
  } = useContext(AuthContext)!;

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

  const onsubmit = async (data) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("userName", data.userName);
    formData.append("email", data.email);
    formData.append("country", data.country);
    formData.append("phoneNumber", data.phoneNumber);
    formData.append("confirmPassword", data.confirmPassword);
    formData.append("profileImage", fileInputRef.current?.files?.[0] || '');
    try{

      await updateCurrentUser(formData);
      setLoading(false);
      navigate("/dashboard");
      saveUserData();
    }
    catch{
      setLoading(false);
    }
  };
  useEffect(() => {
    console.log(currentUserData);
    
      if(currentUserData?.imagePath){
        setPreviewImage(`https://upskilling-egypt.com:3003/${currentUserData.imagePath}`)
      }
        setValue('userName',currentUserData?.userName)
        setValue('email',currentUserData?.email)
        setValue('country',currentUserData?.country)
        setValue('phoneNumber',currentUserData?.phoneNumber)
      
    
    
}, [currentUserData])
  
  return (
    <form className="pt-10 relative " onSubmit={handleSubmit(onsubmit)}>
        <div
          className="text-center rounded-full w-40 h-40 mx-auto mb-4 cursor-pointer hover:opacity-80 transition-opacity relative"
          onClick={handleImageClick}
        >
          <img
            className="mx-auto w-40 h-40 rounded-full object-cover"
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
          {/* <button
            type="button"
            className="absolute top-0  left-full text-white rounded-full px-2 opacity-75 hover:opacity-100 transition-opacity cursor-pointer"
            onClick={(e) => {
              setPreviewImage(noUserImg);              
              fileInputRef.current!.value = "";
              e.stopPropagation();
            }}
          > */}
            {/* <X className="text-main-color" opacity={1} strokeWidth={4} />
          </button> */}
        </div>
        <div className="p-10 w-full md:w-3/4 lg:w-1/2 mx-auto space-y-4">
          <CustomInput
            register={register("userName", Validations.userName)}
            HTMLtype="text"
            label="User Name"
            error={errors.userName?.message as string}
          />
          <CustomInput
            register={register("email", Validations.email)}
            HTMLtype="email"
            label="E-mail"
            error={errors.email?.message as string}
          />
          <CustomInput
            register={register("country", Validations.country)}
            HTMLtype="text"
            label="Country"
            error={errors.country?.message as string}
          />
          <CustomInput
            register={register("phoneNumber", Validations.phoneNumber)}
            HTMLtype="text"
            label="Phone Number"
            error={errors.phoneNumber?.message as string}
          />
          <CustomInput
            register={register("confirmPassword", Validations.password)}
            HTMLtype="password"
            label="Confirm Password"
            error={errors.confirmPassword?.message as string}
          />
          
        </div>
        <div className="links flex justify-end my-2">
        </div>
        <div className="inline-block fixed z-10 top-25 right-5">

        <button
          type="submit"> 
          {loading ? ( <div role="status"
            className="relative inline-block w-8 h-8 rounded-full bg-transparent border-2 animate-spin border-accent">
            <div
               className="absolute top-1 left-1 w-2 h-2 rounded-full border-2 border-accent bg-accent">
            </div>
            <span className="sr-only">Loading…</span>
         </div>):(
          <Save className="text-accent cursor-pointer" size={30} opacity={1} strokeWidth={1}  />
         )}
        </button>
          </div>
      </form>
  )
}
