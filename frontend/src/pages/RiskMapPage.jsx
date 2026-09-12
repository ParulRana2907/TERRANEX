import RiskMap from "../components/RiskMap";

function RiskMapPage() {

  return (

    <div className="p-6 md:p-8">

      <div className="mb-6">

        <p className="text-sm text-slate-500">
          TERRANEX / Geospatial Intelligence
        </p>

        <h1 className="text-3xl font-bold text-slate-900 mt-1">
          Risk Map
        </h1>

        <p className="text-slate-500 mt-2">
          Geospatial view of terrain risk and exposed zones.
        </p>

      </div>


      {/* MAP */}

      <RiskMap />


      {/* INFORMATION */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">

        <InfoCard
          title="Risk Zones"
          value="4"
          description="Zones currently monitored"
        />

        <InfoCard
          title="High / Critical"
          value="2"
          description="Zones requiring attention"
        />

        <InfoCard
          title="Data Source"
          value="TERRANEX"
          description="Prototype decision-support data"
        />

      </div>

    </div>
  );
}


function InfoCard({
  title,
  value,
  description,
}) {

  return (

    <div className="bg-white border border-slate-200 rounded-xl p-5">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <p className="text-2xl font-bold mt-2">
        {value}
      </p>

      <p className="text-xs text-slate-500 mt-1">
        {description}
      </p>

    </div>
  );
}


export default RiskMapPage;