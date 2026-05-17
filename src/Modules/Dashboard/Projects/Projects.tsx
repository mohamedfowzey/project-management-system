import  { useState, useEffect } from "react";
import { ProjectsApi } from "../../../api";
import { Search } from "lucide-react";

interface Project {
  id: number;
  title: string;
  status: string;
  numUsers: number;
  numTasks: number;
  dateCreated: string;
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

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
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch projects");
      console.error("Error fetching projects:", err);
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
  }, [currentPage, pageSize, searchTerm]);

  return (
    <div className="table-wrapper">
      <div className="search-filter-container">
        <div className="search-wrapper">
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

      {error && <div style={{ color: "red", padding: "10px" }}>{error}</div>}

      {loading ? (
        <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
      ) : (
        <>
          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Status</th>
                  <th>Num Users</th>
                  <th>Num Tasks</th>
                  <th>Date Created</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.length > 0 ? (
                  filteredProjects.map((project) => (
                    <tr key={project?.id} className="table-row">
                      <td>{project.title}</td>
                      <td>
                        <span className="status-badge">{project.status}</span>
                      </td>
                      <td>{project.numUsers}</td>
                      <td>{project.numTasks}</td>
                      <td>{project.dateCreated}</td>
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
                              <button className="action-btn view-btn">
                                View
                              </button>
                              <button className="action-btn edit-btn">
                                Edit
                              </button>
                              <button
                                className="action-btn delete-btn"
                                onClick={() => handleDelete(project.id)}
                              >
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
                    <td colSpan={6} style={{ textAlign: "center" }}>
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
              <span>
                Page {currentPage} of {Math.ceil(totalResults / pageSize)}
              </span>
            </div>
            <div className="pagination-controls">
              <button className="page-btn" onClick={handlePrevPage}>
                &lt;
              </button>
              <button className="page-btn" onClick={handleNextPage}>
                &gt;
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
