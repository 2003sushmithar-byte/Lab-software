import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import QrCode2Icon from "@mui/icons-material/QrCode2";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import RefreshOutlinedIcon from "@mui/icons-material/RefreshOutlined";
import Table from "../../common components/Table";
import Pagination from "../../common components/Pagination";

interface RejectedSample {
  id: number;
  accessionNumber: string;
  patientId: string;
  patientName: string;
  testName: string;
  sampleType: string;
  collectedDate: string;
  collectedTime: string;
  rejectedDate: string;
  rejectedTime: string;
  rejectedBy: string;
  rejectionReason: string;
  barcode: string;
  status: "Rejected" | "Recollection Required";
}

const rejectedSampleData: RejectedSample[] = [
  {
    id: 1,
    accessionNumber: "ACC-2026-0010",
    patientId: "PAT-1010",
    patientName: "Karthik S",
    testName: "Complete Blood Count",
    sampleType: "Blood",
    collectedDate: "25 Sep 2026",
    collectedTime: "08:45 AM",
    rejectedDate: "25 Sep 2026",
    rejectedTime: "09:05 AM",
    rejectedBy: "Lab Staff Kumar",
    rejectionReason: "Hemolyzed Sample",
    barcode: "BC-100010",
    status: "Recollection Required",
  },
  {
    id: 2,
    accessionNumber: "ACC-2026-0011",
    patientId: "PAT-1011",
    patientName: "Anitha R",
    testName: "Lipid Profile",
    sampleType: "Blood",
    collectedDate: "25 Sep 2026",
    collectedTime: "09:10 AM",
    rejectedDate: "25 Sep 2026",
    rejectedTime: "09:28 AM",
    rejectedBy: "Lab Staff Priya",
    rejectionReason: "Insufficient Sample",
    barcode: "BC-100011",
    status: "Recollection Required",
  },
  {
    id: 3,
    accessionNumber: "ACC-2026-0012",
    patientId: "PAT-1012",
    patientName: "Mohan Das",
    testName: "Urine Routine",
    sampleType: "Urine",
    collectedDate: "25 Sep 2026",
    collectedTime: "09:35 AM",
    rejectedDate: "25 Sep 2026",
    rejectedTime: "09:50 AM",
    rejectedBy: "Lab Staff Kumar",
    rejectionReason: "Wrong Container",
    barcode: "BC-100012",
    status: "Rejected",
  },
  {
    id: 4,
    accessionNumber: "ACC-2026-0013",
    patientId: "PAT-1013",
    patientName: "Deepa K",
    testName: "Liver Function Test",
    sampleType: "Blood",
    collectedDate: "25 Sep 2026",
    collectedTime: "10:00 AM",
    rejectedDate: "25 Sep 2026",
    rejectedTime: "10:18 AM",
    rejectedBy: "Lab Staff Priya",
    rejectionReason: "Clotted Sample",
    barcode: "BC-100013",
    status: "Recollection Required",
  },
  {
    id: 5,
    accessionNumber: "ACC-2026-0014",
    patientId: "PAT-1014",
    patientName: "Senthil Kumar",
    testName: "Thyroid Profile",
    sampleType: "Blood",
    collectedDate: "25 Sep 2026",
    collectedTime: "10:30 AM",
    rejectedDate: "25 Sep 2026",
    rejectedTime: "10:48 AM",
    rejectedBy: "Lab Staff Kumar",
    rejectionReason: "Improperly Labeled",
    barcode: "BC-100014",
    status: "Rejected",
  },
  {
    id: 6,
    accessionNumber: "ACC-2026-0015",
    patientId: "PAT-1015",
    patientName: "Priya S",
    testName: "HbA1c",
    sampleType: "Blood",
    collectedDate: "25 Sep 2026",
    collectedTime: "11:05 AM",
    rejectedDate: "25 Sep 2026",
    rejectedTime: "11:25 AM",
    rejectedBy: "Lab Staff Priya",
    rejectionReason: "Leaking Container",
    barcode: "BC-100015",
    status: "Recollection Required",
  },
  {
    id: 7,
    accessionNumber: "ACC-2026-0016",
    patientId: "PAT-1016",
    patientName: "Ramesh B",
    testName: "Kidney Function Test",
    sampleType: "Blood",
    collectedDate: "25 Sep 2026",
    collectedTime: "11:40 AM",
    rejectedDate: "25 Sep 2026",
    rejectedTime: "11:58 AM",
    rejectedBy: "Lab Staff Kumar",
    rejectionReason: "Insufficient Sample",
    barcode: "BC-100016",
    status: "Recollection Required",
  },
];

