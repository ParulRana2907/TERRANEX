import {
  Target,
  AlertTriangle,
  Users,
  Route,
  Building2,
  Radio,
  FileWarning,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { zones } from "../data/mockData";


/* =========================================
   PRIORITY COLOR
========================================= */

function getPriorityStyle(score) {

  if (score >= 80) {
    return {
      label: "CRITICAL PRIORITY",
      text: "text-red-600",
      bg: "bg-red-50",
      border: "border-red-200",
    };
  }

  if (score >= 60) {
    return {
      label: "HIGH PRIORITY",
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
    };
  }

  if (score >= 40) {
    return {
      label: "MODERATE PRIORITY",
      text: "text-yellow-600",
      bg: "bg-yellow-50",
      border: "border-yellow-200",
    };
  }

  return {
    label: "LOW PRIORITY",
    text: "text-green-600",
    bg: "bg-green-50",
    border: "border-green-200",
  };
}


/* =========================================
   PRIORITY PAGE
========================================= */

function Priority() {

  /* Sort zones from highest priority to lowest */

  const sortedZones = [...zones].sort(
    (a, b) =>
      b.priority_score - a.priority_score
  );


  return (

    <div className="min-h-screen bg-slate-50 p-6 md:p-8">


      {/* =====================================
          HEADER
      ===================================== */}

      <div className="mb-8">

        <p className="text-sm text-slate-500">
          TERRANEX / Decision Support
        </p>

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <div className="flex items-center gap-3 mt-1">

              <div className="w-10 h-10 rounded-xl bg-slate-900 flex items-center justify-center">

                <Target
                  size={21}
                  className="text-white"
                />

              </div>

              <h1 className="text-3xl font-bold text-slate-900">
                Response Priority
              </h1>

            </div>

            <p className="text-slate-500 mt-3 max-w-2xl">

              Prioritise monitored zones based on terrain
              risk, exposure, infrastructure impact and
              field intelligence.

            </p>

          </div>


          {/* STATUS */}

          <div className="flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-4 py-3">

            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>

            <span className="text-sm font-medium text-slate-700">
              Decision Support Active
            </span>

          </div>

        </div>

      </div>


      {/* =====================================
          EXPLANATION CARD
      ===================================== */}

      <div className="bg-slate-900 text-white rounded-2xl p-6 mb-6">

        <div className="flex items-start gap-4">

          <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">

            <Target size={20} />

          </div>

          <div>

            <h2 className="font-bold text-lg">
              Response Priority Engine
            </h2>

            <p className="text-slate-300 text-sm mt-2 max-w-3xl">

              TERRANEX combines risk and potential impact
              indicators to help decision-makers identify
              zones that may require greater attention.

            </p>

            <p className="text-slate-400 text-xs mt-3">

              Prototype decision-support scoring. It is not
              an official emergency-response command.

            </p>

          </div>

        </div>

      </div>


      {/* =====================================
          SUMMARY CARDS
      ===================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">


        <SummaryCard
          title="Critical Priority"
          value={
            sortedZones.filter(
              (zone) =>
                zone.priority_score >= 80
            ).length
          }
          icon={AlertTriangle}
          iconBg="bg-red-50"
          iconColor="text-red-600"
        />


        <SummaryCard
          title="High Priority"
          value={
            sortedZones.filter(
              (zone) =>
                zone.priority_score >= 60 &&
                zone.priority_score < 80
            ).length
          }
          icon={Target}
          iconBg="bg-orange-50"
          iconColor="text-orange-600"
        />


        <SummaryCard
          title="Population Exposure"
          value={sortedZones
            .reduce(
              (total, zone) =>
                total +
                zone.population_exposed,
              0
            )
            .toLocaleString()
          }
          icon={Users}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />


        <SummaryCard
          title="Roads Affected"
          value={sortedZones.reduce(
            (total, zone) =>
              total + zone.roads_affected,
            0
          )}
          icon={Route}
          iconBg="bg-purple-50"
          iconColor="text-purple-600"
        />

      </div>


      {/* =====================================
          PRIORITY TABLE
      ===================================== */}

      <div className="bg-white border border-slate-200 rounded-2xl shadow-sm overflow-hidden">


        {/* TABLE HEADER */}

        <div className="p-5 border-b border-slate-100">

          <h2 className="text-lg font-bold text-slate-900">
            Zone Priority Ranking
          </h2>

          <p className="text-sm text-slate-500 mt-1">
            Zones ranked by current response priority.
          </p>

        </div>


        {/* DESKTOP TABLE */}

        <div className="hidden md:block overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="bg-slate-50 border-b border-slate-200">

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Zone
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Risk
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Population
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Roads
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Facilities
                </th>

                <th className="text-left px-5 py-4 text-xs font-semibold text-slate-500 uppercase">
                  Priority
                </th>

                <th className="px-5 py-4">
                </th>

              </tr>

            </thead>


            <tbody>

              {sortedZones.map(
                (zone, index) => {

                  const priority =
                    getPriorityStyle(
                      zone.priority_score
                    );

                  return (

                    <tr
                      key={zone.zone_id}
                      className="border-b border-slate-100 hover:bg-slate-50 transition"
                    >

                      {/* ZONE */}

                      <td className="px-5 py-5">

                        <div className="flex items-center gap-3">

                          <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-sm font-bold text-slate-600">

                            {index + 1}

                          </div>

                          <div>

                            <p className="font-semibold text-slate-900">

                              {zone.name}

                            </p>

                            <p className="text-xs text-slate-500">

                              {zone.zone_id}

                            </p>

                          </div>

                        </div>

                      </td>


                      {/* RISK */}

                      <td className="px-5 py-5">

                        <div>

                          <p className="font-bold text-slate-900">

                            {zone.risk_score}/100

                          </p>

                          <p
                            className={`text-xs font-semibold ${getPriorityStyle(
                              zone.risk_score
                            ).text}`}
                          >

                            {zone.risk_level}

                          </p>

                        </div>

                      </td>


                      {/* POPULATION */}

                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <Users
                            size={16}
                            className="text-slate-400"
                          />

                          <span className="font-medium">

                            {zone.population_exposed.toLocaleString()}

                          </span>

                        </div>

                      </td>


                      {/* ROADS */}

                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <Route
                            size={16}
                            className="text-slate-400"
                          />

                          <span className="font-medium">

                            {zone.roads_affected}

                          </span>

                        </div>

                      </td>


                      {/* FACILITIES */}

                      <td className="px-5 py-5">

                        <div className="flex items-center gap-2">

                          <Building2
                            size={16}
                            className="text-slate-400"
                          />

                          <span className="font-medium">

                            {zone.hospitals_affected +
                              zone.schools_affected}

                          </span>

                        </div>

                      </td>


                      {/* PRIORITY */}

                      <td className="px-5 py-5">

                        <div>

                          <div className="flex items-center gap-3">

                            <span className="text-2xl font-bold text-slate-900">

                              {zone.priority_score}

                            </span>

                            <span className="text-xs text-slate-400">
                              / 100
                            </span>

                          </div>

                          <span
                            className={`inline-block mt-1 px-2 py-1 rounded-full text-[10px] font-bold ${priority.bg} ${priority.text}`}
                          >

                            {priority.label}

                          </span>

                        </div>

                      </td>


                      {/* DETAILS */}

                      <td className="px-5 py-5 text-right">

                        <Link
                          to={`/zone/${zone.zone_id}`}
                          className="inline-flex items-center gap-1 px-3 py-2 bg-slate-900 text-white rounded-lg text-xs font-medium hover:bg-slate-800"
                        >

                          View

                          <ArrowRight
                            size={14}
                          />

                        </Link>

                      </td>

                    </tr>

                  );

                }
              )}

            </tbody>

          </table>

        </div>


        {/* =================================
            MOBILE CARDS
        ================================= */}

        <div className="md:hidden divide-y divide-slate-100">

          {sortedZones.map(
            (zone, index) => {

              const priority =
                getPriorityStyle(
                  zone.priority_score
                );

              return (

                <div
                  key={zone.zone_id}
                  className="p-5"
                >

                  <div className="flex items-start justify-between">

                    <div className="flex gap-3">

                      <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center font-bold text-slate-600">

                        {index + 1}

                      </div>

                      <div>

                        <h3 className="font-bold text-slate-900">

                          {zone.name}

                        </h3>

                        <p className="text-xs text-slate-500">

                          {zone.zone_id}

                        </p>

                      </div>

                    </div>


                    <div className="text-right">

                      <p className="text-2xl font-bold">

                        {zone.priority_score}

                      </p>

                      <p className="text-[10px] text-slate-400">
                        / 100
                      </p>

                    </div>

                  </div>


                  <div className="grid grid-cols-2 gap-3 mt-5">

                    <SmallMetric
                      icon={AlertTriangle}
                      label="Risk"
                      value={`${zone.risk_score}/100`}
                    />

                    <SmallMetric
                      icon={Users}
                      label="Population"
                      value={zone.population_exposed.toLocaleString()}
                    />

                    <SmallMetric
                      icon={Route}
                      label="Roads"
                      value={zone.roads_affected}
                    />

                    <SmallMetric
                      icon={Building2}
                      label="Facilities"
                      value={
                        zone.hospitals_affected +
                        zone.schools_affected
                      }
                    />

                  </div>


                  <span
                    className={`inline-block mt-4 px-2 py-1 rounded-full text-xs font-bold ${priority.bg} ${priority.text}`}
                  >

                    {priority.label}

                  </span>


                  <Link
                    to={`/zone/${zone.zone_id}`}
                    className="flex items-center justify-center gap-2 mt-4 w-full bg-slate-900 text-white py-2.5 rounded-lg text-sm"
                  >

                    View Zone

                    <ArrowRight size={15} />

                  </Link>

                </div>

              );

            }
          )}

        </div>

      </div>


      {/* =====================================
          RECOMMENDED ACTION
      ===================================== */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mt-6">


        <ActionCard
          icon={Radio}
          title="Field Verification"
          description="Prioritise on-ground verification for critical zones."
        />


        <ActionCard
          icon={Route}
          title="Connectivity Assessment"
          description="Review roads and routes potentially affected by terrain risk."
        />


        <ActionCard
          icon={FileWarning}
          title="Situation Monitoring"
          description="Continue monitoring changing rainfall and terrain indicators."
        />

      </div>

    </div>
  );
}


/* =========================================
   SUMMARY CARD
========================================= */

function SummaryCard({
  title,
  value,
  icon: Icon,
  iconBg,
  iconColor,
}) {

  return (

    <div className="bg-white border border-slate-200 rounded-2xl p-5 shadow-sm">

      <div className="flex items-center justify-between">

        <div>

          <p className="text-sm text-slate-500">
            {title}
          </p>

          <p className="text-3xl font-bold text-slate-900 mt-2">
            {value}
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
   SMALL METRIC
========================================= */

function SmallMetric({
  icon: Icon,
  label,
  value,
}) {

  return (

    <div className="bg-slate-50 rounded-lg p-3">

      <div className="flex items-center gap-2">

        <Icon
          size={15}
          className="text-slate-400"
        />

        <span className="text-xs text-slate-500">
          {label}
        </span>

      </div>

      <p className="font-bold mt-1">
        {value}
      </p>

    </div>
  );
}


/* =========================================
   ACTION CARD
========================================= */

function ActionCard({
  icon: Icon,
  title,
  description,
}) {

  return (

    <div className="bg-white border border-slate-200 rounded-xl p-5">

      <div className="w-9 h-9 rounded-lg bg-slate-100 flex items-center justify-center">

        <Icon
          size={18}
          className="text-slate-700"
        />

      </div>

      <h3 className="font-semibold text-slate-900 mt-4">
        {title}
      </h3>

      <p className="text-sm text-slate-500 mt-2">
        {description}
      </p>

    </div>
  );
}


export default Priority;