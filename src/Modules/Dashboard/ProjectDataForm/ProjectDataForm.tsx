import { useForm } from "react-hook-form";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import { useState } from "react";
import { createProject, type CreateProjectData } from "../../../api/modules/Projects";
import { useNavigate } from "react-router-dom";


export default function ProjectDataForm() {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreateProjectData>();
  const onsubmit = async (data: CreateProjectData) => {
    setLoading(true)
    await createProject(data)
    setLoading(false)
  };
  return (
    <>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="h-[calc(100vh-80px)] self-stretch flex justify-center items-center">
          <div className="rounded-3xl bg-white dark:bg-gray-950 w-full md:w-[90%] lg:w-80 mx-auto py-10 px-5">
            <div className="mb-4">
              <span className="text-sm  font-medium text-gray-700 dark:text-gray-200">
                {" "}
                title{" "}
              </span>
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
              {!!errors.description && (
                <p className="mt-1 text-xs text-red-500">
                  {errors.description.message}
                </p>
              )}

              <div className="flex justify-end gap-2">
                <button type="button" onClick={()=>navigate('/dashboard/projects')} className="text-sm rounded-full cursor-pointer mt-4 p-2 px-4 border border-gray-900 dark:border-gray-100">
                  cancle
                </button>
                <div className="">
                  <CustomButton text="save" loading={loading}/>
                </div>
              </div>
            </div>{" "}
          </div>
        </div>
      </form>
    </>
  );
}
