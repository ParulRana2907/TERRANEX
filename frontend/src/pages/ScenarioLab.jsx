import { useState } from "react";

import {
  CloudRain,
  Droplets,
  Cloud,
  Play,
  RotateCcw,
  AlertTriangle,
  Users,
  Route,
  TrendingUp,
} from "lucide-react";

import { zones } from "../data/mockData";


function ScenarioLab() {

  // -----------------------------
  // SCENARIO INPUTS
  // -----------------------------

  const [rainfall, setRainfall] = useState(86);

  const [soilMoisture, setSoilMoisture] = useState(71);

  const [forecastRainfall, setForecastRainfall] = useState(42);

  const [scenarioRun, setScenarioRun] = useState(false);


  // -----------------------------
  // CURRENT DATA
  // -----------------------------

  const currentRiskZones = zones.filter(
    (zone) =>
      zone.risk_level === "HIGH" ||
      zone.risk_level === "CRITICAL"
  ).length;


  const currentCriticalZones = zones.filter(
    (zone) =>
      zone.risk_level === "CRITICAL"
  ).length;


  const currentPopulation = zones.reduce(
    (total, zone) =>
      total + (zone.population_exposed || 0),
    0
  );


  const currentRoads = zones.reduce(
    (total, zone) =>
      total + (zone.roads_affected || 0),
    0
  );


  // -----------------------------
  // SIMULATION LOGIC
  // -----------------------------

  const simulatedRiskZones = Math.min(
    zones.length,

    Math.max(
      currentRiskZones,

      Math.round(
        currentRiskZones +
        (rainfall - 60) / 10 +
        (soilMoisture - 50) / 15
      )
    )
  );


  const simulatedCriticalZones = Math.min(
    simulatedRiskZones,

    Math.max(
      currentCriticalZones,

      Math.round(
        currentCriticalZones +
        (rainfall - 70) / 15 +
        (soilMoisture - 60) / 20
      )
    )
  );


  const populationMultiplier =
    1 +
    Math.max(0, rainfall - 60) / 150 +
    Math.max(0, soilMoisture - 50) / 200;


  const simulatedPopulation = Math.round(
    currentPopulation * populationMultiplier
  );


  const roadMultiplier =
    1 +
    Math.max(0, rainfall - 60) / 180 +
    Math.max(0, forecastRainfall - 30) / 150;


  const simulatedRoads = Math.round(
    currentRoads * roadMultiplier
  );


  // -----------------------------
  // BUTTON FUNCTIONS
  // -----------------------------

  function runScenario() {

    setScenarioRun(true);

  }


  function resetScenario() {

    setRainfall(86);

    setSoilMoisture(71);

    setForecastRainfall(42);

    setScenarioRun(false);

  }


  return (

    <div className="p-6 lg:p-8 space-y-6">

      {/* ================= HEADER ================= */}

      <div>

        <p className="text-sm font-medium text-blue-600">
          Decision Support
        </p>

        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          Scenario Lab
        </h1>

        <p className="text-slate-500 mt-2 max-w-3xl">
          Simulate changing environmental conditions and assess
          potential changes in terrain risk and impact.
        </p>

      </div>


      {/* ================= MAIN SECTION ================= */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">


        {/* ================= INPUT PANEL ================= */}

        <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

          <div className="flex items-center justify-between mb-6">

            <div>

              <h2 className="text-lg font-bold text-slate-900">
                Scenario Inputs
              </h2>

              <p className="text-xs text-slate-500 mt-1">
                Adjust environmental conditions
              </p>

            </div>

            <CloudRain
              size={25}
              className="text-blue-600"
            />

          </div>


          {/* RAINFALL */}

          <div className="mb-7">

            <div className="flex items-center justify-between mb-2">

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                <CloudRain size={18} />

                Rainfall

              </label>

              <span className="font-bold text-blue-600">
                {rainfall} mm
              </span>

            </div>


            <input
              type="range"
              min="0"
              max="200"
              value={rainfall}
              onChange={(e) =>
                setRainfall(Number(e.target.value))
              }
              className="w-full"
            />


            <div className="flex justify-between text-xs text-slate-400 mt-1">

              <span>0 mm</span>

              <span>200 mm</span>

            </div>

          </div>


          {/* SOIL MOISTURE */}

          <div className="mb-7">

            <div className="flex items-center justify-between mb-2">

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                <Droplets size={18} />

                Soil Moisture

              </label>

              <span className="font-bold text-blue-600">
                {soilMoisture}%
              </span>

            </div>


            <input
              type="range"
              min="0"
              max="100"
              value={soilMoisture}
              onChange={(e) =>
                setSoilMoisture(Number(e.target.value))
              }
              className="w-full"
            />


            <div className="flex justify-between text-xs text-slate-400 mt-1">

              <span>0%</span>

              <span>100%</span>

            </div>

          </div>


          {/* FORECAST RAINFALL */}

          <div className="mb-8">

            <div className="flex items-center justify-between mb-2">

              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700">

                <Cloud size={18} />

                Forecast Rainfall

              </label>

              <span className="font-bold text-blue-600">
                {forecastRainfall} mm
              </span>

            </div>


            <input
              type="range"
              min="0"
              max="150"
              value={forecastRainfall}
              onChange={(e) =>
                setForecastRainfall(Number(e.target.value))
              }
              className="w-full"
            />


            <div className="flex justify-between text-xs text-slate-400 mt-1">

              <span>0 mm</span>

              <span>150 mm</span>

            </div>

          </div>


          {/* BUTTONS */}

          <div className="flex gap-3">

            <button
              onClick={runScenario}
              className="flex-1 flex items-center justify-center gap-2 bg-slate-900 text-white px-4 py-3 rounded-xl font-semibold hover:bg-slate-800 transition"
            >

              <Play size={17} />

              Run Scenario

            </button>


            <button
              onClick={resetScenario}
              className="px-4 py-3 border border-slate-200 rounded-xl hover:bg-slate-50 transition"
            >

              <RotateCcw size={18} />

            </button>

          </div>

        </div>


        {/* ================= RESULT PANEL ================= */}

        <div className="lg:col-span-2 space-y-6">


          {/* RESULT HEADER */}

          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-lg font-bold text-slate-900">
                  Scenario Result
                </h2>

                <p className="text-sm text-slate-500 mt-1">

                  {scenarioRun
                    ? "Simulated impact based on selected conditions"
                    : "Adjust inputs and run a scenario"}

                </p>

              </div>


              {scenarioRun && (

                <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-orange-50 text-orange-700 text-sm font-semibold">

                  <TrendingUp size={16} />

                  Risk Increased

                </div>

              )}

            </div>

          </div>


          {/* RESULT CARDS */}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">


            <ResultCard
              icon={<AlertTriangle size={21} />}
              title="High/Critical Risk Zones"
              current={currentRiskZones}
              simulated={
                scenarioRun
                  ? simulatedRiskZones
                  : currentRiskZones
              }
            />


            <ResultCard
              icon={<AlertTriangle size={21} />}
              title="Critical Zones"
              current={currentCriticalZones}
              simulated={
                scenarioRun
                  ? simulatedCriticalZones
                  : currentCriticalZones
              }
            />


            <ResultCard
              icon={<Users size={21} />}
              title="Population Exposed"
              current={currentPopulation}
              simulated={
                scenarioRun
                  ? simulatedPopulation
                  : currentPopulation
              }
            />


            <ResultCard
              icon={<Route size={21} />}
              title="Roads Potentially Affected"
              current={currentRoads}
              simulated={
                scenarioRun
                  ? simulatedRoads
                  : currentRoads
              }
            />

          </div>


          {/* DECISION SUPPORT */}

          {scenarioRun && (

            <div className="bg-orange-50 border border-orange-200 rounded-2xl p-6">

              <div className="flex gap-4">

                <div className="w-10 h-10 rounded-xl bg-orange-100 flex items-center justify-center shrink-0">

                  <AlertTriangle
                    size={21}
                    className="text-orange-600"
                  />

                </div>


                <div>

                  <h3 className="font-bold text-orange-900">
                    Decision Support Insight
                  </h3>

                  <p className="text-sm text-orange-800 mt-2 leading-6">

                    The simulated conditions indicate a potential
                    increase in terrain risk and exposure. Authorities
                    should consider prioritising field verification,
                    route assessment and preparedness activities in
                    affected zones.

                  </p>

                </div>

              </div>

            </div>

          )}

        </div>

      </div>


      {/* ================= WORKFLOW ================= */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <h2 className="text-lg font-bold text-slate-900">
          How Scenario Simulation Works
        </h2>

        <p className="text-sm text-slate-500 mt-1">
          TERRANEX uses changing environmental inputs to support
          what-if risk assessment.
        </p>


        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">

          <FlowStep
            number="01"
            title="Adjust Inputs"
            text="Rainfall, soil moisture and forecast rainfall"
          />


          <FlowStep
            number="02"
            title="Run Model"
            text="Risk model evaluates changed conditions"
          />


          <FlowStep
            number="03"
            title="Assess Impact"
            text="Population, roads and facilities are evaluated"
          />


          <FlowStep
            number="04"
            title="Prioritise"
            text="Response priority can be recalculated"
          />


          <FlowStep
            number="05"
            title="Act"
            text="Authorities can plan field verification"
          />

        </div>

      </div>


      {/* ================= DISCLAIMER ================= */}

      <div className="text-xs text-slate-400 bg-slate-50 rounded-xl p-4">

        ⚠️ Scenario outputs are prototype decision-support estimates.
        They are not guaranteed landslide predictions and should be
        validated using authoritative environmental and field data.

      </div>

    </div>

  );
}


/* =====================================================
   RESULT CARD
===================================================== */

function ResultCard({
  icon,
  title,
  current,
  simulated,
}) {

  const difference = simulated - current;


  return (

    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-5">

      <div className="flex items-center gap-3">

        <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-700">

          {icon}

        </div>


        <p className="text-sm font-semibold text-slate-600">
          {title}
        </p>

      </div>


      <div className="flex items-end gap-4 mt-5">


        <div>

          <p className="text-xs text-slate-400">
            Current
          </p>

          <p className="text-2xl font-bold text-slate-900">
            {current.toLocaleString()}
          </p>

        </div>


        <div className="text-slate-300 text-xl">
          →
        </div>


        <div>

          <p className="text-xs text-slate-400">
            Simulated
          </p>

          <p className="text-2xl font-bold text-orange-600">
            {simulated.toLocaleString()}
          </p>

        </div>

      </div>


      <div className="mt-3">

        {difference > 0 ? (

          <span className="text-xs font-semibold text-orange-600">

            ↑ +{difference.toLocaleString()} potential increase

          </span>

        ) : (

          <span className="text-xs text-slate-400">

            No significant change

          </span>

        )}

      </div>

    </div>

  );
}


/* =====================================================
   FLOW STEP
===================================================== */

function FlowStep({
  number,
  title,
  text,
}) {

  return (

    <div className="border border-slate-200 rounded-xl p-4">

      <span className="text-xs font-bold text-blue-600">
        {number}
      </span>


      <h3 className="font-semibold text-slate-900 mt-2">
        {title}
      </h3>


      <p className="text-xs text-slate-500 mt-1 leading-5">
        {text}
      </p>

    </div>

  );
}


export default ScenarioLab;