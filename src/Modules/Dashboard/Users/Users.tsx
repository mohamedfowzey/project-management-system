import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CustomButton from "../../Shared/CustomButton/CustomButton";
import {
  ArrowUpZA,
  ChevronLeft,
  ChevronRight,
  Eye,
  FilePenLine,
  Search,
} from "lucide-react";
import TableSkeleton from "../../Shared/TableSkeleton/TableSkeleton";
import NoData from "../../Shared/NoData/NoData";
import { UsersApi } from "../../../api/index";
import type { User } from "../../../api/modules/user";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  const navigate = useNavigate();

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await UsersApi.getUsers({
        pageNumber: currentPage,
        pageSize: pageSize,
      });

      console.log("API Response:", response.data.data);

      setUsers(response?.data?.data || []);
      setTotalResults(response.data.totalNumberOfRecords || 0);
    } catch (error) {
      console.error("Error fetching projects:", error);
    } finally {
      setLoading(false);
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

  const filteredUsers = searchTerm
    ? users.filter((user) =>
        user.userName?.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    : users;

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm, currentPage, pageSize]);

  return (
    <>
      <div className="flex justify-between items-center mt-2 mb-10 py-4 px-2 md:px-9.5 bg-white dark:bg-gray-950 ">
        <h1>Users</h1>
        <div
          className="shrink "
          onClick={() => navigate("/dashboard/add-user")}
        >
          <CustomButton text=" + add user " />
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
              className="search-input dark:text-white"
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
                      User Name{" "}
                      <ArrowUpZA
                        size={20}
                        strokeWidth={1.5}
                        absoluteStrokeWidth
                      />
                    </th>
                    <th>Status</th>
                    <th>phone Number</th>
                    <th>Email</th>
                    <th>Date Created</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user?.id}
                        className="table-row dark:bg-taupe-900"
                      >
                        <td>{user?.userName}</td>
                        <td>
                          <span className="status-badge bg-emerald-800 text-white dark:bg-gray-700">
                            {user?.isActivated ? "Active" : "Not Active"}
                          </span>
                        </td>
                        <td>{user?.phoneNumber}</td>
                        <td>{user?.email}</td>
                        <td>
                          {new Date(user.creationDate).toLocaleDateString()}
                        </td>
                        <td className="actions-cell">
                          <div className="actions-wrapper">
                            <button
                              className="menu-btn"
                              onClick={() =>
                                setOpenMenu(
                                  openMenu === user.id ? null : user.id,
                                )
                              }
                            >
                              ⋮
                            </button>
                            {openMenu === user.id && (
                              <div className="actions-menu bg-amber-50  dark:bg-gray-400 ">
                                <button className="action-btn view-btn  dark:text-gray-700 ">
                                  <Eye
                                    color="var(--bg-main-color)"
                                    size={20}
                                    strokeWidth={1.5}
                                    absoluteStrokeWidth
                                  />{" "}
                                  View
                                </button>
                                <button className="action-btn block-btn  dark:text-emerald-900">
                                  <FilePenLine
                                    color="var(--bg-main-color)"
                                    size={20}
                                    strokeWidth={1.5}
                                    absoluteStrokeWidth
                                  />{" "}
                                  Block
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

            <div className="pagination ">
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
    </>
  );
}
