import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import RiskMapPage from "./pages/RiskMapPage";
import ZoneDetails from "./pages/ZoneDetails";
import Forecast from "./pages/Forecast";
import Priority from "./pages/Priority";
import ScenarioLab from "./pages/ScenarioLab";
import FieldReports from "./pages/FieldReports";
import Alerts from "./pages/Alerts";
import Analytics from "./pages/Analytics";

function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen bg-slate-100">

        <Sidebar />

        <div className="flex-1 min-w-0">

          <Navbar />

          <main>
            <Routes>

              <Route path="/" element={<Dashboard />} />

              <Route path="/risk-map" element={<RiskMapPage />} />

              <Route path="/zone/:zoneId" element={<ZoneDetails />} />

              <Route path="/forecast" element={<Forecast />} />

              <Route path="/priority" element={<Priority />} />

              <Route path="/scenario" element={<ScenarioLab />} />

              <Route path="/field-reports" element={<FieldReports />} />

              <Route path="/alerts" element={<Alerts />} />

              <Route path="/analytics" element={<Analytics />} />

            </Routes>
          </main>

        </div>

      </div>
    </BrowserRouter>
  );
}

export default App;