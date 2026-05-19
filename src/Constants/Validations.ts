interface Validations{
    email:{
        required:string,
        pattern:{value:RegExp
,message:string}
    },
    password: {
    required: string,
    pattern: {
      value:RegExp,
      message:
      string
    }
  },
  newPassword: {
    required: string,
    pattern: {
      value: RegExp,
      message:string,
    }
  },
  oldPassword: {
    required: string,
    pattern: {
      value: RegExp,
      message:string,
    }
  },
  
  confirmNewPassword: {
    
      required:string,

    },
  confirmPassword: {
    
      required: string,

    },
    otp: { required:string ,pattern:{value:RegExp,message:string},maxLength:{value:number,message:string}},
    code: { required: string ,pattern:{value:RegExp,message:string},maxLength:{value:number,message:string}},
    phoneNumber: { required: string ,pattern:{value:RegExp,message:string},maxLength:{value:number,message:string}},
    userName: { required: string, pattern:{value:RegExp,message:string},maxLength:{value:number,message:string}},
    country: { required: string ,pattern:{value:RegExp,message:string},maxLength:{value:number,message:string}}

}

export const Validations:Validations = {
    email:{
        required:'email is required',
        pattern:{value:/^[^\s@]+@[^\s@]+\.[^\s@]+$/
,message:'invalid email'}
    },
   password: {
    required: "password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/,
      message:
        "password must contains lowercase, uppercase, digit and special character!",
    }
  },
  newPassword: {
    required: "password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/,
      message:
        "password must contains lowercase, uppercase, digit and special character!",
    }
  },
  oldPassword: {
    required: "password is required",
    pattern: {
      value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).{8,}$/,
      message:
        "password must contains lowercase, uppercase, digit and special character!",
    }
  },
  
  confirmNewPassword: {
    
      required: "Confirm Password is required",

    },
  confirmPassword: {
    
      required: "Confirm Password is required",
      

    },
    otp: { required: "otp is required" ,pattern:{value:/(\w|\d){4}/,message:'invalid otp'},maxLength:{value:4,message:'otp must be 4 characters'}},
    code: { required: "code is required" ,pattern:{value:/(\w|\d){4}/,message:'invalid code'},maxLength:{value:4,message:'code must be 4 characters'}},
    phoneNumber: { required: "phone is required" ,pattern:{value:/(\d){11}/,message:'invalid phone'},maxLength:{value:11,message:'phone must be 11 characters'}},
    userName: { required: "username is required", pattern:{value:/(\w+\d){1,8}$/,message:'invalid username'},maxLength:{value:8,message:'username must be less than 8 characters'}},
    country: { required: "country is required" ,pattern:{value:/^[a-zA-Z\s]{2,}$/,message:'invalid country name'},maxLength:{value:50,message:'country name must be less than 50 characters'}}

}