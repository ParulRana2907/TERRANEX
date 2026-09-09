import {
  LayoutDashboard,
  Map,
  CloudRain,
  Siren,
  FlaskConical,
  FileWarning,
  Bell,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menuItems = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    path: "/",
  },
  {
    name: "Risk Map",
    icon: Map,
    path: "/risk-map",
  },
  {
    name: "Forecast",
    icon: CloudRain,
    path: "/forecast",
  },
  {
    name: "Response Priority",
    icon: Siren,
    path: "/priority",
  },
  {
    name: "Scenario Lab",
    icon: FlaskConical,
    path: "/scenario",
  },
  {
    name: "Field Reports",
    icon: FileWarning,
    path: "/field-reports",
  },
  {
    name: "Alerts",
    icon: Bell,
    path: "/alerts",
  },
  {
    name: "Analytics",
    icon: BarChart3,
    path: "/analytics",
  },
];

function Sidebar() {
  return (
    <aside className="w-64 min-h-screen bg-slate-950 text-white p-5">

      {/* Logo */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold tracking-wide">
          TERRANEX
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Terrain Risk Intelligence
        </p>
      </div>

      {/* Navigation */}
      <nav className="space-y-2">

        {menuItems.map((item) => {

          const Icon = item.icon;

          return (
            <NavLink
              key={item.name}
              to={item.path}
              className={({ isActive }) =>
                `w-full flex items-center gap-3 px-4 py-3 rounded-lg
                transition text-sm
                ${
                  isActive
                    ? "bg-slate-700 text-white"
                    : "text-slate-300 hover:bg-slate-800 hover:text-white"
                }`
              }
            >

              <Icon size={19} />

              <span>
                {item.name}
              </span>

            </NavLink>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;