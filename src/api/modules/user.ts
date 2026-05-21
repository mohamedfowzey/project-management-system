import axiosClient from "../axsiosClient";

export interface GetUsersParams {
  pageSize?: number;
  pageNumber?: number;
  search?: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  creationDate: string;
  modificationDate: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string; 
  creationDate: string;
  modificationDate: string;
  project: Project;
}

export interface User {
  id: number;
  userName: string;
  email: string;
  country: string;
  phoneNumber: string;
  isActivated: boolean;
  imagePath?: string; 
  task: Task[];      
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

export interface UserCountresponse {
  activatedEmployeeCount: number;
  deactivatedEmployeeCount: number;
}

export const getUsers = (params?: GetUsersParams) => {
  return axiosClient.get<UsersPaginatedResponse>("/Users/Manager", {
    params: {
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
    },
  });

};export const getUsersById = (id: number | string) => {
  return axiosClient.get(`/Users/${id}`);
};

export const toggleActivatedEmployee = (id: number) => {
  return axiosClient.put(`/Users/${id}`);
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
