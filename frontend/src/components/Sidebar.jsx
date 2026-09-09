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

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard },
  { name: "Risk Map", icon: Map },
  { name: "Forecast", icon: CloudRain },
  { name: "Response Priority", icon: Siren },
  { name: "Scenario Lab", icon: FlaskConical },
  { name: "Field Reports", icon: FileWarning },
  { name: "Alerts", icon: Bell },
  { name: "Analytics", icon: BarChart3 },
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
            <button
              key={item.name}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg
              text-slate-300 hover:bg-slate-800 hover:text-white
              transition text-left"
            >
              <Icon size={19} />

              <span className="text-sm">
                {item.name}
              </span>
            </button>
          );
        })}

      </nav>

    </aside>
  );
}

export default Sidebar;