
export default function ProjectDataForm() {
  return (
    <>
      <div className="h-[calc(100vh-80px)] self-stretch flex justify-center items-center">
        <div className="rounded-3xl bg-white dark:bg-gray-950 w-full md:w-[90%] lg:w-80 mx-auto py-10 px-5">
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {" "}
              Search{" "}
            </span>
            <input
              type="text"
              placeholder="title"
              className="mt-0.5 w-full rounded-2xl p-2 border-1 focus-visible:outline-0  border-gray-300 shadow-sm md:text-xl dark:shadow-sm shadow-gray-600 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            />
          </div>
          <div className="mb-4">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-200">
              {" "}
              description{" "}
            </span>
            <textarea
              placeholder="description"
              className="mt-0.5 w-full rounded-2xl p-2 border-1 focus-visible:outline-0  border-gray-300 shadow-sm md:text-xl dark:shadow-sm shadow-gray-600 dark:border-gray-600 dark:bg-gray-900 dark:text-white"
            ></textarea>
            <div className="flex justify-between">

            </div>
          </div>{" "}
        </div>
      </div>
    </>
  );
}
