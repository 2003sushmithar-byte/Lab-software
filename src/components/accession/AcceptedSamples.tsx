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
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircle";
import VisibilityIcon from "@mui/icons-material/VisibilityOutlined";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import Pagination from "../../common components/Pagination";
import Table from "../../common components/Table";

interface AcceptedSample {
    id: number;
    accessionNumber: string;
    patientId: string;
    patientName: string;
    testName: string;
    sampleType: string;
    receivedDate: string;
    receivedTime: string;
    acceptedDate: string;
    acceptedTime: string;
    acceptedBy: string;
    barcode: string;
    status: "Accepted" | "Pending Acceptance";
}

const acceptedSampleData: AcceptedSample[] = [
    {
        id: 1,
        accessionNumber: "ACC-2026-0001",
        patientId: "PAT-1001",
        patientName: "Arun Kumar",
        testName: "Complete Blood Count",
        sampleType: "Blood",
        receivedDate: "25 Sep 2026",
        receivedTime: "09:32 AM",
        acceptedDate: "25 Sep 2026",
        acceptedTime: "09:40 AM",
        acceptedBy: "Lab Staff Kumar",
        barcode: "BC-100001",
        status: "Accepted",
    },
    {
        id: 2,
        accessionNumber: "ACC-2026-0002",
        patientId: "PAT-1002",
        patientName: "Meena Devi",
        testName: "Lipid Profile",
        sampleType: "Blood",
        receivedDate: "25 Sep 2026",
        receivedTime: "09:48 AM",
        acceptedDate: "25 Sep 2026",
        acceptedTime: "09:56 AM",
        acceptedBy: "Lab Staff Priya",
        barcode: "BC-100002",
        status: "Accepted",
    },
    {
        id: 3,
        accessionNumber: "ACC-2026-0003",
        patientId: "PAT-1003",
        patientName: "Rajesh Kumar",
        testName: "Urine Routine",
        sampleType: "Urine",
        receivedDate: "25 Sep 2026",
        receivedTime: "10:22 AM",
        acceptedDate: "25 Sep 2026",
        acceptedTime: "10:29 AM",
        acceptedBy: "Lab Staff Kumar",
        barcode: "BC-100003",
        status: "Accepted",
    },
    {
        id: 4,
        accessionNumber: "ACC-2026-0004",
        patientId: "PAT-1004",
        patientName: "Lakshmi Priya",
        testName: "Liver Function Test",
        sampleType: "Blood",
        receivedDate: "25 Sep 2026",
        receivedTime: "10:50 AM",
        acceptedDate: "25 Sep 2026",
        acceptedTime: "10:58 AM",
        acceptedBy: "Lab Staff Priya",
        barcode: "BC-100004",
        status: "Accepted",
    },
    {
        id: 5,
        accessionNumber: "ACC-2026-0005",
        patientId: "PAT-1005",
        patientName: "Suresh Babu",
        testName: "Thyroid Profile",
        sampleType: "Blood",
        receivedDate: "25 Sep 2026",
        receivedTime: "11:02 AM",
        acceptedDate: "25 Sep 2026",
        acceptedTime: "11:10 AM",
        acceptedBy: "Lab Staff Kumar",
        barcode: "BC-100005",
        status: "Accepted",
    },
    {
        id: 6,
        accessionNumber: "ACC-2026-0006",
        patientId: "PAT-1006",
        patientName: "Divya Sri",
        testName: "HbA1c",
        sampleType: "Blood",
        receivedDate: "25 Sep 2026",
        receivedTime: "11:28 AM",
        acceptedDate: "-",
        acceptedTime: "-",
        acceptedBy: "-",
        barcode: "BC-100006",
        status: "Pending Acceptance",
    },
    {
        id: 7,
        accessionNumber: "ACC-2026-0007",
        patientId: "PAT-1007",
        patientName: "Vignesh R",
        testName: "Kidney Function Test",
        sampleType: "Blood",
        receivedDate: "25 Sep 2026",
        receivedTime: "11:45 AM",
        acceptedDate: "-",
        acceptedTime: "-",
        acceptedBy: "-",
        barcode: "BC-100007",
        status: "Pending Acceptance",
    },
];

const statusStyles: Record<AcceptedSample["status"], string> = {
    Accepted: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Pending Acceptance":
        "bg-amber-50 text-amber-700 border border-amber-200",
};

const sampleTypeStyles: Record<string, string> = {
    Blood: "bg-red-50 text-red-600",
    Urine: "bg-yellow-50 text-yellow-700",
    Swab: "bg-purple-50 text-purple-700",
    Serum: "bg-orange-50 text-orange-700",
};

