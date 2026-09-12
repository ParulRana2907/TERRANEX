import { useState } from "react";

import {
  AlertTriangle,
  Bell,
  CheckCircle,
  Clock,
  MapPin,
  ShieldAlert,
  Search,
  Filter,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";


const initialAlerts = [
  {
    id: "ALT-001",
    zone_id: "Z102",
    zone_name: "West Kameng",
    severity: "CRITICAL",
    risk_score: 89,
    trigger: "High rainfall + saturated soil",
    impact: "3 villages, 2 roads, 1 hospital route",
    priority: 96,
    recommendation:
      "Prioritise field verification and connectivity assessment.",
    time: "10 minutes ago",
    status: "ACTIVE",
  },

  {
    id: "ALT-002",
    zone_id: "Z101",
    zone_name: "Tawang",
    severity: "HIGH",
    risk_score: 82,
    trigger: "Increasing rainfall + steep slope",
    impact: "2 villages, 1 major road",
    priority: 91,
    recommendation:
      "Monitor rainfall trend and prepare field verification.",
    time: "25 minutes ago",
    status: "ACTIVE",
  },

  {
    id: "ALT-003",
    zone_id: "Z104",
    zone_name: "Dibang Valley",
    severity: "HIGH",
    risk_score: 78,
    trigger: "High soil moisture + terrain instability",
    impact: "1 village, 2 road sections",
    priority: 84,
    recommendation:
      "Review road connectivity and monitor field reports.",
    time: "1 hour ago",
    status: "ACTIVE",
  },

  {
    id: "ALT-004",
    zone_id: "Z103",
    zone_name: "East Siang",
    severity: "MODERATE",
    risk_score: 61,
    trigger: "Moderate rainfall increase",
    impact: "1 village",
    priority: 63,
    recommendation:
      "Continue monitoring weather and terrain indicators.",
    time: "2 hours ago",
    status: "ACKNOWLEDGED",
  },

  {
    id: "ALT-005",
    zone_id: "Z105",
    zone_name: "Lohit",
    severity: "LOW",
    risk_score: 38,
    trigger: "Low rainfall accumulation",
    impact: "Limited exposure",
    priority: 42,
    recommendation:
      "Continue routine monitoring.",
    time: "3 hours ago",
    status: "RESOLVED",
  },
];


function Alerts() {
  const [alerts, setAlerts] = useState(initialAlerts);

  const [search, setSearch] = useState("");

  const [severityFilter, setSeverityFilter] = useState("ALL");


  const filteredAlerts = alerts.filter((alert) => {
    const matchesSearch =
      alert.zone_name.toLowerCase().includes(search.toLowerCase()) ||
      alert.zone_id.toLowerCase().includes(search.toLowerCase()) ||
      alert.trigger.toLowerCase().includes(search.toLowerCase());

    const matchesSeverity =
      severityFilter === "ALL" ||
      alert.severity === severityFilter;

    return matchesSearch && matchesSeverity;
  });


  const activeAlerts = alerts.filter(
    (alert) => alert.status === "ACTIVE"
  ).length;

  const criticalAlerts = alerts.filter(
    (alert) => alert.severity === "CRITICAL"
  ).length;

  const acknowledgedAlerts = alerts.filter(
    (alert) => alert.status === "ACKNOWLEDGED"
  ).length;

  const resolvedAlerts = alerts.filter(
    (alert) => alert.status === "RESOLVED"
  ).length;


  function acknowledgeAlert(id) {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, status: "ACKNOWLEDGED" }
          : alert
      )
    );
  }


  function resolveAlert(id) {
    setAlerts(
      alerts.map((alert) =>
        alert.id === id
          ? { ...alert, status: "RESOLVED" }
          : alert
      )
    );
  }


  return (
    <div className="p-6 lg:p-8 space-y-6">

      {/* HEADER */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <p className="text-sm font-medium text-red-600">
            Emergency Intelligence
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Alerts
          </h1>

          <p className="text-slate-500 mt-2 max-w-3xl">
            Monitor intelligent terrain-risk alerts generated from
            rainfall, terrain conditions, field intelligence and
            response priority.
          </p>

        </div>


        <div className="flex items-center gap-2 bg-green-50 border border-green-200 px-4 py-3 rounded-xl">

          <CheckCircle
            size={18}
            className="text-green-600"
          />

          <span className="text-sm font-semibold text-green-700">
            Alert System Active
          </span>

        </div>

      </div>


      {/* SUMMARY CARDS */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <SummaryCard
          icon={<Bell size={21} />}
          title="Active Alerts"
          value={activeAlerts}
          description="Require attention"
        />

        <SummaryCard
          icon={<ShieldAlert size={21} />}
          title="Critical Alerts"
          value={criticalAlerts}
          description="Highest severity"
        />

        <SummaryCard
          icon={<Clock size={21} />}
          title="Acknowledged"
          value={acknowledgedAlerts}
          description="Under response"
        />

        <SummaryCard
          icon={<CheckCircle size={21} />}
          title="Resolved"
          value={resolvedAlerts}
          description="Closed alerts"
        />

      </div>


      {/* ALERT LOGIC */}

      <div className="bg-slate-900 text-white rounded-2xl p-6">

        <div className="flex items-start gap-4">

          <div className="w-11 h-11 rounded-xl bg-red-500/20 flex items-center justify-center">

            <AlertTriangle
              size={23}
              className="text-red-400"
            />

          </div>


          <div>

            <h2 className="text-lg font-bold">
              Smart Alert Logic
            </h2>

            <p className="text-sm text-slate-300 mt-2 leading-6">
              Alerts are generated when terrain risk, environmental
              conditions, potential impact and response priority
              indicate that a zone requires attention.
            </p>

          </div>

        </div>


        <div className="grid grid-cols-1 md:grid-cols-4 gap-3 mt-6">

          <LogicStep
            number="01"
            title="Risk"
            text="AI-generated risk score"
          />

          <LogicStep
            number="02"
            title="Trigger"
            text="Rainfall, soil or terrain change"
          />

          <LogicStep
            number="03"
            title="Impact"
            text="Population and infrastructure"
          />

          <LogicStep
            number="04"
            title="Priority"
            text="Response priority score"
          />

        </div>

      </div>


      {/* SEARCH + FILTER */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

        <div className="p-5 border-b border-slate-200">

          <div className="flex flex-col md:flex-row gap-3">

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search zone, ID or trigger..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />

            </div>


            <div className="relative">

              <Filter
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={severityFilter}
                onChange={(e) =>
                  setSeverityFilter(e.target.value)
                }
                className="border border-slate-200 rounded-xl pl-9 pr-8 py-3 text-sm bg-white"
              >

                <option value="ALL">
                  All Severity
                </option>

                <option value="CRITICAL">
                  Critical
                </option>

                <option value="HIGH">
                  High
                </option>

                <option value="MODERATE">
                  Moderate
                </option>

                <option value="LOW">
                  Low
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* ALERT LIST */}

        <div className="divide-y divide-slate-100">

          {filteredAlerts.map((alert) => (

            <div
              key={alert.id}
              className="p-5 hover:bg-slate-50 transition"
            >

              <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5">

                {/* LEFT */}

                <div className="flex gap-4">

                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                      alert.severity === "CRITICAL"
                        ? "bg-red-50"
                        : alert.severity === "HIGH"
                        ? "bg-orange-50"
                        : alert.severity === "MODERATE"
                        ? "bg-yellow-50"
                        : "bg-green-50"
                    }`}
                  >

                    <AlertTriangle
                      size={21}
                      className={
                        alert.severity === "CRITICAL"
                          ? "text-red-600"
                          : alert.severity === "HIGH"
                          ? "text-orange-600"
                          : alert.severity === "MODERATE"
                          ? "text-yellow-600"
                          : "text-green-600"
                      }
                    />

                  </div>


                  <div>

                    <div className="flex flex-wrap items-center gap-2">

                      <h3 className="font-bold text-slate-900">
                        {alert.zone_name}
                      </h3>

                      <span className="text-xs text-slate-400">
                        {alert.zone_id}
                      </span>

                      <SeverityBadge
                        severity={alert.severity}
                      />

                      <StatusBadge
                        status={alert.status}
                      />

                    </div>


                    <p className="text-sm text-slate-600 mt-2">
                      {alert.trigger}
                    </p>


                    <div className="flex flex-wrap gap-4 mt-3 text-xs text-slate-500">

                      <span className="flex items-center gap-1">

                        <MapPin size={14} />

                        {alert.impact}

                      </span>

                      <span>
                        Risk:{" "}
                        <strong className="text-slate-700">
                          {alert.risk_score}/100
                        </strong>
                      </span>

                      <span>
                        Priority:{" "}
                        <strong className="text-slate-700">
                          {alert.priority}/100
                        </strong>
                      </span>

                      <span>
                        {alert.time}
                      </span>

                    </div>

                  </div>

                </div>


                {/* RIGHT */}

                <div className="flex flex-col sm:flex-row gap-2 xl:min-w-[300px]">

                  <Link
                    to={`/zone/${alert.zone_id}`}
                    className="flex items-center justify-center gap-2 px-4 py-2.5 border border-slate-200 rounded-xl text-sm font-semibold hover:bg-slate-100"
                  >
                    View Zone
                    <ArrowRight size={16} />
                  </Link>


                  {alert.status === "ACTIVE" && (
                    <button
                      onClick={() =>
                        acknowledgeAlert(alert.id)
                      }
                      className="px-4 py-2.5 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800"
                    >
                      Acknowledge
                    </button>
                  )}


                  {alert.status === "ACKNOWLEDGED" && (
                    <button
                      onClick={() =>
                        resolveAlert(alert.id)
                      }
                      className="px-4 py-2.5 rounded-xl bg-green-600 text-white text-sm font-semibold hover:bg-green-700"
                    >
                      Mark Resolved
                    </button>
                  )}

                </div>

              </div>


              {/* RECOMMENDATION */}

              <div className="ml-0 xl:ml-15 mt-4 bg-slate-50 border border-slate-200 rounded-xl p-4">

                <p className="text-xs font-semibold text-slate-500 uppercase">
                  Recommended Action
                </p>

                <p className="text-sm text-slate-700 mt-1">
                  {alert.recommendation}
                </p>

              </div>

            </div>

          ))}

        </div>


        {filteredAlerts.length === 0 && (

          <div className="p-12 text-center">

            <Bell
              size={35}
              className="mx-auto text-slate-300"
            />

            <p className="font-semibold text-slate-700 mt-3">
              No alerts found
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Try changing your search or severity filter.
            </p>

          </div>

        )}

      </div>


      {/* DISCLAIMER */}

      <div className="text-xs text-slate-400 bg-white border border-slate-200 rounded-xl p-4">

        <strong className="text-slate-600">
          Decision-support notice:
        </strong>{" "}
        TERRANEX alerts are intended to support monitoring,
        prioritisation and field verification. They do not
        represent an autonomous emergency command or guaranteed
        prediction of a landslide event.

      </div>

    </div>
  );
}


function SummaryCard({
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


function SeverityBadge({ severity }) {

  const styles = {
    CRITICAL:
      "bg-red-50 text-red-700 border-red-200",

    HIGH:
      "bg-orange-50 text-orange-700 border-orange-200",

    MODERATE:
      "bg-yellow-50 text-yellow-700 border-yellow-200",

    LOW:
      "bg-green-50 text-green-700 border-green-200",
  };


  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-bold ${
        styles[severity]
      }`}
    >
      {severity}
    </span>
  );
}


function StatusBadge({ status }) {

  const styles = {
    ACTIVE:
      "bg-red-50 text-red-700 border-red-200",

    ACKNOWLEDGED:
      "bg-blue-50 text-blue-700 border-blue-200",

    RESOLVED:
      "bg-green-50 text-green-700 border-green-200",
  };


  return (
    <span
      className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-semibold ${
        styles[status]
      }`}
    >
      {status}
    </span>
  );
}


function LogicStep({
  number,
  title,
  text,
}) {
  return (
    <div className="border border-slate-700 rounded-xl p-4">

      <span className="text-xs font-bold text-blue-400">
        {number}
      </span>

      <h3 className="font-semibold mt-2">
        {title}
      </h3>

      <p className="text-xs text-slate-400 mt-1">
        {text}
      </p>

    </div>
  );
}


export default Alerts;