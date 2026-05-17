import axiosClient from "../axsiosClient";

export interface ITasksCountResponse {
  toDo: number;
  inProgress: number;
  done: number;
}

export const getTasksCount = () => {
  return axiosClient.get<ITasksCountResponse>("/Task/count");
}