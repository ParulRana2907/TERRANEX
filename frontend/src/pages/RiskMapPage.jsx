import RiskMap from "../components/RiskMap";

function RiskMapPage() {
  return (
    <div className="p-6">

      <div className="mb-5">

        <h1 className="text-2xl font-bold text-slate-900">
          Terrain Risk Map
        </h1>

        <p className="text-slate-500 mt-1">
          Geospatial visualization of terrain risk zones
        </p>

      </div>

      <div className="bg-white rounded-xl border border-slate-200
        overflow-hidden h-[650px]">

        <RiskMap />

      </div>

    </div>
  );
}

export default RiskMapPage;