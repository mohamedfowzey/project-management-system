import { useState, useEffect } from "react";

import {
  ArrowUpZA,
  ChevronLeft,
  ChevronRight,
  Eye,
  Search,
  ShieldAlert,
  SlidersHorizontal,
} from "lucide-react";

import TableSkeleton from "../../Shared/TableSkeleton/TableSkeleton";
import NoData from "../../Shared/NoData/NoData";
import { UsersApi } from "../../../api/index";
import type { User } from "../../../api/modules/user";
import UserViewModal from "../../Shared/UserViewModal/UserViewModal";
import DeleteConfirm from "../../Shared/DeleteConfirm/DeleteConfirm";

export default function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [openMenu, setOpenMenu] = useState<number | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [totalResults, setTotalResults] = useState(0);

  // Filters
  const [showFilters, setShowFilters] = useState(false);
  const [filterUserName, setFilterUserName] = useState("");

  const [filterStatus, setFilterStatus] = useState("");
  const [filterEmail, setFilterEmail] = useState("");
  const [filterPhone, setFilterPhone] = useState("");

  const [isBlockUserOpen, setIsBlockUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const response = await UsersApi.getUsers({
        pageNumber: currentPage,
        pageSize: pageSize,
      });

      setUsers(response?.data?.data || []);
      setTotalResults(response.data.totalNumberOfRecords || 0);
    } catch (error) {
      console.error("Error fetching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleOpenBlockModal = (user: User) => {
    setSelectedUser(user);
    setIsBlockUserOpen(true);
    setOpenMenu(null);
  };

  const handleConfirmToggleStatus = async () => {
    if (!selectedUser) return;

    try {
      const response = await UsersApi.toggleActivatedEmployee(selectedUser.id);

      const updatedStatus = response?.data?.isActivated;

      setUsers((prevUsers) =>
        prevUsers.map((u) =>
          u.id === selectedUser.id ? { ...u, isActivated: updatedStatus } : u,
        ),
      );

      setIsBlockUserOpen(false);
    } catch (err) {
      console.error("Error toggling user status:", err);
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

  const filteredUsers = users.filter((user) => {
    const matchesSearch = user.userName
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesUserName = user.userName
      .toLowerCase()
      .includes(filterUserName.toLowerCase());

    const matchesStatus = filterStatus
      ? filterStatus === "active"
        ? user.isActivated
        : !user.isActivated
      : true;

    const matchesEmail = user.email
      ?.toLowerCase()
      .includes(filterEmail.toLowerCase());

    const matchesPhone = user.phoneNumber
      ?.toLowerCase()
      .includes(filterPhone.toLowerCase());

    return (
      matchesSearch &&
      matchesUserName &&
      matchesStatus &&
      matchesEmail &&
      matchesPhone
    );
  });

  useEffect(() => {
    const delay = setTimeout(() => {
      fetchUsers();
    }, 500);

    return () => clearTimeout(delay);
  }, [searchTerm, currentPage, pageSize]);

  // Modal View
  const [isOpen, setIsOpen] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<User | null>(null);

  const handleView = (user: User) => {
    setSelectedUsers(user);
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex mb-10 py-6 px-2 md:px-9.5 bg-white dark:bg-gray-950">
        <h1 className="text-3xl font-semibold">Users</h1>
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
              placeholder="Search By User Name..."
              className="w-full pl-10 pr-4 py-2 text-sm rounded-full border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-900 dark:text-white transition-all"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <button
            onClick={() => {
              if (showFilters) {
                setFilterStatus("");
                setFilterEmail("");
                setFilterPhone("");
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
              <table className="data-table w-full border-collapse">
                <thead className="hidden md:table-header-group">
                  <tr className="bg-emerald-800 text-white dark:bg-gray-700">
                    {/* Username */}
                    <th className="p-3 text-left align-top min-w-[160px]">
                      <div className="flex gap-1 items-center font-semibold mb-2">
                        User Name
                        <ArrowUpZA size={16} strokeWidth={1.5} />
                      </div>

                      {showFilters && (
                        <input
                          type="text"
                          placeholder="Filter title..."
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterUserName}
                          onChange={(e) => setFilterUserName(e.target.value)}
                        />
                      )}
                    </th>

                    {/* Status */}
                    <th className="p-3 text-left align-top min-w-[160px]">
                      <div className="font-semibold mb-2">Status</div>

                      {showFilters && (
                        <select
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterStatus}
                          onChange={(e) => setFilterStatus(e.target.value)}
                        >
                          <option value="">All</option>
                          <option value="active">Activated</option>
                          <option value="inactive">Not Activated</option>
                        </select>
                      )}
                    </th>

                    {/* Phone */}
                    <th className="p-3 text-left align-top min-w-[160px]">
                      <div className="font-semibold mb-2">Phone Number</div>

                      {showFilters && (
                        <input
                          type="text"
                          placeholder="Filter phone..."
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterPhone}
                          onChange={(e) => setFilterPhone(e.target.value)}
                        />
                      )}
                    </th>

                    {/* Email */}
                    <th className="p-3 text-left align-top min-w-[180px]">
                      <div className="font-semibold mb-2">Email</div>

                      {showFilters && (
                        <input
                          type="text"
                          placeholder="Filter email..."
                          className="w-full px-2 py-1 text-xs font-normal rounded border border-emerald-700 bg-white text-gray-900 dark:bg-gray-800 dark:border-gray-600 dark:text-white focus:outline-none focus:ring-1 focus:ring-emerald-400"
                          value={filterEmail}
                          onChange={(e) => setFilterEmail(e.target.value)}
                        />
                      )}
                    </th>

                    {/* Date */}
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
                  {filteredUsers.length > 0 ? (
                    filteredUsers.map((user) => (
                      <tr
                        key={user?.id}
                        className="block md:table-row mb-4 md:mb-0 rounded-2xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm p-4 md:p-0"
                      >
                        <td
                          data-label="User Name"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          {user?.userName}
                        </td>

                        <td
                          data-label="Status"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          <span
                            className={`inline-flex items-center px-3 py-2 rounded-full text-xs font-bold ${
                              user?.isActivated
                                ? "bg-green-50 text-green-700 dark:bg-green-900/20 dark:text-green-400"
                                : "bg-red-50 text-red-700 dark:bg-red-900/20 dark:text-red-400"
                            }`}
                          >
                            {user?.isActivated ? "Activated" : "Not Activated"}
                          </span>
                        </td>

                        <td
                          data-label="Phone"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          {user?.phoneNumber}
                        </td>

                        <td
                          data-label="Email"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 break-all before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          {user?.email}
                        </td>

                        <td
                          data-label="Date"
                          className="flex justify-between items-center md:table-cell py-2 md:py-4 p-3 before:content-[attr(data-label)] before:font-bold before:text-gray-500 md:before:content-none"
                        >
                          {user?.task &&
                            new Date(
                              user?.task[0]?.creationDate,
                            ).toLocaleDateString()}
                        </td>

                        <td className="flex justify-end md:table-cell pt-4 md:pt-0 p-3">
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
                              <div className="actions-menu bg-amber-50 dark:bg-gray-400">
                                <button
                                  onClick={() => {
                                    handleView(user);
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
                                  onClick={() => handleOpenBlockModal(user)}
                                  className={`action-btn ${
                                    user?.isActivated
                                      ? "bg-red-700"
                                      : "bg-green-700"
                                  } text-amber-50`}
                                >
                                  <ShieldAlert
                                    size={20}
                                    strokeWidth={1.5}
                                    absoluteStrokeWidth
                                  />

                                  {user?.isActivated ? "Block" : "Activate"}
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
                        colSpan={6}
                        className="text-center dark:text-black py-4"
                      >
                        <NoData />
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
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

        <DeleteConfirm
          isOpen={isBlockUserOpen}
          setIsOpen={setIsBlockUserOpen}
          title={selectedUser?.isActivated ? "Block User?" : "Activate User?"}
          variant={selectedUser?.isActivated ? "danger" : "success"}
          icon={ShieldAlert}
          confirmText={
            selectedUser?.isActivated ? "Yes, Block User" : "Yes, Activate User"
          }
          warningText={
            selectedUser?.isActivated
              ? "This user will lose access immediately"
              : "This user will regain access immediately"
          }
          onConfirm={handleConfirmToggleStatus}
          description={
            <p>
              You are about to change access for <br />
              <span className="font-bold text-amber-600 dark:text-amber-400 text-lg">
                {selectedUser?.userName}
              </span>
            </p>
          }
        />
      </div>

      {selectedUsers && (
        <UserViewModal
          user={selectedUsers}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </>
  );
}
