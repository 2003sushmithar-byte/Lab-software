import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import TimelineIcon from "@mui/icons-material/Timeline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import Table from "../../common components/Table";
import Pagination from "../../common components/Pagination";

interface TrackedSample {
  id: number;
  accessionNumber: string;
  patientId: string;
  patientName: string;
  testName: string;
  sampleType: string;
  barcode: string;
  currentStatus:
  | "Collected"
  | "Received"
  | "Accepted"
  | "Processing"
  | "Completed"
  | "Rejected";
  currentLocation: string;
  collectedAt: string;
  receivedAt: string;
  acceptedAt: string;
  processingAt: string;
  completedAt: string;
  lastUpdated: string;
}

const sampleData: TrackedSample[] = [
  {
    id: 1,
    accessionNumber: "ACC-2026-0001",
    patientId: "PAT-1001",
    patientName: "Arun Kumar",
    testName: "Complete Blood Count",
    sampleType: "Blood",
    barcode: "BC-100001",
    currentStatus: "Completed",
    currentLocation: "Report Section",
    collectedAt: "26 Sep 2026, 08:30 AM",
    receivedAt: "26 Sep 2026, 08:42 AM",
    acceptedAt: "26 Sep 2026, 08:50 AM",
    processingAt: "26 Sep 2026, 09:05 AM",
    completedAt: "26 Sep 2026, 10:15 AM",
    lastUpdated: "10:15 AM",
  },
  {
    id: 2,
    accessionNumber: "ACC-2026-0002",
    patientId: "PAT-1002",
    patientName: "Priya Sharma",
    testName: "Liver Function Test",
    sampleType: "Serum",
    barcode: "BC-100002",
    currentStatus: "Processing",
    currentLocation: "Biochemistry Lab",
    collectedAt: "26 Sep 2026, 08:45 AM",
    receivedAt: "26 Sep 2026, 08:57 AM",
    acceptedAt: "26 Sep 2026, 09:08 AM",
    processingAt: "26 Sep 2026, 09:20 AM",
    completedAt: "-",
    lastUpdated: "09:20 AM",
  },
  {
    id: 3,
    accessionNumber: "ACC-2026-0003",
    patientId: "PAT-1003",
    patientName: "Karthik Raj",
    testName: "Kidney Function Test",
    sampleType: "Serum",
    barcode: "BC-100003",
    currentStatus: "Accepted",
    currentLocation: "Sample Storage",
    collectedAt: "26 Sep 2026, 09:05 AM",
    receivedAt: "26 Sep 2026, 09:18 AM",
    acceptedAt: "26 Sep 2026, 09:30 AM",
    processingAt: "-",
    completedAt: "-",
    lastUpdated: "09:30 AM",
  },
  {
    id: 4,
    accessionNumber: "ACC-2026-0004",
    patientId: "PAT-1004",
    patientName: "Meena Devi",
    testName: "Urine Routine",
    sampleType: "Urine",
    barcode: "BC-100004",
    currentStatus: "Received",
    currentLocation: "Accession Desk",
    collectedAt: "26 Sep 2026, 09:25 AM",
    receivedAt: "26 Sep 2026, 09:40 AM",
    acceptedAt: "-",
    processingAt: "-",
    completedAt: "-",
    lastUpdated: "09:40 AM",
  },
  {
    id: 5,
    accessionNumber: "ACC-2026-0005",
    patientId: "PAT-1005",
    patientName: "Vijay Kumar",
    testName: "Thyroid Profile",
    sampleType: "Serum",
    barcode: "BC-100005",
    currentStatus: "Collected",
    currentLocation: "Collection Room",
    collectedAt: "26 Sep 2026, 09:50 AM",
    receivedAt: "-",
    acceptedAt: "-",
    processingAt: "-",
    completedAt: "-",
    lastUpdated: "09:50 AM",
  },
  {
    id: 6,
    accessionNumber: "ACC-2026-0006",
    patientId: "PAT-1006",
    patientName: "Lakshmi Priya",
    testName: "Blood Glucose",
    sampleType: "Plasma",
    barcode: "BC-100006",
    currentStatus: "Completed",
    currentLocation: "Report Section",
    collectedAt: "26 Sep 2026, 07:50 AM",
    receivedAt: "26 Sep 2026, 08:02 AM",
    acceptedAt: "26 Sep 2026, 08:10 AM",
    processingAt: "26 Sep 2026, 08:20 AM",
    completedAt: "26 Sep 2026, 09:00 AM",
    lastUpdated: "09:00 AM",
  },
  {
    id: 7,
    accessionNumber: "ACC-2026-0007",
    patientId: "PAT-1007",
    patientName: "Suresh Babu",
    testName: "Complete Blood Count",
    sampleType: "Blood",
    barcode: "BC-100007",
    currentStatus: "Rejected",
    currentLocation: "Rejected Sample Area",
    collectedAt: "26 Sep 2026, 08:15 AM",
    receivedAt: "26 Sep 2026, 08:28 AM",
    acceptedAt: "-",
    processingAt: "-",
    completedAt: "-",
    lastUpdated: "08:45 AM",
  },
];

