import { useState } from "react";

import {
  MapPin,
  Camera,
  FileWarning,
  CheckCircle,
  Clock,
  AlertTriangle,
  Search,
  Filter,
  RefreshCw,
  Wifi,
  WifiOff,
  Eye,
} from "lucide-react";


// --------------------------------------------------
// MOCK FIELD REPORTS
// --------------------------------------------------

const initialReports = [
  {
    id: "FR-001",
    zone_id: "Z101",
    zone_name: "Tawang",
    type: "Slope Movement",
    severity: "HIGH",
    status: "VERIFIED",
    reporter: "Field Officer 01",
    description:
      "Visible slope movement reported near the roadside section.",
    time: "10 minutes ago",
    latitude: 27.586,
    longitude: 91.859,
  },

  {
    id: "FR-002",
    zone_id: "Z102",
    zone_name: "West Kameng",
    type: "Road Blockage",
    severity: "CRITICAL",
    status: "PENDING",
    reporter: "Field Officer 02",
    description:
      "Road connectivity may be affected due to debris accumulation.",
    time: "25 minutes ago",
    latitude: 27.264,
    longitude: 92.423,
  },

  {
    id: "FR-003",
    zone_id: "Z103",
    zone_name: "East Siang",
    type: "Crack",
    severity: "MODERATE",
    status: "VERIFIED",
    reporter: "Field Officer 03",
    description:
      "Surface crack observed on a slope section.",
    time: "1 hour ago",
    latitude: 28.067,
    longitude: 95.326,
  },

  {
    id: "FR-004",
    zone_id: "Z104",
    zone_name: "Dibang Valley",
    type: "Landslide",
    severity: "CRITICAL",
    status: "PENDING",
    reporter: "Field Officer 04",
    description:
      "Possible slope failure indicator reported by field team.",
    time: "2 hours ago",
    latitude: 28.700,
    longitude: 94.500,
  },

  {
    id: "FR-005",
    zone_id: "Z105",
    zone_name: "Lohit",
    type: "Water Accumulation",
    severity: "LOW",
    status: "VERIFIED",
    reporter: "Field Officer 01",
    description:
      "Water accumulation observed near a vulnerable road section.",
    time: "3 hours ago",
    latitude: 27.900,
    longitude: 96.200,
  },
];


