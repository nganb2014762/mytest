import { useState } from "react";
import img from "../assets/image.webp";
import StaffModal from "./StaffModal";
import "../styles/view.scss";
interface ViewProps {
  isOpen: boolean;
  onClose: () => void;
  departmentName: string | null;
}

const View: React.FC<ViewProps> = ({ isOpen, onClose, departmentName }) => {
  const [isStaffModalOpen, setIsStaffModalOpen] = useState(false);
  const [isButtonClicked, setIsButtonClicked] = useState(false);

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
            <img src={img} className="empty-image" alt="React Logo" />
            <p style={{ color: "black" }}>
              Không có nhân sự trong phòng này. Bạn muốn thêm nhân sự mới?
            </p>
            <button
              className={`add-staff-btn ${isButtonClicked ? "clicked" : ""}`}
              onClick={handleOpenStaffModal}
            >
              + Thêm nhân sự
            </button>
            <StaffModal isOpen={isStaffModalOpen} onClose={handleCloseStaffModal} />
          </div>
        </div>
      </div>
      
    </>
  );
};

export default View;
