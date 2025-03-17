import { useState } from "react";
import { FaTrash, FaPlus, FaSearch, FaPen } from "react-icons/fa";
import { BiSolidCarousel } from "react-icons/bi";
import { IoFilterSharp } from "react-icons/io5";
import RoleModal from "./RoleModal";
import Department from "./Department";
import DepartmentUpdate from "./DepartmentUpdate";
import DeleteConfirmModal from "./DepartmentDelete";
import View from "./View";
const departments = [
  { id: 1, name: "Phòng kinh doanh", count: 8 },
  { id: 2, name: "Phòng công nghệ", count: 4 },
  { id: 3, name: "Phòng sản xuất", count: 10 },
  { id: 4, name: "Phòng thiết kế", count: 6 },
  { id: 5, name: "Phòng nhân sự", count: 11 },
];

const roles = ["Trưởng phòng", "Phó phòng", "Nhân viên", "Phó Giám Đốc"];
const rowsPerPageOptions = [5, 10, 15];

const DepartmentManagement = () => {
  const [isSorted, setIsSorted] = useState(false);
  const [isView, setIsView] = useState(false);
  const [viewDepartment, setViewDepartment] = useState<string | null>(null);
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false);
  const [isDepartmentUpdate, setIsDepartmentUpdate] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<string>("");
  const [isDepartment, setIsDepartment] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedRole, setSelectedRole] = useState<number | null>(null);
  const sortedDepartments = isSorted
    ? [...departments].sort((a, b) => a.name.localeCompare(b.name))
    : departments;

  const totalPages = Math.ceil(departments.length / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const displayedDepartments = sortedDepartments.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handleDeleteClick = (deptName: string) => {
    setSelectedDepartment(deptName);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    console.log(`Xóa phòng ban: ${selectedDepartment}`);
    setIsDeleteModalOpen(false);
  };

  const handleRoleClick = (index: number) => {
    setSelectedRole(index === selectedRole ? null : index);
  };

  return (
    <div className="department-management">
      <div className="header-1">
        <h2>QUẢN LÝ PHÒNG BAN</h2>
        <div className="header-right">
          <div className="search-bar">
            <FaSearch className="search-icon" />
            <input type="text" placeholder="Tìm kiếm phòng ban..." />
          </div>
          <button className="create-btn" onClick={() => setIsDepartment(true)}>
            <FaPlus /> Tạo mới
          </button>
        </div>
      </div>

      <div className="content">
        <div className="table-container">
          <table>
            <thead>
              <tr>
                <th className="no-column">No.</th>
                <th className="name-column">Tên phòng ban</th>
                <th className="count-column">Số nhân sự</th>
                <th className="action-column">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {displayedDepartments.map((dept, index) => (
                <tr key={dept.id}>
                  <td>{startIndex + index + 1}</td>
                  <td>{dept.name}</td>
                  <td>{dept.count}</td>
                  <td className="actions">
                    <BiSolidCarousel
                      className="status-icon"
                      onClick={() => {
                        setViewDepartment(dept.name);
                        setIsView(true);
                      }}
                    />

                    <FaPen
                      className="edit-icon"
                      onClick={() => setIsDepartmentUpdate(true)}
                    />
                    <FaTrash
                      className="delete-icon"
                      onClick={() => handleDeleteClick(dept.name)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button
              className="filter-btn"
              onClick={() => setIsSorted(!isSorted)}
            >
              <IoFilterSharp /> Bộ lọc
            </button>

            <div className="rows-per-page">
              <label>Số dòng hiển thị</label>
              <select
                value={rowsPerPage}
                onChange={(e) => setRowsPerPage(Number(e.target.value))}
              >
                {rowsPerPageOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="page-controls">
              <button
                onClick={() => setCurrentPage(1)}
                disabled={currentPage === 1}
              >
                «
              </button>
              <button
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                ‹
              </button>
              <span>
                {currentPage} / {totalPages}
              </span>
              <button
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                disabled={currentPage === totalPages}
              >
                ›
              </button>
              <button
                onClick={() => setCurrentPage(totalPages)}
                disabled={currentPage === totalPages}
              >
                »
              </button>
            </div>
          </div>
        </div>
        <div className="role-container">
          <button
            className="create-role"
            onClick={() => setIsRoleModalOpen(true)}
          >
            + Tạo chức vụ
          </button>
          <ul>
            {roles.map((role, index) => (
              <li key={index}>
                <button
                  className="role-item"
                  onClick={() => handleRoleClick(index)}
                >
                  <span
                    className={`dot ${
                      selectedRole === index ? "inactive" : "active"
                    }`}
                  ></span>
                  <span className="role-name">{role}</span>
                  <span className="remove">✖</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
        <RoleModal
          isOpen={isRoleModalOpen}
          onClose={() => setIsRoleModalOpen(false)}
        />
        <Department
          isOpen={isDepartment}
          onClose={() => setIsDepartment(false)}
        />
        <DepartmentUpdate
          isOpen={isDepartmentUpdate}
          onClose={() => setIsDepartmentUpdate(false)}
        />
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          departmentName={selectedDepartment}
        />
        <View
          isOpen={isView}
          departmentName={viewDepartment}
          onClose={() => {
            setIsView(false);
            setViewDepartment(null);
          }}
        />
      </div>
    </div>
  );
};

export default DepartmentManagement;
