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
  const [hasStaff, setHasStaff] = useState(false);

  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff[]>([]);

  const handleOpenStaffModal = () => {
    setIsStaffModalOpen(true);
    setIsButtonClicked(true);
  };

  const handleAddStaff = (staff: Staff) => {
    if (!selectedStaff.some((s) => s.name === staff.name)) {
      setSelectedStaff((prev) => [...prev, staff]);
      setHasStaff(true); // Cập nhật trạng thái khi thêm nhân sự
    }
  };
  const handleCloseStaffModal = () => {
    setIsStaffModalOpen(false);
    if (selectedStaff.length > 0) {
      setHasStaff(true); // Hiển thị giao diện có nhân sự
    }
    setTimeout(() => setIsButtonClicked(false), 300);
  };

  const handleClose = () => {
    if (!isStaffModalOpen) {
      setSelectedStaff([]); // Reset danh sách khi đóng modal 1
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
                        <tr key={index} className="staff-row">
                          <td>
                            <input type="checkbox" className="staff-checkbox" />
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
                            <span className="status-indicator"></span> Hoạt động
                          </td>
                        </tr>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default View;
