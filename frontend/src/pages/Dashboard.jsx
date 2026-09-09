import KPICard from "../components/KPICard";

function Dashboard() {
  return (
    <div className="p-6">

      {/* Page Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-900">
          Dashboard
        </h1>

        <p className="text-slate-500 mt-1">
          Current terrain risk and response intelligence
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2
        lg:grid-cols-4 gap-5">

        <KPICard
          title="Critical Zones"
          value="07"
          subtitle="Immediate attention"
        />

        <KPICard
          title="High Risk Zones"
          value="19"
          subtitle="Requires monitoring"
        />

        <KPICard
          title="Population at Risk"
          value="31,000"
          subtitle="Across monitored zones"
        />

        <KPICard
          title="Roads at Risk"
          value="12"
          subtitle="Connectivity affected"
        />

      </div>

      {/* Main content placeholder */}
      <div className="mt-6 grid grid-cols-1 lg:grid-cols-3 gap-5">

        <div className="lg:col-span-2 bg-white rounded-xl
          border border-slate-200 p-6 h-96">

          <h2 className="text-lg font-semibold text-slate-800">
            Terrain Risk Map
          </h2>

          <div className="h-72 mt-4 bg-slate-100 rounded-lg
            flex items-center justify-center">

            <p className="text-slate-400">
              GIS Risk Map — Coming Next
            </p>

          </div>

        </div>

        <div className="bg-white rounded-xl border border-slate-200 p-6">

          <h2 className="text-lg font-semibold text-slate-800">
            Active Alerts
          </h2>

          <div className="mt-5 p-4 rounded-lg bg-red-50">
            <p className="text-sm font-semibold text-red-700">
              Critical Risk
            </p>

            <p className="text-sm text-slate-600 mt-1">
              Zone Z101 requires immediate attention.
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;