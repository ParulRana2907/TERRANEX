import { Bell, User } from "lucide-react";

function Navbar() {
  return (
    <header className="h-16 bg-white border-b border-slate-200
      flex items-center justify-between px-6">

      <div>
        <h2 className="text-lg font-semibold text-slate-800">
          Disaster Intelligence Command Center
        </h2>

        <p className="text-xs text-slate-500">
          North Eastern Region
        </p>
      </div>

      <div className="flex items-center gap-5">

        <button className="text-slate-500 hover:text-slate-800">
          <Bell size={20} />
        </button>

        <div className="flex items-center gap-2">
          <User size={20} className="text-slate-600" />

          <span className="text-sm font-medium text-slate-700">
            Admin
          </span>
        </div>

      </div>

    </header>
  );
}

export default Navbar;