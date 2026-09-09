import { useParams, Link } from "react-router-dom";
import { zones } from "../data/mockData";

function ZoneDetails() {
  const { zoneId } = useParams();

  const zone = zones.find(
    (item) => item.zone_id === zoneId
  );

  if (!zone) {
    return (
      <div className="p-8">
        <h1 className="text-2xl font-bold">
          Zone Not Found
        </h1>

        <Link
          to="/risk-map"
          className="text-blue-600 mt-4 inline-block"
        >
          ← Back to Risk Map
        </Link>
      </div>
    );
  }

  return (
    <div className="p-6 md:p-8">

      {/* HEADER */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

        <div>
          <p className="text-sm text-slate-500">
            TERRANEX / Risk Map / Zone Details
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            {zone.name}
          </h1>

          <p className="text-slate-500 mt-1">
            {zone.district}, {zone.state}
          </p>
        </div>

        <Link
          to="/risk-map"
          className="px-4 py-2 rounded-lg border border-slate-300 bg-white hover:bg-slate-50"
        >
          ← Back to Risk Map
        </Link>

      </div>


      {/* RISK + WEATHER */}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">

        {/* RISK CARD */}

        <div className="lg:col-span-1 bg-slate-900 text-white rounded-2xl p-6">

          <p className="text-slate-400 text-sm">
            CURRENT RISK SCORE
          </p>

          <div className="flex items-end gap-2 mt-4">

            <span className="text-6xl font-bold">
              {zone.risk_score}
            </span>

            <span className="text-slate-400 mb-2">
              / 100
            </span>

          </div>

          <div className="mt-4 inline-block px-3 py-1 rounded-full bg-red-500/20 text-red-300 text-sm font-semibold">
            {zone.risk_level}
          </div>

          <p className="text-slate-400 text-sm mt-5">
            Prototype decision-support risk score.
          </p>

        </div>


        {/* WEATHER */}

        <div className="bg-white rounded-2xl p-6 border border-slate-200">

          <h2 className="text-lg font-semibold">
            Weather Conditions
          </h2>

          <div className="grid grid-cols-2 gap-5 mt-6">

            <Metric
              label="Rainfall 1H"
              value={`${zone.rainfall_1h} mm`}
            />

            <Metric
              label="Rainfall 24H"
              value={`${zone.rainfall_24h} mm`}
            />

            <Metric
              label="Forecast Rainfall"
              value={`${zone.forecast_rainfall} mm`}
            />

            <Metric
              label="Soil Moisture"
              value={`${zone.soil_moisture}%`}
            />

          </div>

        </div>


        {/* TERRAIN */}

        <div className="bg-white rounded-2xl p-6 border border-slate-200">

          <h2 className="text-lg font-semibold">
            Terrain
          </h2>

          <div className="grid grid-cols-2 gap-5 mt-6">

            <Metric
              label="Slope"
              value={`${zone.slope}°`}
            />

            <Metric
              label="Elevation"
              value={`${zone.elevation} m`}
            />

            <Metric
              label="Latitude"
              value={zone.latitude}
            />

            <Metric
              label="Longitude"
              value={zone.longitude}
            />

          </div>

        </div>

      </div>


      {/* EXPOSURE */}

      <div className="bg-white rounded-2xl p-6 border border-slate-200 mb-6">

        <h2 className="text-xl font-semibold">
          Potential Impact & Exposure
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-6">

          <ExposureCard
            label="Population"
            value={zone.population_exposed.toLocaleString()}
          />

          <ExposureCard
            label="Villages"
            value={zone.villages_affected}
          />

          <ExposureCard
            label="Roads"
            value={zone.roads_affected}
          />

          <ExposureCard
            label="Hospitals"
            value={zone.hospitals_affected}
          />

          <ExposureCard
            label="Schools"
            value={zone.schools_affected}
          />

        </div>

      </div>


      {/* FACTORS */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        <div className="bg-white rounded-2xl p-6 border border-slate-200">

          <h2 className="text-xl font-semibold">
            Why is this zone risky?
          </h2>

          <p className="text-sm text-slate-500 mt-2">
            Key contributing factors from the risk model.
          </p>

          <div className="space-y-5 mt-6">

            {zone.top_factors.map((factor) => (

              <div key={factor.name}>

                <div className="flex justify-between mb-2">

                  <span className="text-sm font-medium">
                    {factor.name}
                  </span>

                  <span className="text-sm text-slate-500">
                    {factor.contribution}%
                  </span>

                </div>

                <div className="h-2 bg-slate-100 rounded-full overflow-hidden">

                  <div
                    className="h-full bg-slate-900 rounded-full"
                    style={{
                      width: `${factor.contribution}%`,
                    }}
                  />

                </div>

              </div>

            ))}

          </div>

        </div>


        {/* PRIORITY */}

        <div className="bg-white rounded-2xl p-6 border border-slate-200">

          <p className="text-sm text-slate-500">
            RESPONSE PRIORITY
          </p>

          <div className="flex items-end gap-2 mt-3">

            <span className="text-5xl font-bold">
              {zone.priority_score}
            </span>

            <span className="text-slate-400 mb-2">
              / 100
            </span>

          </div>

          <p className="text-slate-500 mt-4">
            This score helps decision-makers identify
            zones that may require greater attention.
          </p>

          <Link
            to="/priority"
            className="inline-block mt-6 px-5 py-3 bg-slate-900 text-white rounded-lg hover:bg-slate-800"
          >
            View Response Priority →
          </Link>

        </div>

      </div>

    </div>
  );
}


function Metric({ label, value }) {
  return (
    <div>
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-lg font-semibold mt-1">
        {value}
      </p>
    </div>
  );
}


function ExposureCard({ label, value }) {
  return (
    <div className="bg-slate-50 rounded-xl p-4">

      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

    </div>
  );
}


export default ZoneDetails;