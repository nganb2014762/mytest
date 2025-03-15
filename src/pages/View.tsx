import img from "../assets/image.webp";
 interface ViewProps {
   isOpen: boolean;
   onClose: () => void;
   departmentName: string | null;
 }
 import "../styles/view.scss";
 
 const View: React.FC<ViewProps> = ({ isOpen, onClose, departmentName }) => {
   return (
     <>
       <div className={`overlay ${isOpen ? "show" : ""}`} onClick={onClose}></div>
 
       <div className={`modal ${isOpen ? "open" : ""}`}>
         <div className="modal-content">
           <div className="modal-header">
             <p className="modal-text">{departmentName}</p>
             <button className="close-text" onClick={onClose}>Đóng lại</button>
           </div>
           <div className="modal-body">
           <img src={img} className="empty-image" alt="React Logo" />
             <p style={{color:"black"}}>Không có nhân sự trong phòng này. Bạn muốn thêm nhân sự mới?</p>
             <button className="add-staff-btn">+ Thêm nhân sự</button>
           </div>
         </div>
       </div>
     </>
   );
 };
 
 export default View;