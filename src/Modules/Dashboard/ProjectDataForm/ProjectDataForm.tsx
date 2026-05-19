import { useForm } from "react-hook-form";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import { useEffect, useState } from "react";
import {
  createProject,
  getProjectById,
  updateProject,
  type CreateProjectData,
} from "../../../api/modules/Projects";
import { useNavigate, useParams } from "react-router-dom";

export default function ProjectDataForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState<boolean>(false);
  const [editing, setediting] = useState<boolean>(false);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<CreateProjectData>();
  const onsubmit = async (data: CreateProjectData) => {
    setLoading(true);
    if (id) {
      await updateProject(Number(id), data);
    } else {
      await createProject(data);
    }
    setLoading(false);
    navigate("/dashboard/projects");
  };
  const getProject = async (id: string | undefined) => {
    if (!id) {
      return;
    }
    setediting(true);
    const response = await getProjectById(id);
    setediting(false);
    setValue("title", response.data.title);
    setValue("description", response.data.description);
  };
  useEffect(() => {
    (() => {
      console.log(id);

      getProject(id);
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
                  <div className="h-11 bg-gray-700 rounded-2xl w-full mb-4 animate-pulse" />
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
