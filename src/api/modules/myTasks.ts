import axiosClient from "../axsiosClient";

export interface getMyTasks{
  pageNumber: number;
  pageSize: number;
  type?: 'ToDo' | 'InProgress' | 'Done';
}
export const getMyTasks = (params: getMyTasks) => {
  return axiosClient.get("/Task", {
    params: params
  });
}