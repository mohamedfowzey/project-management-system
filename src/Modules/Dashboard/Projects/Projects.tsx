import { jwtDecode } from "jwt-decode";
import {
  ArrowDownZA,
  ArrowUpZA,
  ChevronLeft,
  ChevronRight,
  Eye,
  FilePenLine,
  Search,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ProjectsApi } from "../../../api";
import { getEmployeeProjects } from "../../../api/modules/Projects";
import type { User } from "../../../api/modules/user";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import DeleteConfirm from "../../Shared/DeleteConfirm/DeleteConfirm";
import NoData from "../../Shared/NoData/NoData";
import OnlyAdmins from "../../Shared/OnlyAdmins/OnlyAdmins";
import ProjectViewModal from "../../Shared/ProjectViewModal/ProjectViewModal";
import TableSkeleton from "../../Shared/TableSkeleton/TableSkeleton";

interface Project {
  id: number;
  title: string;
  status: boolean;
  numUsers: number;
  numTasks: number;
  dateCreated: string;
  creationDate: string;
  modificationDate: string;
  description: string;

  manager: {
    isActivated: boolean;
    userName: string;
    country: string;
    email: string;
    phoneNumber: string;
    imagPath: string;
  };

  task?: {
    status: string;
    title: string;
    id: number;
  }[];
}

