import React, { useState } from "react";
 interface DepartmentProps {
   isOpen: boolean;
   onClose: () => void;
 }
 
 const Department: React.FC<DepartmentProps> = ({ isOpen, onClose }) => {
   const [newRole, setNewRole] = useState("");
   const [isManager, setIsManager] = useState(false);
 
   return (
     <>
       {/* Overlay */}
       <div className={`overlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>
 
       {/* Modal */}
       <div className={`modal ${isOpen ? "open" : ""}`}>
         <div className="modal-content">
           <div className="modal-header">
             <p className="modal-text">Tạo phòng ban</p>
             <button className="close-text" onClick={onClose}>Đóng lại</button>
           </div>
           <div className="modal-body">
             <label className="input-label">
               <span>Tên phòng ban</span> <span className="required"> *</span>
               <input
                 type="text"
                 value={newRole}
                 onChange={(e) => setNewRole(e.target.value)}
                 placeholder="Nhập tên phòng ban(ví dụ: Phòng kinh doanh)"
                 className="input-field"
               />
             </label>
             <label className="input-label">
               <span>Mã phòng ban</span> <span className="required"> *</span>
               <input
                 type="text"
                 value={newRole}
                 onChange={(e) => setNewRole(e.target.value)}
                 placeholder="Nhập mã phòng ban(ví dụ: KINHDOANH)"
                 className="input-field"
               />
             </label>
             <div className="checkbox-group">
               <input
                 className="box"
                 type="checkbox"
                 id="isManager"
                 checked={isManager}
                 onChange={(e) => setIsManager(e.target.checked)}
               />
               <label style={{color: "black"}} htmlFor="isManager">Xác nhận chức vụ này là cấp quản lý</label>
             </div>
           </div>
           <div className="modal-footer">
             <button className="confirm-btn">Xác nhận</button>
           </div>
         </div>
       </div>
     </>
   );
 };
 
 export default Department;