function FieldReports() {

  const [reports, setReports] =
    useState(initialReports);

  const [search, setSearch] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("ALL");

  const [showForm, setShowForm] =
    useState(false);

  const [offlineMode, setOfflineMode] =
    useState(false);


  // --------------------------------------------------
  // FILTER REPORTS
  // --------------------------------------------------

  const filteredReports = reports.filter((report) => {

    const matchesSearch =
      report.zone_name
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      report.zone_id
        .toLowerCase()
        .includes(search.toLowerCase()) ||

      report.type
        .toLowerCase()
        .includes(search.toLowerCase());


    const matchesStatus =
      statusFilter === "ALL" ||
      report.status === statusFilter;


    return matchesSearch && matchesStatus;

  });


  // --------------------------------------------------
  // SUMMARY
  // --------------------------------------------------

  const totalReports =
    reports.length;

  const pendingReports =
    reports.filter(
      (report) =>
        report.status === "PENDING"
    ).length;

  const verifiedReports =
    reports.filter(
      (report) =>
        report.status === "VERIFIED"
    ).length;

  const criticalReports =
    reports.filter(
      (report) =>
        report.severity === "CRITICAL"
    ).length;


  // --------------------------------------------------
  // ADD REPORT
  // --------------------------------------------------

  function addReport(newReport) {

    const report = {
      ...newReport,

      id: `FR-${String(
        reports.length + 1
      ).padStart(3, "0")}`,

      time: "Just now",

      status: offlineMode
        ? "PENDING SYNC"
        : "PENDING",

      reporter: "Current Field Officer",
    };


    setReports([
      report,
      ...reports,
    ]);

    setShowForm(false);

  }


  return (

    <div className="p-6 lg:p-8 space-y-6">

      {/* ==========================================
          HEADER
      ========================================== */}

      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

        <div>

          <p className="text-sm font-medium text-blue-600">
            Ground Intelligence
          </p>

          <h1 className="text-3xl font-bold text-slate-900 mt-1">
            Field Reports
          </h1>

          <p className="text-slate-500 mt-2 max-w-3xl">
            Monitor incident reports submitted by field
            officers and integrate ground observations into
            terrain-risk assessment.
          </p>

        </div>


        <div className="flex gap-3">

          {/* NETWORK STATUS */}

          <button
            onClick={() =>
              setOfflineMode(!offlineMode)
            }
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border text-sm font-semibold ${
              offlineMode
                ? "bg-orange-50 text-orange-700 border-orange-200"
                : "bg-green-50 text-green-700 border-green-200"
            }`}
          >

            {offlineMode ? (
              <>
                <WifiOff size={17} />
                Offline Mode
              </>
            ) : (
              <>
                <Wifi size={17} />
                Online
              </>
            )}

          </button>


          {/* ADD REPORT */}

          <button
            onClick={() =>
              setShowForm(true)
            }
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-slate-900 text-white text-sm font-semibold hover:bg-slate-800 transition"
          >

            <FileWarning size={17} />

            Report Incident

          </button>

        </div>

      </div>


      {/* ==========================================
          OFFLINE NOTICE
      ========================================== */}

      {offlineMode && (

        <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">

          <WifiOff
            size={20}
            className="text-orange-600 mt-0.5"
          />

          <div>

            <p className="font-semibold text-orange-900">
              Offline reporting enabled
            </p>

            <p className="text-sm text-orange-800 mt-1">
              New reports will be stored locally as
              pending sync items and can be synchronized
              when connectivity is restored.
            </p>

          </div>

        </div>

      )}


      {/* ==========================================
          SUMMARY CARDS
      ========================================== */}

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">

        <SummaryCard
          icon={<FileWarning size={21} />}
          title="Total Reports"
          value={totalReports}
          description="All field submissions"
        />

        <SummaryCard
          icon={<Clock size={21} />}
          title="Pending"
          value={pendingReports}
          description="Awaiting verification"
        />

        <SummaryCard
          icon={<CheckCircle size={21} />}
          title="Verified"
          value={verifiedReports}
          description="Reviewed reports"
        />

        <SummaryCard
          icon={<AlertTriangle size={21} />}
          title="Critical Reports"
          value={criticalReports}
          description="Require attention"
        />

      </div>


      {/* ==========================================
          REPORT LIST
      ========================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm">

        {/* FILTER BAR */}

        <div className="p-5 border-b border-slate-200">

          <div className="flex flex-col md:flex-row gap-3">

            {/* SEARCH */}

            <div className="relative flex-1">

              <Search
                size={18}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                placeholder="Search zone, ID or incident type..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border border-slate-200 rounded-xl pl-10 pr-4 py-3 text-sm outline-none focus:ring-2 focus:ring-slate-200"
              />

            </div>


            {/* STATUS FILTER */}

            <div className="relative">

              <Filter
                size={17}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={statusFilter}
                onChange={(e) =>
                  setStatusFilter(e.target.value)
                }
                className="border border-slate-200 rounded-xl pl-9 pr-8 py-3 text-sm bg-white"
              >

                <option value="ALL">
                  All Status
                </option>

                <option value="PENDING">
                  Pending
                </option>

                <option value="VERIFIED">
                  Verified
                </option>

              </select>

            </div>

          </div>

        </div>


        {/* DESKTOP TABLE */}

        <div className="hidden lg:block overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 bg-slate-50">

                <th className="text-left text-xs font-semibold text-slate-500 uppercase px-5 py-4">
                  Report
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase px-5 py-4">
                  Zone
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase px-5 py-4">
                  Severity
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase px-5 py-4">
                  Status
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase px-5 py-4">
                  Reporter
                </th>

                <th className="text-left text-xs font-semibold text-slate-500 uppercase px-5 py-4">
                  Time
                </th>

                <th className="text-right text-xs font-semibold text-slate-500 uppercase px-5 py-4">
                  Action
                </th>

              </tr>

            </thead>


            <tbody>

              {filteredReports.map((report) => (

                <tr
                  key={report.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >

                  <td className="px-5 py-4">

                    <div className="flex items-center gap-3">

                      <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center">

                        <FileWarning
                          size={19}
                          className="text-slate-700"
                        />

                      </div>

                      <div>

                        <p className="font-semibold text-slate-900">
                          {report.id}
                        </p>

                        <p className="text-xs text-slate-500">
                          {report.type}
                        </p>

                      </div>

                    </div>

                  </td>


                  <td className="px-5 py-4">

                    <p className="font-semibold text-slate-900">
                      {report.zone_name}
                    </p>

                    <p className="text-xs text-slate-400">
                      {report.zone_id}
                    </p>

                  </td>


                  <td className="px-5 py-4">

                    <SeverityBadge
                      severity={report.severity}
                    />

                  </td>


                  <td className="px-5 py-4">

                    <StatusBadge
                      status={report.status}
                    />

                  </td>


                  <td className="px-5 py-4 text-sm text-slate-600">
                    {report.reporter}
                  </td>


                  <td className="px-5 py-4 text-sm text-slate-500">
                    {report.time}
                  </td>


                  <td className="px-5 py-4 text-right">

                    <button
                      className="inline-flex items-center gap-2 px-3 py-2 border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-100"
                    >

                      <Eye size={16} />

                      View

                    </button>

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>


        {/* MOBILE CARDS */}

        <div className="lg:hidden p-4 space-y-4">

          {filteredReports.map((report) => (

            <div
              key={report.id}
              className="border border-slate-200 rounded-xl p-4"
            >

              <div className="flex justify-between gap-3">

                <div>

                  <p className="font-bold text-slate-900">
                    {report.id}
                  </p>

                  <p className="text-sm text-slate-500 mt-1">
                    {report.type}
                  </p>

                </div>

                <SeverityBadge
                  severity={report.severity}
                />

              </div>


              <div className="mt-4 space-y-2 text-sm">

                <p>
                  <span className="text-slate-400">
                    Zone:
                  </span>{" "}
                  <strong>
                    {report.zone_name}
                  </strong>
                </p>

                <p>
                  <span className="text-slate-400">
                    Reporter:
                  </span>{" "}
                  {report.reporter}
                </p>

                <p>
                  <span className="text-slate-400">
                    Time:
                  </span>{" "}
                  {report.time}
                </p>

              </div>


              <div className="mt-4 flex items-center justify-between">

                <StatusBadge
                  status={report.status}
                />

                <button className="text-sm font-semibold text-slate-700">
                  View →
                </button>

              </div>

            </div>

          ))}

        </div>


        {/* EMPTY STATE */}

        {filteredReports.length === 0 && (

          <div className="p-12 text-center">

            <FileWarning
              size={35}
              className="mx-auto text-slate-300"
            />

            <p className="font-semibold text-slate-700 mt-3">
              No reports found
            </p>

            <p className="text-sm text-slate-400 mt-1">
              Try changing your search or filter.
            </p>

          </div>

        )}

      </div>


      {/* ==========================================
          FIELD REPORT WORKFLOW
      ========================================== */}

      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">

        <div className="flex items-center justify-between">

          <div>

            <h2 className="text-lg font-bold text-slate-900">
              Field Intelligence Workflow
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              How field observations flow into TERRANEX.
            </p>

          </div>

          <RefreshCw
            size={22}
            className="text-slate-500"
          />

        </div>


        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mt-6">

          <WorkflowStep
            number="01"
            title="Field Observation"
            text="Officer observes a terrain or infrastructure condition."
          />

          <WorkflowStep
            number="02"
            title="Report"
            text="GPS, photo, severity and description are captured."
          />

          <WorkflowStep
            number="03"
            title="Sync"
            text="Report is uploaded or queued for later synchronization."
          />

          <WorkflowStep
            number="04"
            title="Verify"
            text="Authority reviews and verifies the field information."
          />

          <WorkflowStep
            number="05"
            title="Update Risk"
            text="Verified intelligence can support risk and priority updates."
          />

        </div>

      </div>


      {/* ==========================================
          REPORT FORM
      ========================================== */}

      {showForm && (

        <ReportForm
          offlineMode={offlineMode}
          onClose={() =>
            setShowForm(false)
          }
          onSubmit={addReport}
        />

      )}

    </div>

  );
}


/* ==================================================
   SUMMARY CARD
================================================== */

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


/* ==================================================
   SEVERITY BADGE
================================================== */

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
        styles[severity] ||
        "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >

      {severity}

    </span>

  );
}


/* ==================================================
   STATUS BADGE
================================================== */

function StatusBadge({ status }) {

  const styles = {

    VERIFIED:
      "bg-green-50 text-green-700 border-green-200",

    PENDING:
      "bg-yellow-50 text-yellow-700 border-yellow-200",

    "PENDING SYNC":
      "bg-orange-50 text-orange-700 border-orange-200",

  };


  return (

    <span
      className={`inline-flex px-2.5 py-1 rounded-lg border text-xs font-semibold ${
        styles[status] ||
        "bg-slate-50 text-slate-600 border-slate-200"
      }`}
    >

      {status}

    </span>

  );
}


/* ==================================================
   WORKFLOW STEP
================================================== */

function WorkflowStep({
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

      <p className="text-xs text-slate-500 mt-2 leading-5">
        {text}
      </p>

    </div>

  );
}


/* ==================================================
   REPORT FORM
================================================== */

function ReportForm({
  offlineMode,
  onClose,
  onSubmit,
}) {

  const [type, setType] =
    useState("Landslide");

  const [severity, setSeverity] =
    useState("HIGH");

  const [zoneId, setZoneId] =
    useState("Z101");

  const [zoneName, setZoneName] =
    useState("Tawang");

  const [description, setDescription] =
    useState("");


  function handleSubmit(e) {

    e.preventDefault();


    onSubmit({

      zone_id: zoneId,

      zone_name: zoneName,

      type,

      severity,

      description,

      latitude: 27.586,

      longitude: 91.859,

    });

  }


  return (

    <div className="fixed inset-0 z-[2000] bg-slate-900/50 flex items-center justify-center p-4">

      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">

        {/* HEADER */}

        <div className="flex items-center justify-between p-6 border-b border-slate-200">

          <div>

            <h2 className="text-xl font-bold text-slate-900">
              Report Incident
            </h2>

            <p className="text-sm text-slate-500 mt-1">
              Submit ground-level field intelligence.
            </p>

          </div>


          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-700 text-2xl"
          >
            ×
          </button>

        </div>


        <form
          onSubmit={handleSubmit}
          className="p-6 space-y-5"
        >

          {/* INCIDENT TYPE */}

          <div>

            <label className="text-sm font-semibold text-slate-700">
              Incident Type
            </label>

            <select
              value={type}
              onChange={(e) =>
                setType(e.target.value)
              }
              className="w-full mt-2 border border-slate-200 rounded-xl px-4 py-3"
            >

              <option>
                Landslide
              </option>

              <option>
                Slope Movement
              </option>

              <option>
                Road Blockage
              </option>

              <option>
                Crack
              </option>

              <option>
                Water Accumulation
              </option>

              <option>
                Other
              </option>

            </select>

          </div>


          {/* SEVERITY */}

          <div>

            <label className="text-sm font-semibold text-slate-700">
              Severity
            </label>

            <select
              value={severity}
              onChange={(e) =>
                setSeverity(e.target.value)
              }
              className="w-full mt-2 border border-slate-200 rounded-xl px-4 py-3"
            >

              <option>
                LOW
              </option>

              <option>
                MODERATE
              </option>

              <option>
                HIGH
              </option>

              <option>
                CRITICAL
              </option>

            </select>

          </div>


          {/* ZONE */}

          <div className="grid grid-cols-2 gap-3">

            <div>

              <label className="text-sm font-semibold text-slate-700">
                Zone ID
              </label>

              <input
                value={zoneId}
                onChange={(e) =>
                  setZoneId(e.target.value)
                }
                className="w-full mt-2 border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>


            <div>

              <label className="text-sm font-semibold text-slate-700">
                Zone Name
              </label>

              <input
                value={zoneName}
                onChange={(e) =>
                  setZoneName(e.target.value)
                }
                className="w-full mt-2 border border-slate-200 rounded-xl px-4 py-3"
              />

            </div>

          </div>


          {/* LOCATION */}

          <div>

            <label className="text-sm font-semibold text-slate-700">
              Location
            </label>

            <div className="mt-2 flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-3">

              <MapPin
                size={18}
                className="text-slate-500"
              />

              <span className="text-sm text-slate-600">
                GPS location captured
              </span>

              <CheckCircle
                size={17}
                className="text-green-600 ml-auto"
              />

            </div>

          </div>


          {/* PHOTO */}

          <div>

            <label className="text-sm font-semibold text-slate-700">
              Photo Evidence
            </label>

            <label className="mt-2 flex items-center justify-center gap-2 border-2 border-dashed border-slate-200 rounded-xl p-6 cursor-pointer hover:bg-slate-50">

              <Camera
                size={22}
                className="text-slate-500"
              />

              <span className="text-sm text-slate-500">
                Select field photo
              </span>

              <input
                type="file"
                accept="image/*"
                className="hidden"
              />

            </label>

          </div>


          {/* DESCRIPTION */}

          <div>

            <label className="text-sm font-semibold text-slate-700">
              Description
            </label>

            <textarea
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              placeholder="Describe the observed condition..."
              rows="4"
              className="w-full mt-2 border border-slate-200 rounded-xl px-4 py-3 resize-none"
            />

          </div>


          {/* OFFLINE INFO */}

          {offlineMode && (

            <div className="flex gap-3 bg-orange-50 border border-orange-200 rounded-xl p-4">

              <WifiOff
                size={18}
                className="text-orange-600"
              />

              <p className="text-xs text-orange-800">
                You are offline. This report will be
                stored as <strong>Pending Sync</strong>.
              </p>

            </div>

          )}


          {/* BUTTONS */}

          <div className="flex gap-3 pt-2">

            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 border border-slate-200 rounded-xl font-semibold hover:bg-slate-50"
            >
              Cancel
            </button>


            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-slate-900 text-white rounded-xl font-semibold hover:bg-slate-800"
            >
              Submit Report
            </button>

          </div>

        </form>

      </div>

    </div>

  );
}


export default FieldReports;