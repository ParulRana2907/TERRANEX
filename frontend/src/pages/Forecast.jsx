import { useState } from "react";

import {
  TrendingUp,
  TrendingDown,
  Minus,
  CloudRain,
  Droplets,
  Mountain,
  AlertTriangle,
  Clock,
  ArrowRight,
} from "lucide-react";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import { Link } from "react-router-dom";

import { zones } from "../data/mockData";


function Forecast() {

  // ----------------------------------------
  // SELECTED ZONE
  // ----------------------------------------

  const [selectedZoneId, setSelectedZoneId] = useState(
    zones[0]?.zone_id || ""
  );


  const selectedZone =
    zones.find(
      (zone) => zone.zone_id === selectedZoneId
    ) || zones[0];


  // ----------------------------------------
  // FORECAST DATA
  // ----------------------------------------

  const forecastData = [
    {
      time: "NOW",
      risk: selectedZone?.risk_score || 62,
    },

    {
      time: "+6H",
      risk: Math.min(
        100,
        (selectedZone?.risk_score || 62) + 7
      ),
    },

    {
      time: "+12H",
      risk: Math.min(
        100,
        (selectedZone?.risk_score || 62) + 14
      ),
    },

    {
      time: "+24H",
      risk: Math.min(
        100,
        (selectedZone?.risk_score || 62) + 23
      ),
    },

    {
      time: "+48H",
      risk: Math.min(
        100,
        (selectedZone?.risk_score || 62) + 10
      ),
    },
  ];


  // ----------------------------------------
  // FORECAST VALUES
  // ----------------------------------------

  const currentRisk =
    forecastData[0].risk;

  const peakForecast =
    Math.max(
      ...forecastData.map(
        (item) => item.risk
      )
    );

  const peakTime =
    forecastData.find(
      (item) => item.risk === peakForecast
    )?.time;


  const riskChange =
    peakForecast - currentRisk;


  // ----------------------------------------
  // RISK TREND
  // ----------------------------------------

  function getTrend() {

    if (riskChange >= 10) {
      return {
        label: "RISING",
        icon: <TrendingUp size={18} />,
        className:
          "text-orange-600 bg-orange-50",
      };
    }

    if (riskChange <= -10) {
      return {
        label: "FALLING",
        icon: <TrendingDown size={18} />,
        className:
          "text-green-600 bg-green-50",
      };
    }

    return {
      label: "STABLE",
      icon: <Minus size={18} />,
      className:
        "text-slate-600 bg-slate-100",
    };
  }


  const trend = getTrend();


  // ----------------------------------------
  // RISK LEVEL
  // ----------------------------------------

  function getRiskLevel(score) {

    if (score >= 81) {
      return "CRITICAL";
    }

    if (score >= 61) {
      return "HIGH";
    }

    if (score >= 41) {
      return "MODERATE";
    }

    if (score >= 21) {
      return "LOW";
    }

    return "VERY LOW";
  }


  function getRiskColor(score) {

    if (score >= 81) {
      return "text-red-600";
    }

    if (score >= 61) {
      return "text-orange-600";
    }

    if (score >= 41) {
      return "text-yellow-600";
    }

    return "text-green-600";
  }


  return (

    <div className="p-6 lg:p-8 space-y-6">

      {/* =====================================
          HEADER
      ===================================== */}

      <div>

        <p className="text-sm font-medium text-blue-600">
          Predictive Intelligence
        </p>

        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          Risk Forecast
        </h1>

        <p className="text-slate-500 mt-2 max-w-3xl">
          View short-term terrain risk trends and projected
          risk changes for monitored zones.
        </p>

      </div>


      {/* =====================================
          ZONE SELECTOR
      ===================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

          <div>

            <p className="text-xs text-slate-400 uppercase tracking-wide">
              Monitoring Zone
            </p>

            <h2 className="text-xl font-bold text-slate-900 mt-1">
              {selectedZone?.name || "No zone selected"}
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Zone ID: {selectedZone?.zone_id}
            </p>

          </div>


          <select
            value={selectedZoneId}
            onChange={(e) =>
              setSelectedZoneId(e.target.value)
            }
            className="border border-slate-200 rounded-xl px-4 py-3 text-sm bg-white outline-none focus:ring-2 focus:ring-slate-200"
          >

            {zones.map((zone) => (

              <option
                key={zone.zone_id}
                value={zone.zone_id}
              >
                {zone.zone_id} — {zone.name}
              </option>

            ))}

          </select>

        </div>

      </div>


      {/* =====================================
          TOP SUMMARY
      ===================================== */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">


        {/* CURRENT RISK */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

          <p className="text-sm text-slate-500">
            Current Risk
          </p>

          <div className="flex items-end gap-2 mt-2">

            <span
              className={`text-4xl font-bold ${getRiskColor(
                currentRisk
              )}`}
            >
              {currentRisk}
            </span>

            <span className="text-sm text-slate-400 mb-1">
              / 100
            </span>

          </div>

          <p
            className={`text-sm font-semibold mt-2 ${getRiskColor(
              currentRisk
            )}`}
          >
            {getRiskLevel(currentRisk)}
          </p>

        </div>


        {/* TREND */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

          <p className="text-sm text-slate-500">
            Risk Trend
          </p>

          <div
            className={`inline-flex items-center gap-2 mt-3 px-3 py-2 rounded-lg font-bold text-sm ${trend.className}`}
          >

            {trend.icon}

            {trend.label}

          </div>

          <p className="text-xs text-slate-400 mt-3">
            Change until projected peak: +{riskChange} points
          </p>

        </div>


        {/* PEAK */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

          <p className="text-sm text-slate-500">
            Projected Peak
          </p>

          <div className="flex items-end gap-2 mt-2">

            <span className="text-4xl font-bold text-slate-900">
              {peakForecast}
            </span>

            <span className="text-sm text-slate-400 mb-1">
              / 100
            </span>

          </div>

          <p className="text-sm font-semibold text-orange-600 mt-2">
            {peakTime}
          </p>

        </div>

      </div>


      {/* =====================================
          CHART
      ===================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-center justify-between mb-6">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Risk Trend — Next 48 Hours
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Projected decision-support risk score
            </p>

          </div>

          <div className="flex items-center gap-2 text-sm text-orange-600 font-semibold">
            <TrendingUp size={18} />
            {trend.label}
          </div>

        </div>


        <div className="h-[330px]">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={forecastData}
              margin={{
                top: 10,
                right: 20,
                left: 0,
                bottom: 5,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
              />

              <XAxis
                dataKey="time"
              />

              <YAxis
                domain={[0, 100]}
              />

              <Tooltip />

              <Line
                type="monotone"
                dataKey="risk"
                strokeWidth={3}
                dot={{ r: 5 }}
                activeDot={{ r: 7 }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* =====================================
          TIME FORECAST CARDS
      ===================================== */}

      <div>

        <div className="flex items-center gap-2 mb-4">

          <Clock
            size={20}
            className="text-slate-700"
          />

          <h2 className="text-lg font-bold text-slate-900">
            Forecast Timeline
          </h2>

        </div>


        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

          {forecastData.map((item) => (

            <div
              key={item.time}
              className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5"
            >

              <p className="text-xs font-semibold text-slate-400">
                {item.time}
              </p>

              <p
                className={`text-3xl font-bold mt-2 ${getRiskColor(
                  item.risk
                )}`}
              >
                {item.risk}
              </p>

              <p
                className={`text-xs font-semibold mt-1 ${getRiskColor(
                  item.risk
                )}`}
              >
                {getRiskLevel(item.risk)}
              </p>

            </div>

          ))}

        </div>

      </div>


      {/* =====================================
          CONTRIBUTING FACTORS
      ===================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <h2 className="text-lg font-bold text-slate-900">
          Key Risk Factors
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          Environmental indicators contributing to the current
          risk assessment.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">


          {/* RAINFALL */}

          <FactorCard
            icon={<CloudRain size={21} />}
            title="Rainfall"
            value={`${selectedZone?.rainfall_24h || 0} mm`}
            description="24-hour rainfall"
          />


          {/* SOIL */}

          <FactorCard
            icon={<Droplets size={21} />}
            title="Soil Moisture"
            value={`${selectedZone?.soil_moisture || 0}%`}
            description="Estimated moisture level"
          />


          {/* SLOPE */}

          <FactorCard
            icon={<Mountain size={21} />}
            title="Slope"
            value={`${selectedZone?.slope || 0}°`}
            description="Terrain slope"
          />

        </div>

      </div>


      {/* =====================================
          ACTION
      ===================================== */}

      <div className="bg-slate-900 rounded-2xl p-6 text-white">

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

          <div>

            <div className="flex items-center gap-2">

              <AlertTriangle size={20} />

              <h2 className="font-bold">
                Recommended Next Step
              </h2>

            </div>

            <p className="text-sm text-slate-300 mt-2 max-w-2xl">

              Review the projected risk increase and prioritise
              field verification and connectivity assessment for
              zones showing elevated forecast risk.

            </p>

          </div>


          <Link
            to={`/zone/${selectedZone?.zone_id}`}
            className="inline-flex items-center justify-center gap-2 bg-white text-slate-900 px-5 py-3 rounded-xl font-semibold hover:bg-slate-100 transition"
          >

            View Zone Details

            <ArrowRight size={17} />

          </Link>

        </div>

      </div>


      {/* =====================================
          DISCLAIMER
      ===================================== */}

      <div className="text-xs text-slate-400 bg-slate-50 rounded-xl p-4">

        ⚠️ Forecast values shown in this prototype are
        decision-support estimates. They are not guaranteed
        landslide predictions and should be validated using
        authoritative weather, terrain and field observations.

      </div>

    </div>

  );
}


/* =========================================
   FACTOR CARD
========================================= */

function FactorCard({
  icon,
  title,
  value,
  description,
}) {

  return (

    <div className="border border-slate-200 rounded-xl p-5">

      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">
        {icon}
      </div>

      <h3 className="font-semibold text-slate-900 mt-4">
        {title}
      </h3>

      <p className="text-2xl font-bold text-slate-900 mt-1">
        {value}
      </p>

      <p className="text-xs text-slate-400 mt-1">
        {description}
      </p>

    </div>

  );
}


export default Forecast;