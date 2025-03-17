import { useState } from "react";
import img from "../assets/image.webp";
import image from "../assets/react.svg";
import StaffModal from "./StaffModal";
import "../styles/view.scss";
import { FaSearch } from "react-icons/fa";
interface ViewProps {
  isOpen: boolean;
  onClose: () => void;
  departmentName: string | null;
}

interface Staff {
  name: string;
  role: string;
  highlight?: boolean;
}

const View: React.FC<ViewProps> = ({ isOpen, onClose, departmentName }) => {
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [selectedCheckboxes, setSelectedCheckboxes] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<{
    [key: string]: string | null;
  }>({});

  const [isRoleDropdownOpen, setIsRoleDropdownOpen] = useState(false);
  const [selectedRole, setSelectedRole] = useState("");
  const [isRemoveConfirmOpen, setIsRemoveConfirmOpen] = useState(false);
  const [staffToRemove, setStaffToRemove] = useState<string | null>(null);
  const handleRemoveStaff = (staffName: string) => {
    setSelectedStaff((prev) =>
      prev.filter((staff) => staff.name !== staffName)
    );
    setSelectedCheckboxes((prev) => prev.filter((name) => name !== staffName));
  };

  const handleCheckboxChange = (staffName: string) => {
    setSelectedCheckboxes((prev) =>
      prev.includes(staffName)
        ? prev.filter((name) => name !== staffName)
        : [...prev, staffName]
    );
  };

  const handleConfirmRemove = () => {
    if (staffToRemove) {
      setSelectedStaff((prev) =>
        prev.filter((staff) => staff.name !== staffToRemove)
      );
      setSelectedCheckboxes((prev) =>
        prev.filter((name) => name !== staffToRemove)
      );
      setStaffToRemove(null);
    }
    setIsRemoveConfirmOpen(false);
  };
  const handleCancelRemove = () => {
    setIsRemoveConfirmOpen(false);
    setStaffToRemove(null);
  };

  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState("");
  const handleOpenRemoveConfirm = (staffName: string) => {
    setStaffToRemove(staffName);
    setIsRemoveConfirmOpen(true);
  };

  const [hasStaff, setHasStaff] = useState(false);
  const [isDepartmentDropdownOpen, setIsDepartmentDropdownOpen] =
    useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const toggleRoleDropdown = () => {
    setIsRoleDropdownOpen(!isRoleDropdownOpen);
    setSelectedRole("");
  };
  const toggleUnitDropdown = () => {
    setIsUnitDropdownOpen(!isUnitDropdownOpen);
    setSelectedUnit("");
  };

  const handleConfirmUnitChange = () => {
    console.log("Chuyển sang đơn vị:", selectedUnit);
    setIsUnitDropdownOpen(false);
  };

  const handleConfirmRoleChange = () => {
    console.log("Chuyển sang chức vụ:", selectedRole);
    setIsRoleDropdownOpen(false);
  };

  const toggleDepartmentDropdown = () => {
    setIsDepartmentDropdownOpen(!isDepartmentDropdownOpen);
    setSelectedDepartment("");
  };

  const toggleDropdown = (
    staffName: string,
    type: "department" | "role" | "unit"
  ) => {
    setOpenDropdown((prev) => ({
      ...prev,
      [staffName]: prev[staffName] === type ? null : type,
    }));
  };
  const handleConfirmChange = (staffName: string) => {
    console.log(`Xác nhận thay đổi cho ${staffName}`);
    setOpenDropdown((prev) => ({ ...prev, [staffName]: null }));
  };

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff[]>([]);

  const handleOpenStaffModal = () => {
    setIsStaffModalOpen(true);
    setIsButtonClicked(true);
  };

  const handleAddStaff = (staff: Staff) => {
    if (!selectedStaff.some((s) => s.name === staff.name)) {
      setSelectedStaff((prev) => [...prev, staff]);
      setHasStaff(true);
    }
  };
  const handleCloseStaffModal = () => {
    setIsStaffModalOpen(false);
    if (selectedStaff.length > 0) {
      setHasStaff(true);
    }
    setTimeout(() => setIsButtonClicked(false), 300);
  };

  const handleClose = () => {
    if (!isStaffModalOpen) {
      setSelectedStaff([]);
      onClose();
    }
  };

  return (
    <>
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onClick={handleClose}
      ></div>

      <div
        className={`modal view-modal ${isStaffModalOpen ? "shift-left" : ""} ${
          isOpen ? "open" : ""
        }`}
      >
        <div className="modal-content">
          <div className="modal-header">
            <p className="modal-text">{departmentName}</p>
            <button className="close-text" onClick={handleClose}>
              Đóng lại
            </button>
          </div>
          <div className="modal-body-1">
            {hasStaff ? (
              <>
                <div className="staff-header">
                  <button className="staff-count">
                    Số nhân sự: {selectedStaff.length}
                  </button>
                  <div className="search-container-2">
                    <FaSearch className="search-icon-2" />
                    <input
                      type="text"
                      className="search-input-2"
                      placeholder="Tìm kiếm nhân sự..."
                    />
                  </div>
                </div>
                <div className="staff-table-container">
                  <table className="staff-table">
                    <thead>
                      <tr>
                        <th>Chọn</th>
                        <th>Ảnh</th>
                        <th>Họ và tên</th>
                        <th>Chức vụ</th>
                        <th>T.T Hoạt động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {selectedStaff.map((staff, index) => (
                        <>
                          <tr key={index} className="staff-row">
                            <td>
                              <input
                                type="checkbox"
                                className="staff-checkbox"
                                checked={selectedCheckboxes.includes(
                                  staff.name
                                )}
                                onChange={() =>
                                  handleCheckboxChange(staff.name)
                                }
                              />
                            </td>
                            <td>
                              <img
                                src={image}
                                alt={staff.name}
                                className="staff-avatar"
                              />
                            </td>
                            <td className="staff-name">{staff.name}</td>
                            <td className="staff-role">{staff.role}</td>
                            <td className="staff-status">
                              <span className="status-indicator"></span> Hoạt
                              động
                            </td>
                          </tr>

                          {selectedCheckboxes.includes(staff.name) && (
                            <tr className="staff-actions-row">
                              <td colSpan={5}>
                                <div className="staff-actions">
                                  <button
                                    className="change-department"
                                    onClick={() =>
                                      toggleDropdown(staff.name, "department")
                                    }
                                  >
                                    ➝ Đổi phòng ban
                                  </button>
                                  <button
                                    className="change-role"
                                    onClick={() =>
                                      toggleDropdown(staff.name, "role")
                                    }
                                  >
                                    🔄 Đổi chức vụ
                                  </button>
                                  <button
                                    className="change-unit"
                                    onClick={() =>
                                      toggleDropdown(staff.name, "unit")
                                    }
                                  >
                                    🔁 Đổi đơn vị
                                  </button>
                                  <button
                                    className="remove-staff"
                                    onClick={() =>
                                      handleOpenRemoveConfirm(staff.name)
                                    }
                                  >
                                    ❌ Xóa khỏi phòng ban
                                  </button>
                                </div>
                              </td>
                            </tr>
                          )}

                          {openDropdown[staff.name] === "department" && (
                            <tr className="dropdown-row">
                              <td colSpan={5}>
                                <div className="change-dropdown">
                                  <label>Đổi phòng ban</label>
                                  <select className="select-1">
                                    <option value="Kinh doanh">
                                      Phòng Kinh doanh
                                    </option>
                                    <option value="Nhân sự">
                                      Phòng Nhân sự
                                    </option>
                                    <option value="Sản xuất">
                                      Phòng Sản xuất
                                    </option>
                                  </select>
                                  <div className="dropdown-actions">
                                    <button
                                      className=""
                                      onClick={() =>
                                        setOpenDropdown({
                                          ...openDropdown,
                                          [staff.name]: null,
                                        })
                                      }
                                    >
                                      Hủy bỏ
                                    </button>
                                    <button
                                      className="confirm-btn-1"
                                      onClick={() =>
                                        handleConfirmChange(staff.name)
                                      }
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}

                          {/* Dropdown đổi chức vụ */}
                          {openDropdown[staff.name] === "role" && (
                            <tr className="dropdown-row">
                              <td colSpan={5}>
                                <div className="change-dropdown">
                                  <label>Đổi chức vụ</label>
                                  <select className="select-1">
                                    <option value="Đơn vị 1">Chức vụ 1</option>
                                    <option value="Đơn vị 2">Chức vụ 2</option>
                                    <option value="Đơn vị 3">Chức vụ 3</option>
                                  </select>
                                  <div className="dropdown-actions">
                                    <button
                                      onClick={() =>
                                        setOpenDropdown({
                                          ...openDropdown,
                                          [staff.name]: null,
                                        })
                                      }
                                    >
                                      Hủy bỏ
                                    </button>
                                    <button
                                      className="confirm-btn-1"
                                      onClick={() =>
                                        handleConfirmChange(staff.name)
                                      }
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}

                          {/* Dropdown đổi đơn vị */}
                          {openDropdown[staff.name] === "unit" && (
                            <tr className="dropdown-row">
                              <td colSpan={5}>
                                <div className="change-dropdown">
                                  <label>Đổi đơn vị</label>
                                  <select className="select-1">
                                    <option value="Đơn vị 1">Đơn vị 1</option>
                                    <option value="Đơn vị 2">Đơn vị 2</option>
                                    <option value="Đơn vị 3">Đơn vị 3</option>
                                  </select>
                                  <div className="dropdown-actions">
                                    <button
                                      onClick={() =>
                                        setOpenDropdown({
                                          ...openDropdown,
                                          [staff.name]: null,
                                        })
                                      }
                                    >
                                      Hủy bỏ
                                    </button>
                                    <button
                                      className="confirm-btn-1"
                                      onClick={() =>
                                        handleConfirmChange(staff.name)
                                      }
                                    >
                                      Xác nhận
                                    </button>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button
                  className="add-staff-btn"
                  onClick={handleOpenStaffModal}
                >
                  + Thêm nhân sự
                </button>
              </>
            ) : (
              <>
                <img src={img} className="empty-image" alt="React Logo" />
                <p style={{ color: "black" }}>
                  Không có nhân sự trong phòng này. Bạn muốn thêm nhân sự mới?
                </p>
                <button
                  className={`add-staff-btn-1 ${
                    isButtonClicked ? "clicked" : ""
                  }`}
                  onClick={handleOpenStaffModal}
                >
                  + Thêm nhân sự
                </button>
              </>
            )}
            <StaffModal
              isOpen={isStaffModalOpen}
              onClose={handleCloseStaffModal}
              onAddStaff={handleAddStaff}
            />
            {isDepartmentDropdownOpen && (
              <div className="change-department-1">
                <div className="change-department-dropdown show">
                  <label style={{ color: "black" }}>Đổi phòng ban</label>
                  <select
                    value={selectedDepartment}
                    onChange={(e) => setSelectedDepartment(e.target.value)}
                  >
                    <option value="Kinh doanh">Phòng Kinh doanh</option>
                    <option value="Nhân sự">Phòng Nhân sự</option>
                    <option value="Sản xuất">Phòng Sản xuất</option>
                  </select>
                  <div className="department-actions">
                    <button
                      className="cancel-btn-1"
                      onClick={() => setIsDepartmentDropdownOpen(false)}
                    >
                      Hủy bỏ
                    </button>
                    <button
                      className="confirm-btn-1"
                      onClick={handleConfirmUnitChange}
                      disabled={!selectedUnit}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            )}
            {isRemoveConfirmOpen && (
              <div className="remove-confirm">
                <p style={{ color: "black" }}>
                  Chắc chắn xóa người này khỏi phòng ban?
                </p>
                <div className="confirm-actions">
                  <button className="cancel-btn-3" onClick={handleCancelRemove}>
                    Hủy bỏ
                  </button>
                  <button
                    className="confirm-btn-3"
                    onClick={handleConfirmRemove}
                  >
                    Xác nhận
                  </button>
                </div>
              </div>
            )}

            {isUnitDropdownOpen && (
              <div className="change-department-1">
                <div className="change-department-dropdown show">
                  <label style={{ color: "black" }}>Đổi đơn vị</label>
                  <select
                    value={selectedUnit}
                    onChange={(e) => setSelectedUnit(e.target.value)}
                  >
                    <option value="Nhân 1">Đơn vị 1</option>
                    <option value="Nhân 2">Đơn vị 2</option>
                    <option value="Nhân 3">Đơn vị 3</option>
                  </select>
                  <div className="department-actions">
                    <button
                      className="cancel-btn-1"
                      onClick={() => setIsUnitDropdownOpen(false)}
                    >
                      Hủy bỏ
                    </button>
                    <button
                      className="confirm-btn-1"
                      onClick={handleConfirmUnitChange}
                      disabled={!selectedUnit}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            )}

            {isRoleDropdownOpen && (
              <div className="change-department-1">
                <div className="change-department-dropdown show">
                  <label style={{ color: "black" }}>Đổi chức vụ</label>
                  <select
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="Đơn vị 1">Cán bộ quản lý</option>
                    <option value="Đơn vị 2">Cán bộ quản lý 1</option>
                    <option value="Đơn vị 3">Cán bộ quản lý 2</option>
                  </select>
                  <div className="department-actions">
                    <button
                      className="cancel-btn-1"
                      onClick={() => setIsRoleDropdownOpen(false)}
                    >
                      Hủy bỏ
                    </button>
                    <button
                      className="confirm-btn-1"
                      onClick={handleConfirmRoleChange}
                      disabled={!selectedRole}
                    >
                      Xác nhận
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
