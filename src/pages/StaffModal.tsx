import img from "../assets/react.svg";

interface Staff {
  name: string;
  role: string;
  highlight?: boolean;
}

interface StaffModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddStaff: (staff: Staff) => void;
}

const StaffModal: React.FC<StaffModalProps> = ({ isOpen, onClose, onAddStaff }) => {
  const staffList = [
    { name: "Harriett Butler", role: "Cán bộ quản lý" },
    { name: "Melania Antoshin", role: "Cán bộ quản lý" },
    { name: "Ky Kellaway", role: "Cán bộ quản lý" },
    { name: "Persis Canon", role: "Phó phòng", highlight: true },
  ];

  return (
    <div className={`staff-modal ${isOpen ? "open" : ""}`}>
      <div className="staff-modal-content">
        <div className="staff-modal-header">
          <button className="confirm-btn-2" onClick={onClose}>Xong</button>
        </div>
        <h3 className="title-1">Nhân sự ({staffList.length})</h3>
        <p className="subtitle">Nhân sự chưa có phòng ban sẽ hiển thị dưới đây</p>
        <div className="staff-list">
          {staffList.map((staff, index) => (
            <div className="staff-item" key={index}>
              <img src={img} alt={staff.name} className="staff-avatar" />
              <div className="staff-info">
                <span className="staff-name">{staff.name}</span>
                <span className={`staff-role ${staff.highlight ? "highlight" : ""}`}>
                  {staff.role}
                </span>
              </div>
              <button className="add-btn" onClick={() => onAddStaff(staff)}>+</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StaffModal;
