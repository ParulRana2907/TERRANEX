function RiskBadge({ level }) {
  const styles = {
    VERY_LOW: "bg-green-100 text-green-700",
    LOW: "bg-lime-100 text-lime-700",
    MODERATE: "bg-yellow-100 text-yellow-700",
    HIGH: "bg-orange-100 text-orange-700",
    CRITICAL: "bg-red-100 text-red-700",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${
        styles[level] || "bg-slate-100 text-slate-700"
      }`}
    >
      {level?.replace("_", " ")}
    </span>
  );
}

export default RiskBadge;