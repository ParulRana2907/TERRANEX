import {
  AlertTriangle,
  Map,
  Users,
  Bell,
  TrendingUp,
  Activity,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

import RiskMap from "../components/RiskMap";
import { zones } from "../data/mockData";


/* =========================================
   RISK DATA
========================================= */

const riskTrendData = [
  {
    time: "Now",
    risk: 62,
  },
  {
    time: "+6H",
    risk: 69,
  },
  {
    time: "+12H",
    risk: 76,
  },
  {
    time: "+24H",
    risk: 85,
  },
  {
    time: "+48H",
    risk: 72,
  },
];


/* =========================================
   DASHBOARD
========================================= */

function Dashboard() {

  /* -----------------------------------------
     CALCULATE RISK COUNTS
  ----------------------------------------- */

  const criticalZones = zones.filter(
    (zone) => zone.risk_level === "CRITICAL"
  ).length;

  const highRiskZones = zones.filter(
    (zone) => zone.risk_level === "HIGH"
  ).length;

  const moderateZones = zones.filter(
    (zone) => zone.risk_level === "MODERATE"
  ).length;

  const lowRiskZones = zones.filter(
    (zone) => zone.risk_level === "LOW"
  ).length;


  /* -----------------------------------------
     RISK DISTRIBUTION
  ----------------------------------------- */

  const riskDistribution = [
    {
      name: "Critical",
      value: criticalZones,
    },
    {
      name: "High",
      value: highRiskZones,
    },
    {
      name: "Moderate",
      value: moderateZones,
    },
    {
      name: "Low",
      value: lowRiskZones,
    },
  ];


  return (

    <div className="min-h-screen bg-slate-50 p-6">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-6">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-sm font-medium text-slate-500">
              TERRANEX COMMAND CENTER
            </p>

            <h1 className="text-3xl font-bold text-slate-900 mt-1">
              Terrain Risk Dashboard
            </h1>

            <p className="text-sm text-slate-500 mt-2">
              AI-powered terrain risk and response intelligence
            </p>

          </div>


          {/* SYSTEM STATUS */}

          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl shadow-sm">

            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>

            <span className="text-sm font-medium text-slate-700">
              System Operational
            </span>

          </div>

        </div>

      </div>


      {/* =====================================
          KPI CARDS
      ===================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">


        {/* CRITICAL */}

        <KpiCard
          title="Critical Zones"
          value={criticalZones}
          subtitle="Immediate attention"
          icon={AlertTriangle}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />


        {/* HIGH RISK */}

        <KpiCard
          title="High Risk Zones"
          value={highRiskZones}
          subtitle="Requires monitoring"
          icon={Activity}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />


        {/* POPULATION */}

        <KpiCard
          title="Population at Risk"
          value="31,000"
          subtitle="Across monitored zones"
          icon={Users}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />


        {/* ALERTS */}

        <KpiCard
          title="Active Alerts"
          value="12"
          subtitle="3 critical alerts"
          icon={Bell}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />

      </div>


      {/* =====================================
          MAIN MAP
      ===================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm mb-6">


        {/* MAP HEADER */}

        <div className="flex items-center justify-between p-5 border-b border-slate-100">

          <div>

            <div className="flex items-center gap-2">

              <Map
                size={20}
                className="text-slate-700"
              />

              <h2 className="text-lg font-bold text-slate-900">
                Live Risk Map
              </h2>

            </div>

            <p className="text-sm text-slate-500 mt-1">
              Spatial view of terrain risk across monitored zones
            </p>

          </div>


          <div className="flex items-center gap-2">

            <span className="w-2 h-2 bg-green-500 rounded-full"></span>

            <span className="text-xs font-medium text-slate-500">
              Monitoring Active
            </span>

          </div>

        </div>


        {/* MAP */}

        <div className="p-4">

          <RiskMap />

        </div>

      </div>


      {/* =====================================
          ANALYTICS ROW
      ===================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">


        {/* =================================
            RISK TREND
        ================================= */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">


          <div className="flex items-center justify-between mb-5">

            <div>

              <div className="flex items-center gap-2">

                <TrendingUp
                  size={19}
                  className="text-slate-700"
                />

                <h2 className="font-bold text-slate-900">
                  Risk Forecast
                </h2>

              </div>

              <p className="text-sm text-slate-500 mt-1">
                Predicted risk trend
              </p>

            </div>


            <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-semibold">
              RISING
            </span>

          </div>


          <div className="h-[280px]">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <LineChart data={riskTrendData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="time" />

                <YAxis
                  domain={[0, 100]}
                  tickCount={6}
                />

                <Tooltip />


                <Line
                  type="monotone"
                  dataKey="risk"
                  strokeWidth={3}
                  dot={{ r: 5 }}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* =================================
            RISK DISTRIBUTION
        ================================= */}

        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5">


          <div className="mb-3">

            <h2 className="font-bold text-slate-900">
              Risk Distribution
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Current monitored zone classification
            </p>

          </div>


          <div className="h-[280px] flex items-center justify-center">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={riskDistribution}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={90}
                  innerRadius={55}
                  paddingAngle={3}
                >

                  {riskDistribution.map(
                    (entry, index) => (

                      <Cell
                        key={`cell-${index}`}
                      />

                    )
                  )}

                </Pie>

                <Tooltip />

              </PieChart>

            </ResponsiveContainer>

          </div>


          {/* LEGEND */}

          <div className="grid grid-cols-2 gap-3 text-sm">

            <RiskLegend
              label="Critical"
              value={criticalZones}
            />

            <RiskLegend
              label="High"
              value={highRiskZones}
            />

            <RiskLegend
              label="Moderate"
              value={moderateZones}
            />

            <RiskLegend
              label="Low"
              value={lowRiskZones}
            />

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================
   KPI CARD COMPONENT
========================================= */

function KpiCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBg,
  iconColor,
}) {

  return (

    <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition">


      <div className="flex items-start justify-between">


        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <h2 className="text-3xl font-bold text-slate-900 mt-2">
            {value}
          </h2>

          <p className="text-xs text-slate-400 mt-2">
            {subtitle}
          </p>

        </div>


        <div
          className={`w-11 h-11 rounded-xl ${iconBg} flex items-center justify-center`}
        >

          <Icon
            size={21}
            className={iconColor}
          />

        </div>

      </div>

    </div>
  );
}


/* =========================================
   RISK LEGEND
========================================= */

function RiskLegend({
  label,
  value,
}) {

  return (

    <div className="flex items-center justify-between bg-slate-50 rounded-lg px-3 py-2">

      <span className="text-slate-600">
        {label}
      </span>

      <span className="font-bold text-slate-900">
        {value}
      </span>

    </div>
  );
}


export default Dashboard;