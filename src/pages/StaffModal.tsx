import img from "../assets/react.svg";

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const StaffModal: React.FC<StaffModalProps> = ({ isOpen, onClose }) => {
  return (
    <div className={`staff-modal ${isOpen ? "open" : ""}`}>
      <div className="staff-modal-content">
        <div className="staff-modal-header">
          <button className="confirm-btn-2" onClick={onClose}>Xong</button>
        </div>
        <h3 className="title">Nhân sự (4)</h3>
        <p className="subtitle">Nhân sự chưa có phòng ban sẽ hiển thị dưới đây</p>
        <div className="staff-list">
          {[
            { name: "Harriett Butler", role: "Cán bộ quản lý" },
            { name: "Melania Antoshin", role: "Cán bộ quản lý" },
            { name: "Ky Kellaway", role: "Cán bộ quản lý" },
            { name: "Persis Canon", role: "Phó phòng", highlight: true },
          ].map((staff, index) => (
            <div className="staff-item" key={index}>
              <img src={img} alt={staff.name} className="staff-avatar" />
              <div className="staff-info">
                <span className="staff-name">{staff.name}</span>
                <span className={`staff-role ${staff.highlight ? "highlight" : ""}`}>
                  {staff.role}
                </span>
              </div>
              <button className="add-btn">+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
