import {
  LayoutDashboard,
  Map,
  TrendingUp,
  Target,
  FlaskConical,
  MapPin,
  Bell,
  BarChart3,
} from "lucide-react";

import { NavLink } from "react-router-dom";

function Sidebar() {

  const links = [
    {
      name: "Dashboard",
      path: "/",
      icon: LayoutDashboard,
    },

    {
      name: "Risk Map",
      path: "/risk-map",
      icon: Map,
    },

    {
      name: "Risk Forecast",
      path: "/forecast",
      icon: TrendingUp,
    },

    {
      name: "Response Priority",
      path: "/priority",
      icon: Target,
    },

    {
      name: "Scenario Lab",
      path: "/scenario",
      icon: FlaskConical,
    },

    {
      name: "Field Reports",
      path: "/field-reports",
      icon: MapPin,
    },

    {
      name: "Alerts",
      path: "/alerts",
      icon: Bell,
    },

    {
      name: "Analytics",
      path: "/analytics",
      icon: BarChart3,
    },
  ];


  return (

    <aside className="w-64 min-h-screen bg-slate-950 text-white p-4">

      {/* LOGO */}

      <div className="mb-8">

        <h1 className="text-2xl font-bold">
          TERRANEX
        </h1>

        <p className="text-xs text-slate-400 mt-1">
          Terrain Risk Intelligence
        </p>

      </div>


      {/* NAVIGATION */}

      <nav className="space-y-2">

        {links.map((link) => {

          const Icon = link.icon;

          return (

            <NavLink
              key={link.name}
              to={link.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-lg transition ${
                  isActive
                    ? "bg-white text-slate-900"
                    : "text-slate-300 hover:bg-slate-800"
                }`
              }
            >

              <Icon size={19} />

              <span className="text-sm font-medium">
                {link.name}
              </span>

            </NavLink>

          );

        })}

      </nav>


      {/* STATUS */}

      <div className="mt-10 border-t border-slate-800 pt-5">

        <p className="text-xs text-slate-500">
          SYSTEM STATUS
        </p>

        <div className="flex items-center gap-2 mt-3">

          <span className="w-2 h-2 bg-green-500 rounded-full"></span>

          <span className="text-sm text-slate-300">
            Operational
          </span>

        </div>

      </div>

    </aside>
  );
}

export default Sidebar;