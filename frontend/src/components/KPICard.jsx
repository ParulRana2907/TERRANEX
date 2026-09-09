function KPICard({ title, value, subtitle }) {
  return (
    <div className="bg-white rounded-xl border border-slate-200
      p-5 shadow-sm hover:shadow-md transition">

      <p className="text-sm text-slate-500">
        {title}
      </p>

      <h3 className="text-3xl font-bold text-slate-900 mt-2">
        {value}
      </h3>

      <p className="text-xs text-slate-500 mt-2">
        {subtitle}
      </p>

    </div>
  );
}

export default KPICard;