import { useState } from "react";
import img from "../assets/image.webp";
import image from "../assets/react.svg";
import StaffModal from "./StaffModal";
import "../styles/view.scss";

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
  const [isButtonClicked, setIsButtonClicked] = useState(false);
  const [selectedStaff, setSelectedStaff] = useState<Staff[]>([]);

  const handleOpenStaffModal = () => {
    setIsStaffModalOpen(true);
    setIsButtonClicked(true);
  };

  const handleCloseStaffModal = () => {
    setIsStaffModalOpen(false);
    setTimeout(() => setIsButtonClicked(false), 300);
  };

  const handleClose = () => {
    if (!isStaffModalOpen) {
      setSelectedStaff([]); // Reset danh sách khi đóng modal 1
      onClose();
    }
  };

  const handleAddStaff = (staff: Staff) => {
    if (!selectedStaff.some((s) => s.name === staff.name)) {
      setSelectedStaff((prev) => [...prev, staff]);
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
            {selectedStaff.length === 0 ? (
              <>
                <img src={img} className="empty-image" alt="React Logo" />
                <p style={{ color: "black" }}>
                  Không có nhân sự trong phòng này. Bạn muốn thêm nhân sự mới?
                </p>
                <button
                  className={`add-staff-btn ${
                    isButtonClicked ? "clicked" : ""
                  }`}
                  onClick={handleOpenStaffModal}
                >
                  + Thêm nhân sự
                </button>
              </>
            ) : (
              <div className="staff-table-container">
                <table className="staff-table">
                  <thead >
                    <tr >
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
