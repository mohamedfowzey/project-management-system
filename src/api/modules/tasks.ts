import axiosClient from "../axsiosClient";

export interface ITasksCountResponse {
  toDo: number;
  inProgress: number;
  done: number;
}

interface GetTaskssParams {
  pageNumber: number;
  pageSize: number;
  search?: string;
}

export interface CreateTaskData{
  title: string,
  description: string,
  employeeId:string ,
  projectId: string
}
export const getTasksCount = () => {
  return axiosClient.get<ITasksCountResponse>("/Task/count");
}
export const getAllTasks = (params:GetTaskssParams) => {

  return axiosClient.get("/Task/manager",{
    params:{
      pageNumber: params?.pageNumber || 1,
      pageSize: params?.pageSize || 10,
      search: params?.search || "",
    }
  });
}
export const CreateTask = (data:CreateTaskData)=>{
  return axiosClient.post('Task',data);
}
export const updateTask = (id : number, data:CreateTaskData)=>{
  return axiosClient.put(`Task/${id}`,data)
}
export const getTaskById = (id : number)=>{
  return axiosClient.get(`Task/${id}`)
}