import axiosClient from "../axsiosClient";

interface GetProjectsParams {
  pageNumber: number;
  pageSize: number;
  search?: string;
}

export interface CreateProjectData {
  title: string;
  description?: string;
}

interface UpdateProjectData {
  title: string;
  description?: string;
}

export const getAllProjects = (params?: GetProjectsParams) => {
  return axiosClient.get("/Project", {
    params: {
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
      search: params?.search || "",
    },
  });
};

export const getProjectById = (id: number) => {
  return axiosClient.get(`/Project/${id}`);
};

export const getManagerProjects = (params?: GetProjectsParams) => {
  return axiosClient.get("/Project/manager", {
    params: {
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
      search: params?.search || "",
    },
  });
};

export const getEmployeeProjects = (params?: GetProjectsParams) => {
  return axiosClient.get("/Project/employee", {
    params: {
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
      search: params?.search || "",
    },
  });
};

export const createProject = (data: CreateProjectData) => {
  return axiosClient.post("/Project", data);
};

export const updateProject = (id: number, data: UpdateProjectData) => {
  return axiosClient.put(`/Project/${id}`, data);
};

export const deleteProject = (id: number) => {
  return axiosClient.delete(`/Project/${id}`);
};