const columns = [
  "Accession",
  "Patient",
  "Test",
  "Sample",
  "Current Stage",
  "Current Location",
  "Last Updated",
  "Progress",
  "Actions",
];

const stages = [
  "Collected",
  "Received",
  "Accepted",
  "Processing",
  "Completed",
];

const getStageIndex = (status: TrackedSample["currentStatus"]) => {
  if (status === "Rejected") return -1;
  return stages.indexOf(status);
};

const getStatusClasses = (status: TrackedSample["currentStatus"]) => {
  switch (status) {
    case "Collected":
      return "bg-blue-50 text-blue-700 border-blue-200";
    case "Received":
      return "bg-indigo-50 text-indigo-700 border-indigo-200";
    case "Accepted":
      return "bg-emerald-50 text-emerald-700 border-emerald-200";
    case "Processing":
      return "bg-amber-50 text-amber-700 border-amber-200";
    case "Completed":
      return "bg-green-50 text-green-700 border-green-200";
    case "Rejected":
      return "bg-red-50 text-red-700 border-red-200";
    default:
      return "bg-gray-50 text-gray-700 border-gray-200";
  }
};

const getProgressWidth = (status: TrackedSample["currentStatus"]) => {
  if (status === "Rejected") return "0%";

  const index = getStageIndex(status);

  if (index === 0) return "20%";
  if (index === 1) return "40%";
  if (index === 2) return "60%";
  if (index === 3) return "80%";
  if (index === 4) return "100%";

  return "0%";
};

