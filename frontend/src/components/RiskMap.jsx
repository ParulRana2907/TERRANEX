import { useState } from "react";

import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
} from "react-leaflet";

import { Link } from "react-router-dom";

import { zones } from "../data/mockData";


/* =========================
   RISK COLOR
========================= */

function getRiskColor(riskLevel) {

  switch (riskLevel) {

    case "CRITICAL":
      return "red";

    case "HIGH":
      return "orange";

    case "MODERATE":
      return "yellow";

    case "LOW":
      return "green";

    default:
      return "gray";
  }
}


/* =========================
   RISK TEXT COLOR
========================= */

function getRiskTextColor(riskLevel) {

  switch (riskLevel) {

    case "CRITICAL":
      return "text-red-600";

    case "HIGH":
      return "text-orange-600";

    case "MODERATE":
      return "text-yellow-600";

    case "LOW":
      return "text-green-600";

    default:
      return "text-slate-600";
  }
}


/* =========================
   MAIN RISK MAP
========================= */

function RiskMap() {

  /* Risk layer ON/OFF */

  const [showRisk, setShowRisk] = useState(true);


  return (

    <div className="relative w-full h-[600px] rounded-2xl overflow-hidden border border-slate-200">


      {/* =========================
          MAP
      ========================= */}

      <MapContainer
        center={[27.8, 93.5]}
        zoom={7}
        scrollWheelZoom={true}
        className="w-full h-full"
      >


        {/* =========================
            MAP BACKGROUND
        ========================= */}

        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />


        {/* =========================
            RISK ZONES
        ========================= */}

        {showRisk && zones.map((zone) => (

          <CircleMarker

            key={zone.zone_id}

            center={[
              zone.latitude,
              zone.longitude,
            ]}

            radius={14}

            pathOptions={{
              color: getRiskColor(zone.risk_level),

              fillColor: getRiskColor(
                zone.risk_level
              ),

              fillOpacity: 0.7,

              weight: 3,
            }}

          >

            {/* =========================
                POPUP
            ========================= */}

            <Popup>

              <div className="min-w-[210px]">


                {/* ZONE NAME */}

                <h3 className="text-lg font-bold text-slate-900">

                  {zone.name}

                </h3>


                {/* ZONE ID */}

                <p className="text-xs text-slate-500 mt-1">

                  Zone ID: {zone.zone_id}

                </p>


                {/* =========================
                    RISK SCORE
                ========================= */}

                <div className="mt-4">

                  <p className="text-xs text-slate-500">

                    Risk Score

                  </p>


                  <div className="flex items-center gap-2">

                    <span className="text-2xl font-bold">

                      {zone.risk_score}

                    </span>


                    <span className="text-sm text-slate-500">

                      / 100

                    </span>

                  </div>


                  <p
                    className={`text-sm font-semibold ${getRiskTextColor(
                      zone.risk_level
                    )}`}
                  >

                    {zone.risk_level}

                  </p>

                </div>


                {/* =========================
                    WEATHER INFORMATION
                ========================= */}

                <div className="mt-4 text-sm space-y-1">

                  <p>

                    🌧️ Rainfall:{" "}

                    <strong>

                      {zone.rainfall_24h} mm

                    </strong>

                  </p>


                  <p>

                    💧 Soil Moisture:{" "}

                    <strong>

                      {zone.soil_moisture}%

                    </strong>

                  </p>


                  <p>

                    ⛰️ Slope:{" "}

                    <strong>

                      {zone.slope}°

                    </strong>

                  </p>

                </div>


                {/* =========================
                    ZONE DETAILS BUTTON
                ========================= */}

                <Link

                  to={`/zone/${zone.zone_id}`}

                  className="block text-center mt-4 px-3 py-2 bg-slate-900 text-white rounded-lg text-sm hover:bg-slate-800"

                >

                  View Zone Details →

                </Link>


              </div>

            </Popup>

          </CircleMarker>

        ))}

      </MapContainer>


      {/* =================================================
          MAP LAYER CONTROL
      ================================================= */}

      <div className="absolute top-5 left-5 z-[1000] bg-white rounded-xl shadow-lg border border-slate-200 p-4 w-56">


        {/* TITLE */}

        <div className="flex items-center justify-between mb-4">

          <p className="text-sm font-bold text-slate-900">

            Map Layers

          </p>


          <span className="text-xs text-slate-400">

            GIS

          </span>

        </div>


        {/* =========================
            LANDSLIDE RISK
        ========================= */}

        <label className="flex items-center gap-3 text-sm mb-3 cursor-pointer">

          <input

            type="checkbox"

            checked={showRisk}

            onChange={(e) =>
              setShowRisk(e.target.checked)
            }

            className="w-4 h-4"

          />

          <span className="text-slate-700">

            Landslide Risk

          </span>

        </label>


        {/* =========================
            RAINFALL
        ========================= */}

        <label className="flex items-center gap-3 text-sm mb-3 cursor-pointer">

          <input
            type="checkbox"
            className="w-4 h-4"
          />

          <span className="text-slate-700">

            Rainfall

          </span>

        </label>


        {/* =========================
            FORECAST RAINFALL
        ========================= */}

        <label className="flex items-center gap-3 text-sm mb-3 cursor-pointer">

          <input
            type="checkbox"
            className="w-4 h-4"
          />

          <span className="text-slate-700">

            Forecast Rainfall

          </span>

        </label>


        {/* =========================
            ROADS
        ========================= */}

        <label className="flex items-center gap-3 text-sm mb-3 cursor-pointer">

          <input
            type="checkbox"
            className="w-4 h-4"
          />

          <span className="text-slate-700">

            Roads

          </span>

        </label>


        {/* =========================
            VILLAGES
        ========================= */}

        <label className="flex items-center gap-3 text-sm mb-3 cursor-pointer">

          <input
            type="checkbox"
            className="w-4 h-4"
          />

          <span className="text-slate-700">

            Villages

          </span>

        </label>


        {/* =========================
            FIELD REPORTS
        ========================= */}

        <label className="flex items-center gap-3 text-sm cursor-pointer">

          <input
            type="checkbox"
            className="w-4 h-4"
          />

          <span className="text-slate-700">

            Field Reports

          </span>

        </label>


        {/* =========================
            FUTURE LAYERS NOTE
        ========================= */}

        <div className="border-t border-slate-100 mt-4 pt-3">

          <p className="text-[11px] text-slate-400">

            Additional GIS layers will be connected
            when spatial data is available.

          </p>

        </div>

      </div>


      {/* =================================================
          MAP LEGEND
      ================================================= */}

      <div className="absolute bottom-5 right-5 z-[1000] bg-white rounded-xl shadow-lg border border-slate-200 p-4">


        <p className="text-sm font-semibold mb-3">

          Risk Level

        </p>


        <div className="space-y-2 text-xs">


          <LegendItem
            color="bg-red-500"
            label="Critical"
          />


          <LegendItem
            color="bg-orange-500"
            label="High"
          />


          <LegendItem
            color="bg-yellow-400"
            label="Moderate"
          />


          <LegendItem
            color="bg-green-500"
            label="Low"
          />


        </div>

      </div>

    </div>
  );
}


/* =================================================
   LEGEND ITEM
================================================= */

function LegendItem({ color, label }) {

  return (

    <div className="flex items-center gap-2">

      <span
        className={`w-3 h-3 rounded-full ${color}`}
      />

      <span>

        {label}

      </span>

    </div>

  );
}


export default RiskMap;