const AcceptedSamples = () => {
    const navigate = useNavigate();
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(5);

    const filteredData = useMemo(() => {
        return acceptedSampleData.filter((sample) => {
            const searchValue = search.toLowerCase();

            const matchesSearch =
                sample.patientName.toLowerCase().includes(searchValue) ||
                sample.patientId.toLowerCase().includes(searchValue) ||
                sample.accessionNumber.toLowerCase().includes(searchValue) ||
                sample.testName.toLowerCase().includes(searchValue) ||
                sample.barcode.toLowerCase().includes(searchValue);

            const matchesStatus =
                statusFilter === "All" || sample.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter]);

    const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const acceptedCount = acceptedSampleData.filter(
        (item) => item.status === "Accepted"
    ).length;

    const pendingCount = acceptedSampleData.filter(
        (item) => item.status === "Pending Acceptance"
    ).length;

    const handleSearch = (value: string) => {
        setSearch(value);
        setCurrentPage(1);
    };

    const handleStatusChange = (value: string) => {
        setStatusFilter(value);
        setCurrentPage(1);
    };

    const handleReset = () => {
        setSearch("");
        setStatusFilter("All");
        setCurrentPage(1);
    };

    const columns = [
        "Accession",
        "Patient",
        "Test",
        "Sample",
        "Received",
        "Accepted",
        "Accepted By",
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
                        Accepted Samples
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Review and manage samples accepted for laboratory analysis
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
                                Total Samples
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-slate-800">
                                {acceptedSampleData.length}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Samples received
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <ScienceOutlinedIcon />
                        </div>
                    </div>
                </div>

                {/* Accepted */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Accepted
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-emerald-600">
                                {acceptedCount}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Ready for analysis
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <CheckCircleOutlineIcon />
                        </div>
                    </div>
                </div>

                {/* Pending */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Pending Acceptance
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-amber-600">
                                {pendingCount}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Awaiting quality check
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-50 text-amber-600">
                            <AccessTimeIcon />
                        </div>
                    </div>
                </div>

                {/* Ready */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Ready for Analysis
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-purple-600">
                                {acceptedCount}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Accepted samples
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <PlayCircleIcon />
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
                                placeholder="Search patient, accession, test or barcode..."
                                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        {/* Filter */}
                        <div className="flex w-full flex-col gap-3 sm:flex-row xl:w-auto">
                            <div className="relative w-full sm:w-48">
                                <FilterListIcon
                                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                                    fontSize="small"
                                />

                                <select
                                    value={statusFilter}
                                    onChange={(e) => handleStatusChange(e.target.value)}
                                    className="h-11 w-full appearance-none rounded-xl border border-slate-200 bg-white pl-10 pr-8 text-sm text-slate-600 outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100"
                                >
                                    <option value="All">All Status</option>
                                    <option value="Accepted">Accepted</option>
                                    <option value="Pending Acceptance">
                                        Pending Acceptance
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
                            maxHeight="480px"
                            renderRow={(sample: AcceptedSample) => (
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

                                    {/* Received */}
                                    <td className="px-4 py-4">
                                        <div className="min-w-[145px]">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <CalendarTodayOutlinedIcon
                                                    sx={{ fontSize: 15 }}
                                                    className="text-slate-400"
                                                />

                                                {sample.receivedDate}
                                            </div>

                                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                                <AccessTimeIcon
                                                    sx={{ fontSize: 15 }}
                                                />

                                                {sample.receivedTime}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Accepted */}
                                    <td className="px-4 py-4">
                                        <div className="min-w-[145px]">
                                            {sample.acceptedDate !== "-" ? (
                                                <>
                                                    <div className="flex items-center gap-2 text-sm text-slate-600">
                                                        <CalendarTodayOutlinedIcon
                                                            sx={{ fontSize: 15 }}
                                                            className="text-slate-400"
                                                        />

                                                        {sample.acceptedDate}
                                                    </div>

                                                    <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                                        <AccessTimeIcon
                                                            sx={{ fontSize: 15 }}
                                                        />

                                                        {sample.acceptedTime}
                                                    </div>
                                                </>
                                            ) : (
                                                <span className="text-sm text-slate-400">—</span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Accepted By */}
                                    <td className="px-4 py-4">
                                        <p className="whitespace-nowrap text-sm text-slate-600">
                                            {sample.acceptedBy}
                                        </p>
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
                                                <VisibilityIcon fontSize="small" />
                                            </button>

                                            <button
                                                title="Sample Details"
                                                onClick={() =>
                                                    console.log("Sample details:", sample)
                                                }
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                                            >
                                                <QrCode2Icon fontSize="small" />
                                            </button>

                                            {sample.status === "Pending Acceptance" && (
                                                <button
                                                    title="Accept Sample"
                                                    onClick={() =>
                                                        console.log(
                                                            "Accept sample:",
                                                            sample.accessionNumber
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100"
                                                >
                                                    <CheckCircleOutlineIcon fontSize="small" />
                                                </button>
                                            )}

                                            {sample.status === "Accepted" && (
                                                <button
                                                    title="Send to Analysis"
                                                    onClick={() =>
                                                        console.log(
                                                            "Send to analysis:",
                                                            sample.accessionNumber
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-blue-200 bg-blue-50 text-blue-600 transition hover:bg-blue-100"
                                                >
                                                    <PlayCircleIcon fontSize="small" />
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
                                <ScienceOutlinedIcon />
                            </div>

                            <h3 className="text-sm font-semibold text-slate-700">
                                No accepted samples found
                            </h3>

                            <p className="mt-1 text-xs text-slate-400">
                                Try changing your search or filter.
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

export default AcceptedSamples;