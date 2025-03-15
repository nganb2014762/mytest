import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import DepartmentManagement from "./pages/DepartmentManagement";
import "./styles/global.scss";

function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Header />
        <DepartmentManagement />
      </div>
    </div>
  );
}

export default App;
