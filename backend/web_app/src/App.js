import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NoPage from "./pages/noPage";
import "bootstrap/dist/css/bootstrap.min.css";
import PublicOnlyRoute from "./components/routesWrapper/publicOnlyRoute";
import ResetPassword from "./components/auth/resetPassword";
import Authentication from "./components/auth/authentication";
import Dashboard from "./pages/dashboard/dashboard";
import ProtectedRoute from "./components/routesWrapper/ProtectedRoute";
import Administration from "./pages/administration/administration";
import EventManagement from "./pages/eventManagement/eventManagement";
import Settings from "./pages/settings/settings";
import TruckManagement from "./pages/truckManagement/truckManagement";
import TicketManagement from "./pages/ticketManagement/ticketManagement";
import DisposalSite from "./pages/disposalSite/disposalSite";
import UserManagement from "./pages/userManagement/userManagement";
import ProjectManagement from "./pages/projectManagement/projectManagement";
import Maps from "./pages/map/map";
import ContractorManagement from "./pages/contractorManagement/contractorManagement";
function App() {
  return (
   <Router>
    <Routes>
        {/* NoPage Route */}
        <Route index element={<NoPage />} />
        
        {/* SignIn Route */}
        <Route path="signin">
        <Route index element={<PublicOnlyRoute Page={Authentication} />} />
        </Route>

        {/* Reset Password Route */}
        {/* <Route path="reset-password" element={<PublicOnlyRoute Page={ResetPassword} />} /> */}
        
        {/* Dashboard Route */}
        <Route path="dashboard">
            <Route index element={<ProtectedRoute Page={Dashboard} />} />
        </Route>

        {/* Administration Route */}
        <Route path="administration">
            <Route index element={<ProtectedRoute Page={Administration} />} />
        </Route>

        {/* Event Management Route */}
        <Route path="event-management">
            <Route index element={<ProtectedRoute Page={EventManagement} />} />
        </Route>

        {/* Project Management Routes */}
        <Route path="project-management/manage-project">
            <Route index element={<ProtectedRoute Page={ProjectManagement} />} />
        </Route>
        <Route path="project-management/map-user">
            <Route index element={<ProtectedRoute Page={ProjectManagement} />} />
        </Route>

        {/* User Management Route */}
        <Route path="user-management">
            <Route index element={<ProtectedRoute Page={UserManagement} />} />
        </Route>

        {/* Disposal Site Route */}
        <Route path="disposal-site">
            <Route index element={<ProtectedRoute Page={DisposalSite} />} />
        </Route>

        {/* Ticket Management Route */}
        <Route path="ticket-management">
            <Route index element={<ProtectedRoute Page={TicketManagement} />} />
        </Route>



        {/* Contractor Management Route */}
        <Route path="contractor-management/manage-contractors">
            <Route index element={<ProtectedRoute Page={ContractorManagement} />} />
        </Route>
        <Route path="contractor-management/manage-rate-matrix">
            <Route index element={<ProtectedRoute Page={ContractorManagement} />} />
        </Route>

        {/* Truck Management Route */}
        <Route path="truck-management">
            <Route index element={<ProtectedRoute Page={TruckManagement} />} />
        </Route>

        {/* Map Route */}
        <Route path="map">
            <Route index element={<ProtectedRoute Page={Maps} />} />
        </Route>

        {/* Settings Route */}
        <Route path="settings">
            <Route index element={<ProtectedRoute Page={Settings} />} />
        </Route>

    </Routes>
   </Router>
  );
}

export default App;
