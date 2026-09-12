import {
  TrendingUp,
  Map,
  Users,
  Route,
  Building2,
  AlertTriangle,
  Activity,
} from "lucide-react";

import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { zones } from "../data/mockData";


const riskTrendData = [
  {
    time: "Jan",
    risk: 42,
  },
  {
    time: "Feb",
    risk: 48,
  },
  {
    time: "Mar",
    risk: 51,
  },
  {
    time: "Apr",
    risk: 58,
  },
  {
    time: "May",
    risk: 64,
  },
  {
    time: "Jun",
    risk: 71,
  },
];


const zoneRiskData = zones.map((zone) => ({
  name: zone.name,
  risk: zone.risk_score,
  priority: zone.priority_score,
}));


const exposureData = [
  {
    name: "Population",
    value: 31000,
  },
  {
    name: "Roads",
    value: 12,
  },
  {
    name: "Villages",
    value: 18,
  },
  {
    name: "Facilities",
    value: 7,
  },
];


const monthlyReports = [
  {
    month: "Jan",
    reports: 12,
  },
  {
    month: "Feb",
    reports: 18,
  },
  {
    month: "Mar",
    reports: 25,
  },
  {
    month: "Apr",
    reports: 31,
  },
  {
    month: "May",
    reports: 39,
  },
  {
    month: "Jun",
    reports: 46,
  },
];


