import { useState, useEffect } from "react";
import { ProjectsApi, Tasks } from "../../../api";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import {
  ArrowUpZA,
  ChevronLeft,
  ChevronRight,
  Eye,
  FilePenLine,
  Search,
  Trash2,
} from "lucide-react";
import type { User } from "../../../api/modules/user";
import type { Project } from "../../../api/modules/Projects";
import NoData from "../../Shared/NoData/NoData";
import TableSkeleton from "../../Shared/TableSkeleton/TableSkeleton";
// "../../Modules/Shared/NoData/NoData";

interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  employee: User;
  project: Project;
  creationDate: string;
}
// https://upskilling-egypt.com:3003/api/v1/Task/manager
export default function Projects() {
  const [projects, setProjects] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await Tasks.getAllTasks({
        pageNumber: currentPage,
        pageSize: pageSize,
        search: searchTerm,
      });
      console.log("API Response:", response.data.data);

      setProjects(response.data.data);
      setTotalResults(response.data.totalNumberOfRecords || 0);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await ProjectsApi.deleteProject(id);
      setProjects(projects.filter((p) => p.id !== id));
      setOpenMenu(null);
    } catch (err) {
      console.error("Error deleting project:", err);
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

  const filteredProjects = searchTerm
    ? projects.filter((project) =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : projects;
  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProjects();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm, currentPage, pageSize]);

  return (
    <>
      <div className="flex justify-between items-center mt-2 mb-10 py-4 px-2 md:px-9.5 bg-white dark:bg-gray-950 ">
        <h1>Tasks</h1>
        <div
          className="shrink mt-[-1rem]"
          onClick={() => navigate("/dashboard/add-task")}
        >
          <CustomButton text=" + add Task " />
        </div>
      </div>
      <div className="table-wrapper">
        <div className="search-filter-container">
          <div className="search-wrapper  ">
            <span className="search-icon">
              <Search size={20} strokeWidth={1.75} />
            </span>
            <input
              type="text"
              placeholder="Search By Title"
              className="search-input"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
        </div>
        {loading ? (
          <TableSkeleton />
        ) : (
          <>
            <div className="table-container">
              <table className="data-table">
                <thead>
                  <tr className="bg-emerald-800 text-white dark:bg-gray-700">
                    <th className="flex gap-1 items-center ">
                      Title{" "}
                      <ArrowUpZA
                        size={20}
                        strokeWidth={1.5}
                        absoluteStrokeWidth
                      />
                    </th>
                    <th>Description</th>
                    <th>Status</th>
                    <th>User</th>
                    <th>Project</th>
                    <th>Date Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  
                  {filteredProjects.length > 0 ? (
                  filteredProjects.map((task) => (
                    <tr key={task?.id} className="table-row dark:bg-taupe-900">
                      <td className="">{task.title}</td>
                      <td className="">{task?.description}</td>
                      <td>
                        <span className="status-badge bg-emerald-800 text-white dark:bg-gray-700">{task.status}</span>
                      </td>
                      <td className="">{task.employee?.userName}</td>
                      <td className="">{task?.project?.title}</td>
                      <td className="">
                        {new Date(task.creationDate).toLocaleDateString()}
                      </td>
                      <td className="actions-cell">
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
                            <div className="actions-menu  bg-amber-50  dark:bg-gray-400">
                              <button className="action-btn view-btn  dark:text-gray-700 ">
                                <Eye
                                  color="var(--bg-main-color)"
                                  size={20}
                                  strokeWidth={1.5}
                                  absoluteStrokeWidth
                                />{" "}
                                View
                              </button>
                              <button
                                className="action-btn edit-btn dark:text-emerald-900"
                                onClick={() =>
                                  navigate(
                                    `/dashboard/edit-task/${task?.id}`,
                                  )
                                }
                              >
                                <FilePenLine
                                  color="var(--bg-main-color)"
                                  size={20}
                                  strokeWidth={1.5}
                                  absoluteStrokeWidth
                                />{" "}
                                Edit
                              </button>
                              <button
                                className="action-btn delete-btn dark:text-black"
                                onClick={() => handleDelete(task.id)}
                              >
                                <Trash2
                                  color="var(--bg-main-color)"
                                  size={20}
                                  strokeWidth={1.5}
                                  absoluteStrokeWidth
                                />{" "}
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
                                        <td colSpan={6} className="text-center dark:text-black">
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
                  className="page-size-select bg-white dark:bg-black "
                >
                  <option className=" dark:text-gray-300" value={5}>
                    5
                  </option>
                  <option className=" dark:text-gray-300" value={10}>
                    10
                  </option>
                  <option className=" dark:text-gray-300" value={15}>
                    15
                  </option>
                  <option className=" dark:text-gray-300" value={20}>
                    20
                  </option>
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
                  />{" "}
                </button>
                <button
                  className="page-btn"
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
      </div>
    </>
  );
}
