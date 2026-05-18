import { useState, useEffect } from "react";
import { ProjectsApi } from "../../../api";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import {
  ChevronLeft,
  ChevronRight,
  Eye,
  FilePenLine,
  Search,
  Trash2,
} from "lucide-react";

interface Project {
  id: number;
  title: string;
  status: string;
  numUsers: number;
  numTasks: number;
  creationDate: string;
  manager?: {
    country: string;
    phoneNumber: number;
  };
}
export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const navigate = useNavigate() 

  const fetchProjects = async () => {
    try {
      setLoading(true);

      const response = await ProjectsApi.getAllProjects({
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
    fetchProjects();
  }, [searchTerm, currentPage, pageSize]);

  return (
    <>
    <div className="flex justify-between items-center mt-2 mb-10 py-4 px-2 md:px-9.5 bg-white dark:bg-gray-950 ">
        <h1>Projects</h1>
        <div className="shrink mt-[-1rem]" onClick={()=>navigate('/dashboard/add-project')}>
    
        <CustomButton text=" + add project " />
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
        <div className=" text-center p-5">Loading...</div>
      ) : (
        <>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>phone Number</th>
                  <th>country</th>
                  <th>Date Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project?.id} className="table-row">
                      <td className=" dark:text-black ">{project.title}</td>
                      <td>
                        <span className="status-badge ">Public</span>
                      </td>
                      <td className=" dark:text-black ">
                        {project.manager?.phoneNumber}
                      </td>
                      <td className=" dark:text-black ">
                        {project?.manager?.country}
                      </td>
                      <td className=" dark:text-black ">
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
                            <div className="actions-menu">
                              <button className="action-btn view-btn  dark:text-black ">
                                <Eye
                                  color="var(--bg-main-color)"
                                  size={20}
                                  strokeWidth={1.5}
                                  absoluteStrokeWidth
                                />{" "}
                                View
                              </button>
                              <button className="action-btn edit-btn  dark:text-black" onClick={()=>navigate(`/dashboard/edit-project/${project?.id}`)}>
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
                                onClick={() => handleDelete(project.id)}
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
                      No projects found
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
                className="page-size-select"
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
                />{" "}
              </button>
              <button
                className="page-btn"
                onClick={handleNextPage}
                disabled={currentPage >= Math.ceil(totalResults / pageSize)}
              >
                <ChevronRight size={20} strokeWidth={1.5} absoluteStrokeWidth />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
    </>
  );
}