function Analytics() {

  const criticalZones = zones.filter(
    (zone) => zone.risk_level === "CRITICAL"
  ).length;

  const highRiskZones = zones.filter(
    (zone) => zone.risk_level === "HIGH"
  ).length;

  const moderateZones = zones.filter(
    (zone) => zone.risk_level === "MODERATE"
  ).length;

  const lowZones = zones.filter(
    (zone) => zone.risk_level === "LOW"
  ).length;


  const averageRisk =
    zones.length > 0
      ? Math.round(
          zones.reduce(
            (sum, zone) => sum + zone.risk_score,
            0
          ) / zones.length
        )
      : 0;


  return (
    <div className="p-6 lg:p-8 space-y-6">

      {/* HEADER */}

      <div>

        <p className="text-sm font-medium text-blue-600">
          Regional Intelligence
        </p>

        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          Analytics
        </h1>

        <p className="text-slate-500 mt-2 max-w-3xl">
          Analyse regional terrain risk, exposure, field intelligence
          and response-priority trends to support disaster-management
          decisions.
        </p>

      </div>


      {/* KPI CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <MetricCard
          icon={<Activity size={21} />}
          title="Average Risk"
          value={`${averageRisk}/100`}
          description="Across monitored zones"
        />

        <MetricCard
          icon={<Map size={21} />}
          title="Critical + High"
          value={criticalZones + highRiskZones}
          description="Priority risk zones"
        />

        <MetricCard
          icon={<Users size={21} />}
          title="Population Exposure"
          value="31K"
          description="Estimated population at risk"
        />

        <MetricCard
          icon={<AlertTriangle size={21} />}
          title="Risk Trend"
          value="+18%"
          description="Increase over analysis period"
        />

      </div>


      {/* RISK TREND */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">

          <div>

            <div className="flex items-center gap-2">

              <TrendingUp
                size={20}
                className="text-blue-600"
              />

              <h2 className="text-lg font-bold text-slate-900">
                Regional Risk Trend
              </h2>

            </div>

            <p className="text-sm text-slate-500 mt-1">
              Average terrain-risk score over the analysis period.
            </p>

          </div>


          <div className="px-3 py-2 bg-orange-50 border border-orange-200 rounded-lg">

            <p className="text-xs text-orange-600 font-semibold">
              TREND
            </p>

            <p className="text-sm font-bold text-orange-700">
              Increasing
            </p>

          </div>

        </div>


        <div className="h-[320px] mt-6">

          <ResponsiveContainer width="100%" height="100%">

            <LineChart data={riskTrendData}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="time" />

              <YAxis domain={[0, 100]} />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="risk"
                strokeWidth={3}
                dot={{ r: 4 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* ZONE COMPARISON + EXPOSURE */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

        {/* ZONE RISK */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Zone Risk Comparison
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Current risk and response priority across monitored zones.
            </p>

          </div>


          <div className="h-[320px] mt-6">

            <ResponsiveContainer width="100%" height="100%">

              <BarChart data={zoneRiskData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 11 }}
                />

                <YAxis domain={[0, 100]} />

                <Tooltip />

                <Bar
                  dataKey="risk"
                  name="Risk Score"
                  radius={[6, 6, 0, 0]}
                />

                <Bar
                  dataKey="priority"
                  name="Priority Score"
                  radius={[6, 6, 0, 0]}
                />

              </BarChart>

            </ResponsiveContainer>

          </div>

        </div>


        {/* EXPOSURE */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Exposure Overview
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Estimated infrastructure and population exposure.
            </p>

          </div>


          <div className="space-y-5 mt-7">

            <ExposureRow
              icon={<Users size={20} />}
              title="Population"
              value="31,000"
              percentage={82}
            />

            <ExposureRow
              icon={<Route size={20} />}
              title="Road Sections"
              value="12"
              percentage={65}
            />

            <ExposureRow
              icon={<Map size={20} />}
              title="Villages"
              value="18"
              percentage={72}
            />

            <ExposureRow
              icon={<Building2 size={20} />}
              title="Critical Facilities"
              value="7"
              percentage={48}
            />

          </div>


          <div className="mt-7 bg-slate-50 border border-slate-200 rounded-xl p-4">

            <p className="text-xs font-semibold text-slate-500 uppercase">
              Interpretation
            </p>

            <p className="text-sm text-slate-700 mt-2 leading-6">
              Exposure indicators help TERRANEX prioritise zones
              where elevated terrain risk overlaps with population
              and critical infrastructure.
            </p>

          </div>

        </div>

      </div>


      {/* RISK DISTRIBUTION */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div>

          <h2 className="text-lg font-bold text-slate-900">
            Risk Distribution
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Distribution of monitored zones by current risk category.
          </p>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          <RiskDistribution
            label="Critical"
            value={criticalZones}
            icon="🔴"
          />

          <RiskDistribution
            label="High"
            value={highRiskZones}
            icon="🟠"
          />

          <RiskDistribution
            label="Moderate"
            value={moderateZones}
            icon="🟡"
          />

          <RiskDistribution
            label="Low"
            value={lowZones}
            icon="🟢"
          />

        </div>

      </div>


      {/* FIELD INTELLIGENCE */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-center gap-2">

          <Activity
            size={20}
            className="text-slate-700"
          />

          <h2 className="text-lg font-bold text-slate-900">
            Field Intelligence Trend
          </h2>

        </div>

        <p className="text-sm text-slate-500 mt-1">
          Number of field observations submitted over time.
        </p>


        <div className="h-[280px] mt-6">

          <ResponsiveContainer width="100%" height="100%">

            <BarChart data={monthlyReports}>

              <CartesianGrid strokeDasharray="3 3" />

              <XAxis dataKey="month" />

              <YAxis />

              <Tooltip />

              <Bar
                dataKey="reports"
                name="Field Reports"
                radius={[6, 6, 0, 0]}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* INSIGHT CARDS */}

      <div>

        <h2 className="text-lg font-bold text-slate-900">
          Key Intelligence Insights
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">

          <InsightCard
            title="Risk Increasing"
            text="Regional risk has shown an increasing trend during the analysis period."
          />

          <InsightCard
            title="Exposure Concentration"
            text="High-risk zones overlapping with population and road networks should receive higher response priority."
          />

          <InsightCard
            title="Field Intelligence"
            text="Increasing field reports can provide additional ground-level information for verification and risk assessment."
          />

        </div>

      </div>


      {/* DISCLAIMER */}

      <div className="text-xs text-slate-400 bg-white border border-slate-200 rounded-xl p-4">

        <strong className="text-slate-600">
          Decision-support notice:
        </strong>{" "}
        Analytics shown here are based on prototype data and
        decision-support calculations. They should not be interpreted
        as official emergency statistics or guaranteed hazard
        predictions.

      </div>

    </div>
  );
}


function MetricCard({
  icon,
  title,
  value,
  description,
}) {

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
          {icon}
        </div>

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="text-2xl font-bold text-slate-900">
            {value}
          </p>

        </div>

      </div>

      <p className="text-xs text-slate-400 mt-4">
        {description}
      </p>

    </div>
  );
}


function ExposureRow({
  icon,
  title,
  value,
  percentage,
}) {

  return (
    <div>

      <div className="flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center text-slate-600">
            {icon}
          </div>

          <span className="text-sm font-semibold text-slate-700">
            {title}
          </span>

        </div>


        <span className="text-sm font-bold text-slate-900">
          {value}
        </span>

      </div>


      <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">

        <div
          className="h-full bg-slate-800 rounded-full"
          style={{
            width: `${percentage}%`,
          }}
        />

      </div>

    </div>
  );
}


function RiskDistribution({
  label,
  value,
  icon,
}) {

  return (
    <div className="border border-slate-200 rounded-xl p-5">

      <div className="flex items-center justify-between">

        <span className="text-2xl">
          {icon}
        </span>

        <span className="text-2xl font-bold text-slate-900">
          {value}
        </span>

      </div>

      <p className="text-sm font-semibold text-slate-700 mt-3">
        {label}
      </p>

      <p className="text-xs text-slate-400 mt-1">
        monitored zones
      </p>

    </div>
  );
}


function InsightCard({
  title,
  text,
}) {

  return (
    <div className="border border-slate-200 rounded-xl p-5 bg-slate-50">

      <h3 className="font-bold text-slate-900">
        {title}
      </h3>

      <p className="text-sm text-slate-600 mt-2 leading-6">
        {text}
      </p>

    </div>
  );
}


export default Analytics;