import React from "react";
import "../styles/departmentDelete.scss";
 interface DeleteConfirmModalProps {
   isOpen: boolean;
   onClose: () => void;
   onConfirm: () => void;
   departmentName: string;
 }
 
 const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
   isOpen,
   onClose,
   onConfirm,
   departmentName,
 }) => {
   if (!isOpen) return null;
 
   return (
     <div className="modal-overlay-1">
       <div className="modal-1">
         <button className="close-btn-1" onClick={onClose}>
           &times;
         </button>
         <p className="modal-text-1">Xóa phòng ban</p>
 
         <p style={{ color: "gray" }}>
           Bạn có chắc chắn muốn xóa phòng ban này không?
         </p>
         <strong style={{ color: "black" }}>{departmentName}</strong>
         <div className="warning-1">
           Tất cả dữ liệu trong phòng ban này sẽ bị xóa bỏ hoàn toàn!
         </div>
         <div className="modal-actions-1">
           <button className="cancel-btn-1" onClick={onClose}>
             Hủy bỏ
           </button>
           <button className="confirm-btn-1" onClick={onConfirm}>
             Chắc chắn xóa
           </button>
         </div>
       </div>
     </div>
   );
 };
 
 export default DeleteConfirmModal;