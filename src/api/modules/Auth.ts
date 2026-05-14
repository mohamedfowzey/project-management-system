import axiosClient from "../axsiosClient";

export interface LoginData {
  email: string;
  password: string;
}

export interface ForgetPasswordData {
  email: string;
} 
export interface ResetPasswordData {
  email: string;
  password: string;
  confirmPassword: string;
  seed: string;
};
export interface VerifyData {
  email: string;
  code: string;
}
export interface ChangePasswordData {
  oldPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export const Loginn = (data: LoginData) => {
  return axiosClient.post("/Users/Login", data);
};

export const Registerr = (data: FormData) => {
  return axiosClient.post("/Users/Register", data);
};

export const ForgetPasswordd = (data: ForgetPasswordData) => {
  return axiosClient.post("/Users/Reset/Request", data);
};

export const Resett = (data: ResetPasswordData) => {
  return axiosClient.post("/Users/Reset", data);
};
export const Verifyy = (data: VerifyData) => {
  return axiosClient.put("/Users/verify", data);
};
export const changePasswordd = (data: ChangePasswordData) => {
  return axiosClient.put("/Users/ChangePassword", data);
};