const statusStyles: Record<RejectedSample["status"], string> = {
  Rejected: "bg-red-50 text-red-700 border border-red-200",
  "Recollection Required":
    "bg-orange-50 text-orange-700 border border-orange-200",
};

const sampleTypeStyles: Record<string, string> = {
  Blood: "bg-red-50 text-red-600",
  Urine: "bg-yellow-50 text-yellow-700",
  Swab: "bg-purple-50 text-purple-700",
  Serum: "bg-orange-50 text-orange-700",
};

const RejectedSamples = () => {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [reasonFilter, setReasonFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const filteredData = useMemo(() => {
    return rejectedSampleData.filter((sample) => {
      const searchValue = search.toLowerCase();

      const matchesSearch =
        sample.patientName.toLowerCase().includes(searchValue) ||
        sample.patientId.toLowerCase().includes(searchValue) ||
        sample.accessionNumber.toLowerCase().includes(searchValue) ||
        sample.testName.toLowerCase().includes(searchValue) ||
        sample.barcode.toLowerCase().includes(searchValue) ||
        sample.rejectionReason.toLowerCase().includes(searchValue);

      const matchesStatus =
        statusFilter === "All" || sample.status === statusFilter;

      const matchesReason =
        reasonFilter === "All" ||
        sample.rejectionReason === reasonFilter;

      return matchesSearch && matchesStatus && matchesReason;
    });
  }, [search, statusFilter, reasonFilter]);

  const currentData = filteredData.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const rejectedCount = rejectedSampleData.filter(
    (item) => item.status === "Rejected"
  ).length;

  const recollectionCount = rejectedSampleData.filter(
    (item) => item.status === "Recollection Required"
  ).length;

  const reasonCount = new Set(
    rejectedSampleData.map((item) => item.rejectionReason)
  ).size;

  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handleStatusChange = (value: string) => {
    setStatusFilter(value);
    setCurrentPage(1);
  };

  const handleReasonChange = (value: string) => {
    setReasonFilter(value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setSearch("");
    setStatusFilter("All");
    setReasonFilter("All");
    setCurrentPage(1);
  };

  const columns = [
    "Accession",
    "Patient",
    "Test",
    "Sample",
    "Rejected",
    "Rejected By",
    "Reason",
    "Status",
    "Actions",
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 sm:p-5 lg:p-6">
      {/* Header */}
      <div className="mb-6 flex items-center gap-3">
        <button
          onClick={() => navigate(-1)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
        >
          <ArrowBackIcon fontSize="small" />
        </button>

        <div>
          <h1 className="text-xl font-bold text-slate-800 sm:text-2xl">
            Rejected Samples
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Review rejected samples and manage recollection requirements
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {/* Total */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Total Rejected
              </p>

              <h2 className="mt-2 text-2xl font-bold text-slate-800">
                {rejectedSampleData.length}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Today's rejected samples
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <CancelOutlinedIcon />
            </div>
          </div>
        </div>

        {/* Rejected */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Rejected
              </p>

              <h2 className="mt-2 text-2xl font-bold text-red-600">
                {rejectedCount}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Rejection completed
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600">
              <ScienceOutlinedIcon />
            </div>
          </div>
        </div>

        {/* Recollection */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Recollection Required
              </p>

              <h2 className="mt-2 text-2xl font-bold text-orange-600">
                {recollectionCount}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                New sample needed
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50 text-orange-600">
              <RefreshOutlinedIcon />
            </div>
          </div>
        </div>

        {/* Reasons */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500">
                Rejection Reasons
              </p>

              <h2 className="mt-2 text-2xl font-bold text-purple-600">
                {reasonCount}
              </h2>

              <p className="mt-1 text-xs text-slate-400">
                Different reasons recorded
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
              <FilterListIcon />
            </div>
          </div>
        </div>
      </div>

      {/* Main Card */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">
        {/* Toolbar */}
        <div className="border-b border-slate-100 p-4 sm:p-5">
          <div className="flex flex-col gap-3 xl:flex-row xl:items-center xl:justify-between">
            {/* Search */}
            <div className="relative w-full xl:max-w-md">
              <SearchIcon
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                fontSize="small"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search patient, accession, test or reason..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            {/* Filters */}
            <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
              <div className="relative w-full sm:w-48">
                <FilterListIcon
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  fontSize="small"
                />

                <select
                  value={statusFilter}
                  onChange={(e) =>
                    handleStatusChange(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-8 text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All Status</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Recollection Required">
                    Recollection Required
                  </option>
                </select>
              </div>

              <div className="relative w-full sm:w-52">
                <select
                  value={reasonFilter}
                  onChange={(e) =>
                    handleReasonChange(e.target.value)
                  }
                  className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 pr-8 text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="All">All Reasons</option>
                  <option value="Hemolyzed Sample">
                    Hemolyzed Sample
                  </option>
                  <option value="Insufficient Sample">
                    Insufficient Sample
                  </option>
                  <option value="Wrong Container">
                    Wrong Container
                  </option>
                  <option value="Clotted Sample">
                    Clotted Sample
                  </option>
                  <option value="Improperly Labeled">
                    Improperly Labeled
                  </option>
                  <option value="Leaking Container">
                    Leaking Container
                  </option>
                </select>
              </div>

              <button
                onClick={handleReset}
                className="h-11 rounded-xl border border-slate-200 px-5 text-sm font-medium text-slate-600 transition hover:bg-slate-50"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="p-3 sm:p-5">
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              data={currentData}
              maxHeight="500px"
              renderRow={(sample: RejectedSample) => (
                <>
                  {/* Accession */}
                  <td className="px-4 py-4">
                    <div>
                      <p className="whitespace-nowrap text-sm font-semibold text-blue-600">
                        {sample.accessionNumber}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Sample #{sample.id}
                      </p>
                    </div>
                  </td>

                  {/* Patient */}
                  <td className="px-4 py-4">
                    <div className="flex min-w-[180px] items-center gap-3">
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-blue-600">
                        <PersonIcon fontSize="small" />
                      </div>

                      <div>
                        <p className="whitespace-nowrap text-sm font-semibold text-slate-700">
                          {sample.patientName}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {sample.patientId}
                        </p>
                      </div>
                    </div>
                  </td>

                  {/* Test */}
                  <td className="px-4 py-4">
                    <p className="min-w-[170px] text-sm font-medium text-slate-700">
                      {sample.testName}
                    </p>
                  </td>

                  {/* Sample */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-lg px-3 py-1.5 text-xs font-semibold ${sampleTypeStyles[sample.sampleType] ||
                        "bg-slate-100 text-slate-600"
                        }`}
                    >
                      {sample.sampleType}
                    </span>
                  </td>

                  {/* Rejected */}
                  <td className="px-4 py-4">
                    <div className="min-w-[145px]">
                      <div className="flex items-center gap-2 text-sm text-slate-600">
                        <CalendarTodayOutlinedIcon
                          sx={{ fontSize: 15 }}
                          className="text-slate-400"
                        />

                        {sample.rejectedDate}
                      </div>

                      <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                        <AccessTimeIcon
                          sx={{ fontSize: 15 }}
                        />

                        {sample.rejectedTime}
                      </div>
                    </div>
                  </td>

                  {/* Rejected By */}
                  <td className="px-4 py-4">
                    <p className="whitespace-nowrap text-sm text-slate-600">
                      {sample.rejectedBy}
                    </p>
                  </td>

                  {/* Reason */}
                  <td className="px-4 py-4">
                    <span className="inline-flex min-w-[150px] whitespace-nowrap rounded-lg bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                      {sample.rejectionReason}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-semibold ${statusStyles[sample.status]}`}
                    >
                      {sample.status}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-2">
                      <button
                        title="View Sample"
                        onClick={() =>
                          console.log("View sample:", sample)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                      >
                        <VisibilityOutlinedIcon fontSize="small" />
                      </button>

                      <button
                        title="Sample Barcode"
                        onClick={() =>
                          console.log("Barcode:", sample.barcode)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                      >
                        <QrCode2Icon fontSize="small" />
                      </button>

                      {sample.status === "Recollection Required" && (
                        <button
                          title="Request Recollection"
                          onClick={() =>
                            console.log(
                              "Request recollection:",
                              sample.accessionNumber
                            )
                          }
                          className="flex h-9 w-9 items-center justify-center rounded-lg border border-orange-200 bg-orange-50 text-orange-600 transition hover:bg-orange-100"
                        >
                          <RefreshOutlinedIcon fontSize="small" />
                        </button>
                      )}
                    </div>
                  </td>
                </>
              )}
            />
          </div>

          {/* Empty State */}
          {currentData.length === 0 && (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100 text-slate-400">
                <CancelOutlinedIcon />
              </div>

              <h3 className="text-sm font-semibold text-slate-700">
                No rejected samples found
              </h3>

              <p className="mt-1 text-xs text-slate-400">
                Try changing your search or filters.
              </p>
            </div>
          )}

          {/* Pagination */}
          {filteredData.length > 0 && (
            <div className="mt-5 border-t border-slate-100 pt-4">
              <Pagination
                totalItems={filteredData.length}
                rowsPerPage={rowsPerPage}
                setRowsPerPage={setRowsPerPage}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RejectedSamples;