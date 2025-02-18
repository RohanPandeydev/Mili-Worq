import "./App.css";
import { Route, Routes } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./pages/Dashboard";
import ProjectList from "./pages/ProjectList";
import CreateEventForm from "./pages/CreateEventForm";
import PagenotFound from "./pages/PagenotFound";
import CreateProjectForm from "./pages/CreateProjectForm";
import ClientList from "./pages/ClientList";
import SalespersonList from "./pages/SalespersonList";
import CreateClient from "./pages/CreateClient";
import CreateSalesPerson from "./pages/CreateSalesPerson";
import CreateStatus from "./pages/CreateStatus";
import ProjectStatusList from "./pages/ProjectStatusList";
import ProjectDetails from "./pages/ProjectDetails";
import ClientDetails from "./pages/ClientDetails";
import SalesPersonDetails from "./pages/SalesPersonDetails";
import ProjectStatusDetails from "./pages/ProjectStatusDetails";
import RequireAuth from '../src/authgurad/AuthGuard'
import CabinetDatabaseList from "./pages/CabinetDatabaseList";
import CreateCabinetDatabase from "./pages/CreateCabinetDatabase";
import CabinetDatabaseDetails from "./pages/CabinetDatabaseDetails";
import EstimateInformation from "./pages/EstimateInformation";
import ProjectInfo from "./pages/ProjectInfo";
import SupplierList from "./pages/SupplierList";
import CreateSupplier from "./pages/CreateSupplier";
import SupplierDetails from "./pages/SupplierDetails";
import UnitMain from "./components/UnitMain";
import UnitForm from "./components/Subcomponent/UnitForm";
import EstimationInformationMain from "./components/EstimationInformationMain";
import EditUnit from "./components/Subcomponent/EditUnit";
import CreateUnit from "./pages/CreateUnit";
import CreateEst from "./pages/CreateEst";
import UnitDetails from "./pages/UnitDetails";
import EstInfo from "./pages/EstInfo";
function App() {
  return (
    <Routes>
      <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/login" element={<Signin />} />
      <Route path="/projectlist" element={<RequireAuth><ProjectList /></RequireAuth>} />
      <Route path="/projectinfo/:id" element={<RequireAuth><ProjectInfo /></RequireAuth>} />
      <Route path="/project/details/:id" element={<RequireAuth><ProjectDetails /></RequireAuth>} />
      <Route path="/client/details/:id" element={<RequireAuth><ClientDetails /></RequireAuth>} />
      <Route path="/salesperson/details/:id" element={<RequireAuth><SalesPersonDetails /></RequireAuth>} />
      <Route path="/project/status/details/:id" element={<RequireAuth><ProjectStatusDetails /></RequireAuth>} />
      <Route path="/clientlist" element={<RequireAuth><ClientList /></RequireAuth>} />
      <Route path="/salespersonlist" element={<RequireAuth><SalespersonList /></RequireAuth>} />
      <Route path="/projectstatuslist" element={<RequireAuth><ProjectStatusList /></RequireAuth>} />
      <Route path="/eventform" element={<RequireAuth><CreateEventForm /></RequireAuth>} />
      <Route path="/projectform" element={<RequireAuth><CreateProjectForm /></RequireAuth>} />
      <Route path="/clientform" element={<RequireAuth><CreateClient /></RequireAuth>} />
      <Route path="/salespersonform" element={<RequireAuth><CreateSalesPerson /></RequireAuth>} />
      <Route path="/statusform" element={<RequireAuth><CreateStatus /></RequireAuth>} />
      <Route path="/cabinetdatabaselist" element={<RequireAuth><CabinetDatabaseList /></RequireAuth>} />
      <Route path="/cabinetdatabase/details/:id" element={<RequireAuth><CabinetDatabaseDetails /></RequireAuth>} />
      <Route path="/cabinetdatabaseform" element={<RequireAuth><CreateCabinetDatabase /></RequireAuth>} />
      <Route path="/project/estimateinformation/:eid/unit/unitform" element={<RequireAuth><CreateUnit /></RequireAuth>} />
      <Route path="/project/estimateinformation/:eid/unit/:id/details" element={<RequireAuth><UnitDetails /></RequireAuth>} />
      <Route path="/project/:id/estimateinformation/:eid/estinfo/" element={<RequireAuth><EstInfo /></RequireAuth>} />
      <Route path="/project/estimateinformation/:pid" element={<RequireAuth><CreateEst /></RequireAuth>} />
      <Route path="/suppliers" element={<RequireAuth><SupplierList /></RequireAuth>} />
      <Route path="/suppliers/create" element={<RequireAuth><CreateSupplier /></RequireAuth>} />
      <Route path="/suppliers/details/:id" element={<RequireAuth><SupplierDetails /></RequireAuth>} />

      <Route path="/*" element={<PagenotFound />} />
    </Routes>
  );
}

export default App;
