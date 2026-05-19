import axiosClient from "../axsiosClient";

export interface GetUsersParams {
  pageSize?: number;
  pageNumber?: number;
  search?: string;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  imagePath?: string;
  isActivated: boolean;
  creationDate: string;
  modificationDate: string;
}

export interface UsersPaginatedResponse {
  data: User[];            
  totalNumberOfRecords: number;
  pageNumber: number;
  pageSize: number;

}export interface createUserData {
  userName: string;
  email: string;
  country: string;
  pageNumber: number;
  profileImage: File | null;
  password: string;
  confirmPassword: string;
}
export interface User {
  country: string;
  creationDate: string;
  email: string;
  id: number;
  imagePath?: string;
  isActivated: boolean;
  modificationDate: string;
  phoneNumber: string;
  userName: string;
}
export interface UserId {
  id: number;
}

export interface UserCountresponse {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}

export const getUsers = (params?: GetUsersParams) => {
  return axiosClient.get<UsersPaginatedResponse>("/Users", {
    params: {
      pageNumber: params?.pageNumber,
      pageSize: params?.pageSize,
    },
  });
};export const getUsersById = (id: UserId) => {
  return axiosClient.get(`/Users/${id}`);
};

export const createUsers = (data: createUserData) => {
  return axiosClient.post("/Users", data);
};

export const getCurrentUser = () => {
  return axiosClient.get("/Users/currentUser");
};
export const getUserCount = () => {
  return axiosClient.get<UserCountresponse>("/Users/count");
};