const SampleTracking = () => {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredSamples = useMemo(() => {
    return sampleData.filter((sample) => {
      const search = searchTerm.toLowerCase().trim();

      const matchesSearch =
        !search ||
        sample.accessionNumber.toLowerCase().includes(search) ||
        sample.patientId.toLowerCase().includes(search) ||
        sample.patientName.toLowerCase().includes(search) ||
        sample.testName.toLowerCase().includes(search) ||
        sample.barcode.toLowerCase().includes(search);

      const matchesStatus =
        statusFilter === "All" || sample.currentStatus === statusFilter;

      const matchesLocation =
        locationFilter === "All" ||
        sample.currentLocation === locationFilter;

      return matchesSearch && matchesStatus && matchesLocation;
    });
  }, [searchTerm, statusFilter, locationFilter]);

  const currentData = filteredSamples.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const completedCount = sampleData.filter(
    (sample) => sample.currentStatus === "Completed"
  ).length;

  const rejectedCount = sampleData.filter(
    (sample) => sample.currentStatus === "Rejected"
  ).length;

  const inProgressCount = sampleData.filter(
    (sample) =>
      sample.currentStatus !== "Completed" &&
      sample.currentStatus !== "Rejected"
  ).length;

  const handleReset = () => {
    setSearchTerm("");
    setStatusFilter("All");
    setLocationFilter("All");
    setCurrentPage(1);
  };

  const renderTimeline = (sample: TrackedSample) => {
    if (sample.currentStatus === "Rejected") {
      return (
        <div className="flex items-center gap-2 min-w-[180px]">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-100">
            <CancelOutlinedIcon className="text-red-600" fontSize="small" />
          </div>

          <div>
            <p className="text-xs font-semibold text-red-700">Rejected</p>
            <p className="text-[11px] text-gray-500">Workflow stopped</p>
          </div>
        </div>
      );
    }

    const currentIndex = getStageIndex(sample.currentStatus);

    return (
      <div className="min-w-[230px]">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-2 right-2 top-2 h-0.5 bg-gray-200" />

          <div
            className="absolute left-2 top-2 h-0.5 bg-emerald-500 transition-all"
            style={{
              width:
                currentIndex === 0
                  ? "0%"
                  : `calc(${currentIndex * 25}% - 2px)`,
            }}
          />

          {stages.map((stage, index) => {
            const completed = index <= currentIndex;

            return (
              <div
                key={stage}
                className="relative z-10 flex flex-col items-center"
              >
                <div
                  className={`h-4 w-4 rounded-full border-2 ${completed
                      ? "border-emerald-500 bg-emerald-500"
                      : "border-gray-300 bg-white"
                    }`}
                />

                <span
                  className={`mt-1 text-[9px] whitespace-nowrap ${completed
                      ? "font-medium text-emerald-700"
                      : "text-gray-400"
                    }`}
                >
                  {stage}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-3 py-4 sm:px-5 lg:px-6">
      {/* Header */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate(-1)}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-gray-200 bg-white text-gray-600 shadow-sm transition hover:bg-gray-50"
          >
            <ArrowBackIcon fontSize="small" />
          </button>

          <div>
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl">
              Sample Tracking
            </h1>
            <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
              Track sample movement from collection to final report
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2">
          <TimelineIcon className="text-blue-600" fontSize="small" />
          <span className="text-xs font-semibold text-blue-700">
            Real-time Sample Journey
          </span>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">
                Total Samples
              </p>
              <h2 className="mt-1 text-2xl font-bold text-gray-800">
                {sampleData.length}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
              <ScienceOutlinedIcon className="text-blue-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">
                In Progress
              </p>
              <h2 className="mt-1 text-2xl font-bold text-amber-600">
                {inProgressCount}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50">
              <AccessTimeIcon className="text-amber-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Completed</p>
              <h2 className="mt-1 text-2xl font-bold text-green-600">
                {completedCount}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-50">
              <CheckCircleIcon className="text-green-600" />
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-gray-500">Rejected</p>
              <h2 className="mt-1 text-2xl font-bold text-red-600">
                {rejectedCount}
              </h2>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
              <CancelOutlinedIcon className="text-red-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Tracking Flow */}
      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5">
        <div className="mb-4 flex items-center gap-2">
          <TimelineIcon className="text-blue-600" />
          <h2 className="text-sm font-bold text-gray-800 sm:text-base">
            Sample Workflow
          </h2>
        </div>

        <div className="overflow-x-auto pb-2">
          <div className="mx-auto flex min-w-[620px] items-center justify-center">
            {stages.map((stage, index) => (
              <div key={stage} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-blue-50 text-sm font-bold text-blue-600">
                    {index + 1}
                  </div>

                  <span className="mt-2 text-xs font-medium text-gray-600">
                    {stage}
                  </span>
                </div>

                {index < stages.length - 1 && (
                  <div className="mx-4 h-0.5 w-16 bg-gray-200 sm:w-20" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-5 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
        <div className="mb-4 flex items-center gap-2">
          <FilterListIcon className="text-gray-600" fontSize="small" />
          <h2 className="text-sm font-semibold text-gray-800">
            Search & Filters
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-4">
          {/* Search */}
          <div className="relative xl:col-span-2">
            <SearchIcon
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
              fontSize="small"
            />

            <input
              type="text"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search accession, patient, test or barcode..."
              className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
            />
          </div>

          {/* Status */}
          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Status</option>
            <option value="Collected">Collected</option>
            <option value="Received">Received</option>
            <option value="Accepted">Accepted</option>
            <option value="Processing">Processing</option>
            <option value="Completed">Completed</option>
            <option value="Rejected">Rejected</option>
          </select>

          {/* Location */}
          <select
            value={locationFilter}
            onChange={(e) => {
              setLocationFilter(e.target.value);
              setCurrentPage(1);
            }}
            className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none focus:border-blue-500"
          >
            <option value="All">All Locations</option>
            <option value="Collection Room">Collection Room</option>
            <option value="Accession Desk">Accession Desk</option>
            <option value="Sample Storage">Sample Storage</option>
            <option value="Biochemistry Lab">Biochemistry Lab</option>
            <option value="Report Section">Report Section</option>
            <option value="Rejected Sample Area">
              Rejected Sample Area
            </option>
          </select>
        </div>

        <div className="mt-3 flex justify-end">
          <button
            onClick={handleReset}
            className="rounded-lg px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-100"
          >
            Reset Filters
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-gray-200 bg-white p-3 shadow-sm sm:p-4">
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-sm font-bold text-gray-800 sm:text-base">
              Sample Journey
            </h2>
            <p className="text-xs text-gray-500">
              {filteredSamples.length} sample
              {filteredSamples.length !== 1 ? "s" : ""} found
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table
            columns={columns}
            data={currentData}
            maxHeight="500px"
            renderRow={(sample: TrackedSample) => (
              <>
                {/* Accession */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                      <QrCode2Icon
                        className="text-blue-600"
                        fontSize="small"
                      />
                    </div>

                    <div>
                      <p className="whitespace-nowrap text-xs font-semibold text-blue-700">
                        {sample.accessionNumber}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {sample.barcode}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Patient */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <PersonIcon
                        className="text-gray-500"
                        fontSize="small"
                      />
                    </div>

                    <div>
                      <p className="whitespace-nowrap text-xs font-semibold text-gray-800">
                        {sample.patientName}
                      </p>
                      <p className="text-[11px] text-gray-500">
                        {sample.patientId}
                      </p>
                    </div>
                  </div>
                </td>

                {/* Test */}
                <td className="px-4 py-3">
                  <p className="whitespace-nowrap text-xs font-medium text-gray-700">
                    {sample.testName}
                  </p>
                </td>

                {/* Sample */}
                <td className="px-4 py-3">
                  <span className="whitespace-nowrap rounded-lg bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-600">
                    {sample.sampleType}
                  </span>
                </td>

                {/* Current Stage */}
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-semibold ${getStatusClasses(
                      sample.currentStatus
                    )}`}
                  >
                    {sample.currentStatus}
                  </span>
                </td>

                {/* Location */}
                <td className="px-4 py-3">
                  <div className="flex min-w-[150px] items-center gap-1.5">
                    <LocationOnOutlinedIcon
                      className="text-gray-400"
                      fontSize="small"
                    />

                    <span className="text-xs text-gray-600">
                      {sample.currentLocation}
                    </span>
                  </div>
                </td>

                {/* Last Updated */}
                <td className="px-4 py-3">
                  <div className="flex min-w-[90px] items-center gap-1.5">
                    <AccessTimeIcon
                      className="text-gray-400"
                      fontSize="small"
                    />
                    <span className="whitespace-nowrap text-xs text-gray-600">
                      {sample.lastUpdated}
                    </span>
                  </div>
                </td>

                {/* Progress */}
                <td className="px-4 py-3">
                  {renderTimeline(sample)}

                  <div className="mt-2 h-1.5 w-full min-w-[180px] overflow-hidden rounded-full bg-gray-100">
                    <div
                      className={`h-full rounded-full transition-all ${sample.currentStatus === "Rejected"
                          ? "bg-red-500"
                          : "bg-emerald-500"
                        }`}
                      style={{
                        width: getProgressWidth(sample.currentStatus),
                      }}
                    />
                  </div>
                </td>

                {/* Actions */}
                <td className="px-4 py-3">
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() =>
                        console.log("View tracking:", sample.accessionNumber)
                      }
                      title="View Tracking"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </button>

                    <button
                      onClick={() =>
                        console.log("View barcode:", sample.barcode)
                      }
                      title="View Barcode"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                    >
                      <QrCode2Icon fontSize="small" />
                    </button>
                  </div>
                </td>
              </>
            )}
          />
        </div>

        {/* Pagination */}
        {filteredSamples.length > 0 && (
          <div className="mt-4 border-t border-gray-100 pt-4">
            <Pagination
              totalItems={filteredSamples.length}
              rowsPerPage={rowsPerPage}
              setRowsPerPage={setRowsPerPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            />
          </div>
        )}

        {filteredSamples.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12">
            <ScienceOutlinedIcon className="mb-2 text-4xl text-gray-300" />

            <p className="text-sm font-semibold text-gray-600">
              No samples found
            </p>

            <p className="mt-1 text-xs text-gray-400">
              Try changing your search or filter criteria.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SampleTracking;