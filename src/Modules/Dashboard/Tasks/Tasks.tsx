import {
  ArrowUpZA,
  ChevronLeft,
  ChevronRight,
  Eye,
  FilePenLine,
  Search,
  Trash2,
  SlidersHorizontal,
  ArrowDownZA,
} from "lucide-react";
import NoData from "../../Shared/NoData/NoData";
import TableSkeleton from "../../Shared/TableSkeleton/TableSkeleton";
import TaskViewModal from "../../Shared/TaskViewModal/TaskViewModal";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { TasksApi } from "../../../api";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import DeleteConfirm from "../../Shared/DeleteConfirm/DeleteConfirm";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  creationDate: string;
  modificationDate: string;
  employee: {
    userName: string;
    email: string;
    country: string;
    phoneNumber: string;
  };
  project: {
    id: number;
    title: string;
    description: string;
    manager: {
      userName: string;
      email: string;
      country: string;
      phoneNumber: string;
      isActivated: boolean;
    };
  };
}

export default function TasksList() {
    const [sorting, setSorting] = useState<"asc" | "desc">("asc");
  
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const [showFilters, setShowFilters] = useState(false);
  const [filterTitle, setFilterTitle] = useState("");
  const [filterDesc, setFilterDesc] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterUser, setFilterUser] = useState("");
  const [filterProject, setFilterProject] = useState("");

  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      setLoading(true);

      const response = await TasksApi.getAllTasks({
        pageNumber: currentPage,
        pageSize: pageSize,
        search: searchTerm,
      });

      setTasks(response.data.data || []);
      setTotalResults(response.data.totalNumberOfRecords || 0);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenDelete = (task: Task) => {
    setSelectedTask(task);
    setIsDeleteOpen(true);
    setOpenMenu(null);
  };

  const handleConfirmDelete = async () => {
    if (!selectedTask || !selectedTask.id) return;

    try {
      await TasksApi.deleteTask(selectedTask.id);
      setTasks(tasks.filter((t) => t.id !== selectedTask.id));
      setIsDeleteOpen(false);
    } catch (err) {
      console.error("Error deleting task:", err);
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage * pageSize < totalResults) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handlePageSizeChange = (newSize: number) => {
    setPageSize(newSize);
    setCurrentPage(1);
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch = task.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesTitle = task.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase());
    const matchesDesc = task.description
      ?.toLowerCase()
      .includes(filterDesc.toLowerCase());
    const matchesStatus = filterStatus ? task.status === filterStatus : true;
    const matchesUser = task.employee?.userName
      .toLowerCase()
      .includes(filterUser.toLowerCase());
    const matchesProject = task.project?.title
      .toLowerCase()
      .includes(filterProject.toLowerCase());

    return (
      matchesSearch &&
      matchesTitle &&
      matchesDesc &&
      matchesStatus &&
      matchesUser &&
      matchesProject
    );
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchTasks();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm, currentPage, pageSize]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedTasks, setSelectedTasks] = useState<Task | null>(null);
  const handleView = (task: Task) => {
    setSelectedTasks(task);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-10 py-4 px-2 md:px-9.5 bg-white dark:bg-gray-950">
        <h1 className="text-3xl font-semibold">Tasks</h1>
        <div
          className="shrink cursor-pointer"
          onClick={() => navigate("/dashboard/add-task")}
        >
          <CustomButton text=" + add Task " />
        </div>
      </div>

      <div className="table-wrapper">
        <div className="flex items-center gap-3 mb-6">
          <div className="relative flex-1 max-w-md">
            <span className="absolute inset-y-0 left-3 flex items-center text-gray-400">
              <Search size={18} strokeWidth={1.75} />
            </span>
            <input
              type="text"
              placeholder="Search By Title..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white transition-all"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              if (showFilters) {
                setFilterTitle("");
                setFilterDesc("");
                setFilterStatus("");
                setFilterUser("");
                setFilterProject("");
              }
              setShowFilters(!showFilters);
            }}
            className={`hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all cursor-pointer ${showFilters
                ? "bg-emerald-50 border-emerald-500 text-emerald-700 dark:bg-emerald-950/30 dark:border-emerald-500 dark:text-emerald-400"
                : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50 dark:bg-gray-900 dark:border-gray-800 dark:text-gray-300 dark:hover:bg-gray-800"
              }`}
          >
            <SlidersHorizontal size={16} />
            Filter
          </button>
        </div>

        {loading ? (
          <TableSkeleton />
        ) : (
          <>
            <div className="table-container overflow-x-auto rounded-xl border border-gray-200 dark:border-gray-800">
              <table className="data-table w-full border-collapse">
                <thead className="hidden md:table-header-group sticky top-0">
                  <tr className="bg-emerald-800 text-white dark:bg-gray-700">
                    <th className="p-3 text-left align-top min-w-[160px]">
                      <div className="flex gap-1 items-center font-semibold mb-2">
                        Title
                        <span
                          className="cursor-pointer"
                          onClick={() =>
                            setSorting((p) => (p === "asc" ? "desc" : "asc"))
                          }
                        >
                          {sorting === "asc" ? (
                            <ArrowUpZA
                              size={18}
                              strokeWidth={1.5}
                              absoluteStrokeWidth
                            />
                          ) : (
                            <ArrowDownZA
                              size={18}
                              strokeWidth={1.5}
                              absoluteStrokeWidth
                            />
                          )}
                        </span>
                      </div>
                      {showFilters && (
                        <input
                          type="text"
                          placeholder="Filter title..."
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterTitle}
                          onChange={(e) => setFilterTitle(e.target.value)}
                        />
                      )}
                    </th>

                    <th className="p-3 text-left align-top min-w-[160px]">
                      <div className="font-semibold mb-2">Description</div>
                      {showFilters && (
                        <input
                          type="text"
                          placeholder="Filter desc..."
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterDesc}
                          onChange={(e) => setFilterDesc(e.target.value)}
                        />
                      )}
                    </th>

                    <th className="p-3 text-left align-top min-w-[130px]">
                      <div className="font-semibold mb-2">Status</div>
                      {showFilters && (
                        <select
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                        >
                          <option value="">All</option>
                          <option value="ToDo">ToDo</option>
                          <option value="InProgress">InProgress</option>
                          <option value="Done">Done</option>
                        </select>
                      )}
                    </th>

                    <th className="p-3 text-left align-top min-w-[140px]">
                      <div className="font-semibold mb-2">User</div>
                      {showFilters && (
                        <input
                          type="text"
                          placeholder="Filter user..."
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterUser}
                          onChange={(e) => setFilterUser(e.target.value)}
                        />
                      )}
                    </th>

                    <th className="p-3 text-left align-top min-w-[140px]">
                      <div className="font-semibold mb-2">Project</div>
                      {showFilters && (
                        <input
                          type="text"
                          placeholder="Filter project..."
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterProject}
                          onChange={(e) => setFilterProject(e.target.value)}
                        />
                      )}
                    </th>

                    <th className="p-3 text-left align-top min-w-[140px]">
                      <div className="font-semibold mb-2">Date Created</div>
                      {showFilters && <div className="h-6"></div>}
                    </th>

                    <th className="p-3 w-[60px] align-top">
                      <div className="mb-2">&nbsp;</div>
                      {showFilters && <div className="h-6"></div>}
                    </th>
                  </tr>
                </thead>

                <tbody className="block md:table-row-group">
                  {filteredTasks.length > 0 ? (
                    filteredTasks.sort(sorting=='asc'?(a,b)=>a.title.localeCompare(b.title):(a,b)=>b.title.localeCompare(a.title)).map((task) => (
                      <tr
                        key={task?.id}
                        className="block md:table-row mb-4 md:mb-0 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-4 md:p-0"
                      >
                        <td
                          data-label="Title"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          {task.title}
                        </td>

                        <td
                          data-label="Description"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          {task?.description}
                        </td>

                        <td
                          data-label="Status"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          <span
                            className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold ${task?.status === "ToDo"
                              ? "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
                              : task?.status === "InProgress"
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                : "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                              }`}
                          >
                            <span
                              className={`w-2 h-2 rounded-full mr-1.5 ${task?.status === "ToDo"
                                ? "bg-amber-500"
                                : task?.status === "InProgress"
                                  ? "bg-blue-500"
                                  : "bg-green-500"
                                }`}
                            ></span>
                            {task?.status}
                          </span>

                        </td>

                        <td
                          data-label="User"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          {task.employee?.userName}
                        </td>

                        <td
                          data-label="Project"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          {task?.project?.title}
                        </td>

                        <td
                          data-label="Date"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          {new Date(task.creationDate).toLocaleDateString()}
                        </td>

                        <td className="flex justify-end md:table-cell pt-4 md:pt-0 p-3">
                          <div className="actions-wrapper">
                            <button
                              className="menu-btn"
                              onClick={() =>
                                setOpenMenu(
                                  openMenu === task.id ? null : task.id,
                                )
                              }
                            >
                              ⋮
                            </button>

                            {openMenu === task.id && (
                              <div className="actions-menu bg-amber-50 dark:bg-gray-400">
                                <button
                                  onClick={() => {
                                    handleView(task);
                                    setIsOpen(true);
                                    setOpenMenu(null);
                                  }}
                                  className="action-btn view-btn dark:text-gray-700"
                                >
                                  <Eye
                                    color="var(--bg-main-color)"
                                    size={20}
                                    strokeWidth={1.5}
                                    absoluteStrokeWidth
                                  />
                                  View
                                </button>

                                <button
                                  className="action-btn edit-btn dark:text-emerald-900"
                                  onClick={() =>
                                    navigate(`/dashboard/edit-task/${task?.id}`)
                                  }
                                >
                                  <FilePenLine
                                    color="var(--bg-main-color)"
                                    size={20}
                                    strokeWidth={1.5}
                                    absoluteStrokeWidth
                                  />
                                  Edit
                                </button>

                                <button
                                  className="action-btn delete-btn dark:text-black"
                                  onClick={() => handleOpenDelete(task)}
                                >
                                  <Trash2
                                    color="var(--bg-main-color)"
                                    size={20}
                                    strokeWidth={1.5}
                                    absoluteStrokeWidth
                                  />
                                  Delete
                                </button>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={7}
                        className="text-center dark:text-black py-4"
                      >
                        <NoData />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            <div className="pagination">
              <div className="pagination-info">
                <span>Showing</span>
                <select
                  value={pageSize}
                  onChange={(e) => handlePageSizeChange(Number(e.target.value))}
                  className="page-size-select bg-white dark:bg-black"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                  <option value={20}>20</option>
                </select>
                <span>of {totalResults} Results</span>
                <span className="ml-4">
                  Page {currentPage} of {Math.ceil(totalResults / pageSize)}
                </span>
              </div>
              <div className="pagination-controls">
                <button
                  className="page-btn"
                  onClick={handlePrevPage}
                  disabled={currentPage === 1}
                >
                  <ChevronLeft
                    size={20}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                </button>
                <button
                  className="page-btn dark:bg-cyan-900 dark:text-white"
                  onClick={handleNextPage}
                  disabled={currentPage >= Math.ceil(totalResults / pageSize)}
                >
                  <ChevronRight
                    size={20}
                    strokeWidth={1.5}
                    absoluteStrokeWidth
                  />
                </button>
              </div>
            </div>
          </>
        )}

        <DeleteConfirm
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          onConfirm={handleConfirmDelete}
          title="Delete Task?"
          confirmText="Yes, Delete Permanently"
          variant="danger"
          description={
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You are about to delete the task <br />
              <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                "{selectedTask?.title}"
              </span>
            </p>
          }
        />
      </div>

      {selectedTasks && (
        <TaskViewModal
          task={selectedTasks}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
