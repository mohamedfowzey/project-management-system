import { useForm } from "react-hook-form";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";
import {
  CreateTask,
  getTaskById,
  updateTask,
  type CreateTaskData,
} from "../../../api/modules/tasks";
import { getAllProjects, type Project } from "../../../api/modules/Projects";
import { getUsers, type User } from "../../../api/modules/user";

export default function ProjectDataForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setediting] = useState<boolean>(false);
  const [projects, setProjects] = useState<Project[] | null>();
  const [employees, setEmployees] = useState<User[] | null>();
  const [selectedProject,setSelectedProject] = useState<Project | null>(null)
  const [selectedUser,setSelectedUser] = useState<User | null>(null)
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateTaskData>();
  const onsubmit = async (data: CreateTaskData) => {
    setLoading(true);
    if (id) {
      await updateTask(Number(id), data);
    } else {
      await CreateTask(data);
    }
    setLoading(false);
    navigate("/dashboard/tasks");
  };
  const getTask = async (id: string | undefined) => {
    if (!id) {
      return;
    }
    setediting(true);
    const response = await getTaskById(+id);
    setediting(false);
    setValue("title", response.data.title);
    setValue("description", response.data.description);
    setValue("employeeId", response.data.employee.id);
    setValue("projectId", response.data.project.id);
    setSelectedProject(response.data.project)
    setSelectedUser(response.data.employee)
  };
  const getProjects = async () => {
    const response = await getAllProjects();
    setProjects(response.data.data);
  };
  const getAllUsers = async () => {
    const response = await getUsers();
    setEmployees(response.data.data);
  };
  useEffect(() => {
    (() => {
      console.log(id);
      
        getProjects();
        getAllUsers();
      
      getTask(id);
    })();
  }, []);
  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="h-[calc(100vh-80px)] self-stretch flex justify-center items-center">
          <div className="rounded-3xl bg-white dark:bg-gray-950 w-full md:w-[90%] lg:w-80 mx-auto py-10 px-5">
            <span className="sr-only">Loading...</span>
            <>
              <div className="mb-4">
                <span className="text-sm  font-medium text-gray-700 dark:text-gray-200">
                  {" "}
                  title
                </span>
                {editing ? (
                  <div className="h-11 bg-gray-700 dark:bg-gray-400 rounded-2xl w-full mb-4 animate-pulse" />
                ) : (
                  <input
                    {...register("title", {
                      required: "title is required",
                      pattern: {
                        value: /\S/,
                        message: "tittle can not be empty",
                      },
                    })}
                    type="text"
                    placeholder="title"
                    className="mt-0.5 w-full rounded-2xl p-2 border-1 focus-visible:outline-0  border-gray-300 shadow-sm md:text-xl dark:shadow-sm shadow-gray-600 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  />
                )}
                {!!errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
                  {" "}
                  description{" "}
                </span>
                {editing ? (
                  <div className="h-20 bg-gray-700 rounded-2xl w-full mb-4 animate-pulse" />
                ) : (
                  <textarea
                    {...register("description", {
                      required: "description is required",
                      pattern: {
                        value: /\S/,
                        message: "tittle can not be empty",
                      },
                    })}
                    placeholder="description"
                    className="mt-0.5 w-full rounded-2xl p-2 border-1 focus-visible:outline-0  border-gray-300 shadow-sm md:text-xl dark:shadow-sm shadow-gray-600 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
                  ></textarea>
                )}
                {!!errors.description && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.description.message}
                  </p>
                )}
              </div>

              <div className="mb-4">
                <span className="text-sm  font-medium text-gray-700 dark:text-gray-200">
                  {" "}
                  project
                </span>
                {editing ? (
                  <div className="h-11 bg-gray-700 dark:bg-gray-400 rounded-2xl w-full mb-4 animate-pulse" />
                ) : (
                  <select
                  {...register('projectId')}
                    className="block w-full px-3 py-2.5 border text-heading text-sm rounded-2xl focus-visible:outline-0 shadow-xs placeholder:text-body mb-4"
                  >
                    <option className="bg-white dark:bg-gray-900 " value={selectedProject?.id || ''}>{selectedProject?.title||'Choose a project'}</option>

                    {projects?.map((p) => (
                      <option value={p?.id} className="bg-white dark:bg-gray-900 ">{p.title}</option>
                    ))}
                  </select>
                )}
                {!!errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="mb-4">
                <span className="text-sm  font-medium text-gray-700 dark:text-gray-200">
                  {" "}
                  user
                </span>
                {editing ? (
                  <div className="h-11 bg-gray-700 dark:bg-gray-400 rounded-2xl w-full mb-4 animate-pulse" />
                ) : (
                  <select
                  {...register('employeeId')}
                    className="block w-full px-3 py-2.5 border text-heading text-sm rounded-2xl focus-visible:outline-0 shadow-xs placeholder:text-body mb-4"
                  >
                    <option className="bg-white dark:bg-gray-900 " value={selectedUser?.id || ''}>{selectedUser?.userName || 'Choose a User'}</option>
                    {employees?.map((p) => (
                      <option className="bg-white dark:bg-gray-900 " value={p?.id}>{p.userName}</option>
                    ))}
                  </select>
                )}
                {!!errors.title && (
                  <p className="mt-1 text-xs text-red-500">
                    {errors.title.message}
                  </p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => navigate("/dashboard/projects")}
                  className="text-sm rounded-full cursor-pointer mt-4 p-2 px-4 border border-gray-900 dark:border-gray-100"
                >
                  cancle
                </button>
                <div className="">
                  <CustomButton text="save" loading={loading} />
                </div>
              </div>
            </>
          </div>
        </div>
      </form>
    </>
  );
}