export default function Projects() {
  const [sorting, setSorting] = useState<"asc" | "desc">("asc");

  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  // Filters
  const [showFilters, setShowFilters] = useState(false);

  const [filterTitle, setFilterTitle] = useState("");
  const [filterDescription, setFilterDescription] = useState("");

  const userData = jwtDecode<User>(localStorage.getItem("token") || "");

  const navigate = useNavigate();

  const fetchProjects = async () => {
    try {
      setLoading(true);

      let response;

      if (userData?.userGroup === "Employee") {
        response = await getEmployeeProjects({
          pageNumber: currentPage,
          pageSize: pageSize,
          search: searchTerm,
        });
      } else {
        response = await ProjectsApi.getManagerProjects({
          pageNumber: currentPage,
          pageSize: pageSize,
          search: searchTerm,
        });
      }

      setProjects(response.data.data || []);
      setTotalResults(response.data.totalNumberOfRecords || 0);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Modal
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const confirmDelete = async (id: number) => {
    try {
      await ProjectsApi.deleteProject(id);

      setProjects(projects.filter((p) => p.id !== id));

      setIsDeleteOpen(false);
    } catch (err) {
      console.error("Error deleting project:", err);
    }
  };

  const handleOpenDelete = (project: Project) => {
    setSelectedProject(project);
    setIsDeleteOpen(true);
    setOpenMenu(null);
  };

  // View Modal
  const [isOpen, setIsOpen] = useState(false);

  const handleView = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
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

  const filteredProjects = projects.filter((project) => {
    const matchesSearch = project.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesTitle = project.title
      .toLowerCase()
      .includes(filterTitle.toLowerCase());

    const matchesDescription = project.description
      ?.toLowerCase()
      .includes(filterDescription.toLowerCase());

    return matchesSearch && matchesTitle && matchesDescription;
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchProjects();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm, currentPage, pageSize]);

  return (
    <>
      <div className="flex justify-between items-center mb-10 py-4 px-2 md:px-9.5 bg-white dark:bg-gray-950">
        <h1 className="text-3xl font-semibold">Projects</h1>

       <OnlyAdmins>
         <div
          className="shrink"
          onClick={() => navigate("/dashboard/add-project")}
        >
          <CustomButton text=" + add project " />
        </div>
       </OnlyAdmins>
      </div>

      <div className="table-wrapper">
        {/* Search + Filter */}
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
                setFilterDescription("");
              }

              setShowFilters(!showFilters);
            }}
            className={`hidden md:flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all cursor-pointer ${
              showFilters
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
              {/* Desktop Table */}
              <table className="data-table hidden md:table w-full border-collapse">
                <thead className="sticky top-0">
                  <tr className="bg-emerald-800 text-white dark:bg-gray-700">
                    {/* Title */}
                    <th className="p-3 text-left align-top min-w-45">
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

                    {/* Description */}
                    <th className="p-3 text-left align-top min-w-55">
                      <div className="font-semibold mb-2">Description</div>

                      {showFilters && (
                        <input
                          type="text"
                          placeholder="Filter description..."
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterDescription}
                          onChange={(e) => setFilterDescription(e.target.value)}
                        />
                      )}
                    </th>

                    {/* Date */}
                    <th className="p-3 text-left align-top min-w-35">
                      <div className="font-semibold mb-2">Date Created</div>

                      {showFilters && <div className="h-6"></div>}
                    </th>

                    {/* Actions */}
                    <th className="p-3 w-15 align-top">
                      <div className="mb-2">&nbsp;</div>

                      {showFilters && <div className="h-6"></div>}
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {filteredProjects.length > 0 ? (
                    filteredProjects.sort(sorting=='asc'?(a,b)=>a.title.localeCompare(b.title):(a,b)=>b.title.localeCompare(a.title)).map((project) => (
                      <tr
                        key={project?.id}
                        className="table-row "
                      >
                        <td>{project.title}</td>

                        <td>{project.description}</td>

                        <td>
                          {new Date(project.creationDate).toLocaleDateString()}
                        </td>

                        <td className="actions-cell">
                          <div className="actions-wrapper">
                            <button
                              className="menu-btn"
                              onClick={() =>
                                setOpenMenu(
                                  openMenu === project.id ? null : project.id,
                                )
                              }
                            >
                              ⋮
                            </button>

                            {openMenu === project.id && (
                              <div className="actions-menu bg-amber-50 dark:bg-gray-400 overflow-hidden">
                                <button
                                  onClick={() => {
                                    handleView(project);
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

                                <OnlyAdmins>
                                  <button
                                    className="action-btn edit-btn dark:text-emerald-900"
                                    onClick={() =>
                                      navigate(
                                        `/dashboard/edit-project/${project?.id}`,
                                      )
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
                                    className="action-btn delete-btn dark:text-red-900"
                                    onClick={() => handleOpenDelete(project)}
                                  >
                                    <Trash2
                                      size={20}
                                      strokeWidth={1.5}
                                      absoluteStrokeWidth
                                    />
                                    Delete
                                  </button>
                                </OnlyAdmins>
                              </div>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan={6}
                        className="text-center dark:text-black py-4"
                      >
                        <NoData />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>

              {/* Mobile Cards */}
              <div className="grid gap-4 md:hidden">
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <div
                      key={project.id}
                      className="rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-4 space-y-4"
                    >
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h2 className="text-lg font-semibold wrap-break-word">
                            {project.title}
                          </h2>

                          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 wrap-break-word">
                            {project.description}
                          </p>
                        </div>

                        <div className="relative ml-3">
                          <button
                            className="menu-btn"
                            onClick={() =>
                              setOpenMenu(
                                openMenu === project.id ? null : project.id,
                              )
                            }
                          >
                            ⋮
                          </button>

                          {openMenu === project.id && (
                            <div className="actions-menu bg-amber-50 dark:bg-gray-400 right-0">
                              <button
                                onClick={() => {
                                  handleView(project);
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
                                  navigate(
                                    `/dashboard/edit-project/${project?.id}`,
                                  )
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
                                className="action-btn delete-btn dark:text-red-900"
                                onClick={() => handleOpenDelete(project)}
                              >
                                <Trash2
                                  size={20}
                                  strokeWidth={1.5}
                                  absoluteStrokeWidth
                                />
                                Delete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>

                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {new Date(project.creationDate).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  ))
                ) : (
                  <NoData />
                )}
              </div>
            </div>

            {/* Pagination */}
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
      </div>

      {/* View Modal */}
      {selectedProject && (
        <ProjectViewModal
          project={selectedProject}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}

      {/* Delete Modal */}
      {selectedProject && (
        <DeleteConfirm
          isOpen={isDeleteOpen}
          setIsOpen={setIsDeleteOpen}
          onConfirm={() => confirmDelete(selectedProject.id)}
          title="Delete Project?"
          confirmText="Yes, Delete Permanently"
          variant="danger"
          description={
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              You are about to delete the project <br />
              <span className="font-bold text-red-600 dark:text-red-400 text-lg">
                "{selectedProject.title}"
              </span>
            </p>
          }
        />
      )}
    </>
  );
}
