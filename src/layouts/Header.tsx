import { FaBars, FaSearch, FaUserCircle, FaBell, FaSignOutAlt } from "react-icons/fa";

const Header = () => {
  return (
    <div className="header">
      <div className="search-box">
        <FaBars className="menu-icon" />
        <input type="text" placeholder="Nhập mã để tìm kiếm" />
        <FaSearch className="search-icon" />
      </div>
      <div className="user-info">
        <div className="user-text">
          <span className="user-name">Ngô Hoàng Kim Ngân</span>
          <span className="user-role">Quản lý hệ thống</span>
        </div>
        <FaUserCircle className="user-avatar" />
        <div className="notification">
          <FaBell className="bell-icon" />
          <span className="badge">3</span>
        </div>
        <FaSignOutAlt className="logout-icon" />
      </div>
    </div>
  );
};

export default Header;
