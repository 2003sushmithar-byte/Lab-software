import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import Table from "../../common components/Table";
import Pagination from "../../common components/Pagination";

interface ReceivedSample {
    id: number;
    accessionNumber: string;
    patientId: string;
    patientName: string;
    testName: string;
    sampleType: string;
    collectedDate: string;
    collectedTime: string;
    receivedDate: string;
    receivedTime: string;
    collector: string;
    receivedBy: string;
    barcode: string;
    status: "Received" | "Awaiting Receipt";
}

const receivedSampleData: ReceivedSample[] = [
    {
        id: 1,
        accessionNumber: "ACC-2026-0001",
        patientId: "PAT-1001",
        patientName: "Arun Kumar",
        testName: "Complete Blood Count",
        sampleType: "Blood",
        collectedDate: "25 Sep 2026",
        collectedTime: "09:15 AM",
        receivedDate: "25 Sep 2026",
        receivedTime: "09:32 AM",
        collector: "Nurse Priya",
        receivedBy: "Lab Staff Kumar",
        barcode: "BC-100001",
        status: "Received",
    },
    {
        id: 2,
        accessionNumber: "ACC-2026-0002",
        patientId: "PAT-1002",
        patientName: "Meena Devi",
        testName: "Lipid Profile",
        sampleType: "Blood",
        collectedDate: "25 Sep 2026",
        collectedTime: "09:30 AM",
        receivedDate: "25 Sep 2026",
        receivedTime: "09:48 AM",
        collector: "Nurse Kavya",
        receivedBy: "Lab Staff Kumar",
        barcode: "BC-100002",
        status: "Received",
    },
    {
        id: 3,
        accessionNumber: "ACC-2026-0003",
        patientId: "PAT-1003",
        patientName: "Rajesh Kumar",
        testName: "Urine Routine",
        sampleType: "Urine",
        collectedDate: "25 Sep 2026",
        collectedTime: "10:05 AM",
        receivedDate: "25 Sep 2026",
        receivedTime: "10:22 AM",
        collector: "Staff Mani",
        receivedBy: "Lab Staff Priya",
        barcode: "BC-100003",
        status: "Received",
    },
    {
        id: 4,
        accessionNumber: "ACC-2026-0004",
        patientId: "PAT-1004",
        patientName: "Lakshmi Priya",
        testName: "Liver Function Test",
        sampleType: "Blood",
        collectedDate: "25 Sep 2026",
        collectedTime: "10:20 AM",
        receivedDate: "-",
        receivedTime: "-",
        collector: "Nurse Priya",
        receivedBy: "-",
        barcode: "BC-100004",
        status: "Awaiting Receipt",
    },
    {
        id: 5,
        accessionNumber: "ACC-2026-0005",
        patientId: "PAT-1005",
        patientName: "Suresh Babu",
        testName: "Thyroid Profile",
        sampleType: "Blood",
        collectedDate: "25 Sep 2026",
        collectedTime: "10:45 AM",
        receivedDate: "25 Sep 2026",
        receivedTime: "11:02 AM",
        collector: "Nurse Kavya",
        receivedBy: "Lab Staff Kumar",
        barcode: "BC-100005",
        status: "Received",
    },
    {
        id: 6,
        accessionNumber: "ACC-2026-0006",
        patientId: "PAT-1006",
        patientName: "Divya Sri",
        testName: "HbA1c",
        sampleType: "Blood",
        collectedDate: "25 Sep 2026",
        collectedTime: "11:10 AM",
        receivedDate: "25 Sep 2026",
        receivedTime: "11:28 AM",
        collector: "Staff Mani",
        receivedBy: "Lab Staff Priya",
        barcode: "BC-100006",
        status: "Received",
    },
    {
        id: 7,
        accessionNumber: "ACC-2026-0007",
        patientId: "PAT-1007",
        patientName: "Vignesh R",
        testName: "Kidney Function Test",
        sampleType: "Blood",
        collectedDate: "25 Sep 2026",
        collectedTime: "11:30 AM",
        receivedDate: "-",
        receivedTime: "-",
        collector: "Nurse Priya",
        receivedBy: "-",
        barcode: "BC-100007",
        status: "Awaiting Receipt",
    },
];

