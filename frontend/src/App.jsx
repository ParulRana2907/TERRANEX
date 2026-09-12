import { BrowserRouter, Routes, Route } from "react-router-dom";

import Sidebar from "./components/Sidebar";

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

        <main className="flex-1">

          <Routes>

            {/* Dashboard */}
            <Route
              path="/"
              element={<Dashboard />}
            />

            {/* Risk Map */}
            <Route
              path="/risk-map"
              element={<RiskMapPage />}
            />

            {/* Zone Details */}
            <Route
              path="/zone/:zoneId"
              element={<ZoneDetails />}
            />

            {/* Risk Forecast */}
            <Route
              path="/forecast"
              element={<Forecast />}
            />

            {/* Response Priority */}
            <Route
              path="/priority"
              element={<Priority />}
            />

            {/* Scenario Lab */}
            <Route
              path="/scenario"
              element={<ScenarioLab />}
            />

            {/* Field Reports */}
            <Route
              path="/field-reports"
              element={<FieldReports />}
            />

            {/* Alerts */}
            <Route
              path="/alerts"
              element={<Alerts />}
            />

            {/* Analytics */}
            <Route
              path="/analytics"
              element={<Analytics />}
            />

          </Routes>

        </main>

      </div>

    </BrowserRouter>
  );
}

export default App;