const statusStyles: Record<ReceivedSample["status"], string> = {
    Received: "bg-emerald-50 text-emerald-700 border border-emerald-200",
    "Awaiting Receipt":
        "bg-amber-50 text-amber-700 border border-amber-200",
};

const sampleTypeStyles: Record<string, string> = {
    Blood: "bg-red-50 text-red-600",
    Urine: "bg-yellow-50 text-yellow-700",
    Swab: "bg-purple-50 text-purple-700",
    Serum: "bg-orange-50 text-orange-700",
};

const ReceivedSamples = () => {
    const navigate = useNavigate();

    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);

    const rowsPerPage = 5;

    const filteredData = useMemo(() => {
        return receivedSampleData.filter((sample) => {
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

    const totalPages = Math.max(
        1,
        Math.ceil(filteredData.length / rowsPerPage)
    );

    const currentData = filteredData.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const receivedCount = receivedSampleData.filter(
        (item) => item.status === "Received"
    ).length;

    const awaitingCount = receivedSampleData.filter(
        (item) => item.status === "Awaiting Receipt"
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
        "Collected",
        "Received",
        "Received By",
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
                        Received Samples
                    </h1>

                    <p className="mt-1 text-sm text-slate-500">
                        Manage samples received by the laboratory for processing
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
                                {receivedSampleData.length}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Today's samples
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                            <ScienceOutlinedIcon />
                        </div>
                    </div>
                </div>

                {/* Received */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Received
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-emerald-600">
                                {receivedCount}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Successfully received
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                            <CheckCircleIcon />
                        </div>
                    </div>
                </div>

                {/* Awaiting */}
                <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-slate-500">
                                Awaiting Receipt
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-amber-600">
                                {awaitingCount}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Yet to reach lab
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
                                Ready for Acceptance
                            </p>

                            <h2 className="mt-2 text-2xl font-bold text-purple-600">
                                {receivedCount}
                            </h2>

                            <p className="mt-1 text-xs text-slate-400">
                                Samples awaiting review
                            </p>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
                            <LocalShippingOutlinedIcon />
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
                                    <option value="Received">Received</option>
                                    <option value="Awaiting Receipt">
                                        Awaiting Receipt
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
                            maxHeight="420px"
                            renderRow={(sample: ReceivedSample) => (
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

                                    {/* Collected */}
                                    <td className="px-4 py-4">
                                        <div className="min-w-[145px]">
                                            <div className="flex items-center gap-2 text-sm text-slate-600">
                                                <CalendarTodayOutlinedIcon
                                                    sx={{ fontSize: 15 }}
                                                    className="text-slate-400"
                                                />
                                                {sample.collectedDate}
                                            </div>

                                            <div className="mt-1 flex items-center gap-2 text-xs text-slate-400">
                                                <AccessTimeIcon
                                                    sx={{ fontSize: 15 }}
                                                />
                                                {sample.collectedTime}
                                            </div>
                                        </div>
                                    </td>

                                    {/* Received */}
                                    <td className="px-4 py-4">
                                        <div className="min-w-[145px]">
                                            {sample.receivedDate !== "-" ? (
                                                <>
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
                                                </>
                                            ) : (
                                                <span className="text-sm text-slate-400">—</span>
                                            )}
                                        </div>
                                    </td>

                                    {/* Received By */}
                                    <td className="px-4 py-4">
                                        <p className="whitespace-nowrap text-sm text-slate-600">
                                            {sample.receivedBy}
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
                                                <VisibilityOutlinedIcon fontSize="small" />
                                            </button>

                                            <button
                                                title="Track Sample"
                                                onClick={() =>
                                                    console.log(
                                                        "Track sample:",
                                                        sample.accessionNumber
                                                    )
                                                }
                                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-500 transition hover:border-purple-200 hover:bg-purple-50 hover:text-purple-600"
                                            >
                                                <LocalShippingOutlinedIcon fontSize="small" />
                                            </button>

                                            {sample.status === "Awaiting Receipt" && (
                                                <button
                                                    title="Receive Sample"
                                                    onClick={() =>
                                                        console.log(
                                                            "Receive sample:",
                                                            sample.accessionNumber
                                                        )
                                                    }
                                                    className="flex h-9 w-9 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 text-emerald-600 transition hover:bg-emerald-100"
                                                >
                                                    <CheckCircleIcon fontSize="small" />
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
                                No received samples found
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
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={setCurrentPage}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ReceivedSamples;