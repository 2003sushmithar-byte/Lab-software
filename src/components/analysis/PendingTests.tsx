import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SearchIcon from "@mui/icons-material/Search";
import FilterListIcon from "@mui/icons-material/FilterList";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Table from "../../common components/Table";
import Pagination from "../../common components/Pagination";
import CloseIcon from "@mui/icons-material/Close";
import AssignmentOutlinedIcon from "@mui/icons-material/AssignmentOutlined";

interface PendingTest {
    id: number;
    sampleId: string;
    accessionNumber: string;
    patientId: string;
    patientName: string;
    testName: string;
    testCategory: string;
    sampleType: string;
    receivedDate: string;
    receivedTime: string;
    priority: "Normal" | "Urgent" | "STAT";
    status: "Pending";
}

const pendingTestData: PendingTest[] = [
    {
        id: 1,
        sampleId: "SMP-10001",
        accessionNumber: "ACC-2026-0003",
        patientId: "PAT-1003",
        patientName: "Karthik Raj",
        testName: "Kidney Function Test",
        testCategory: "Biochemistry",
        sampleType: "Serum",
        receivedDate: "26 Sep 2026",
        receivedTime: "09:18 AM",
        priority: "Urgent",
        status: "Pending",
    },
    {
        id: 2,
        sampleId: "SMP-10002",
        accessionNumber: "ACC-2026-0008",
        patientId: "PAT-1008",
        patientName: "Anitha Devi",
        testName: "Liver Function Test",
        testCategory: "Biochemistry",
        sampleType: "Serum",
        receivedDate: "26 Sep 2026",
        receivedTime: "09:25 AM",
        priority: "Normal",
        status: "Pending",
    },
    {
        id: 3,
        sampleId: "SMP-10003",
        accessionNumber: "ACC-2026-0009",
        patientId: "PAT-1009",
        patientName: "Ramesh Kumar",
        testName: "Complete Blood Count",
        testCategory: "Hematology",
        sampleType: "Blood",
        receivedDate: "26 Sep 2026",
        receivedTime: "09:32 AM",
        priority: "STAT",
        status: "Pending",
    },
    {
        id: 4,
        sampleId: "SMP-10004",
        accessionNumber: "ACC-2026-0010",
        patientId: "PAT-1010",
        patientName: "Divya Srinivasan",
        testName: "Thyroid Profile",
        testCategory: "Immunology",
        sampleType: "Serum",
        receivedDate: "26 Sep 2026",
        receivedTime: "09:40 AM",
        priority: "Normal",
        status: "Pending",
    },
    {
        id: 5,
        sampleId: "SMP-10005",
        accessionNumber: "ACC-2026-0011",
        patientId: "PAT-1011",
        patientName: "Mohan Das",
        testName: "Blood Glucose",
        testCategory: "Biochemistry",
        sampleType: "Plasma",
        receivedDate: "26 Sep 2026",
        receivedTime: "09:48 AM",
        priority: "Urgent",
        status: "Pending",
    },
    {
        id: 6,
        sampleId: "SMP-10006",
        accessionNumber: "ACC-2026-0012",
        patientId: "PAT-1012",
        patientName: "Keerthana S",
        testName: "Urine Routine",
        testCategory: "Clinical Pathology",
        sampleType: "Urine",
        receivedDate: "26 Sep 2026",
        receivedTime: "09:55 AM",
        priority: "Normal",
        status: "Pending",
    },
    {
        id: 7,
        sampleId: "SMP-10007",
        accessionNumber: "ACC-2026-0013",
        patientId: "PAT-1013",
        patientName: "Sanjay Kumar",
        testName: "HbA1c",
        testCategory: "Biochemistry",
        sampleType: "Blood",
        receivedDate: "26 Sep 2026",
        receivedTime: "10:05 AM",
        priority: "STAT",
        status: "Pending",
    },
];

const columns = [
    "Sample ID",
    "Accession ID",
    "Patient",
    "Test",
    "Category",
    "Sample",
    "Received",
    "Priority",
    "Status",
    "Actions",
];

const getPriorityClasses = (priority: PendingTest["priority"]) => {
    switch (priority) {
        case "STAT":
            return "bg-red-50 text-red-700 border-red-200";

        case "Urgent":
            return "bg-orange-50 text-orange-700 border-orange-200";

        case "Normal":
            return "bg-blue-50 text-blue-700 border-blue-200";

        default:
            return "bg-gray-50 text-gray-700 border-gray-200";
    }
};

const PendingTests = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState("");
    const [priorityFilter, setPriorityFilter] = useState("All");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [currentPage, setCurrentPage] = useState(1);
    const rowsPerPage = 5;
    const [selectedTest, setSelectedTest] = useState<PendingTest | null>(null);
    const [showDetails, setShowDetails] = useState(false);

    const filteredTests = useMemo(() => {
        return pendingTestData.filter((test) => {
            const search = searchTerm.toLowerCase().trim();

            const matchesSearch =
                !search ||
                test.sampleId.toLowerCase().includes(search) ||
                test.accessionNumber.toLowerCase().includes(search) ||
                test.patientId.toLowerCase().includes(search) ||
                test.patientName.toLowerCase().includes(search) ||
                test.testName.toLowerCase().includes(search) ||
                test.sampleType.toLowerCase().includes(search);

            const matchesPriority =
                priorityFilter === "All" || test.priority === priorityFilter;

            const matchesCategory =
                categoryFilter === "All" || test.testCategory === categoryFilter;

            return matchesSearch && matchesPriority && matchesCategory;
        });
    }, [searchTerm, priorityFilter, categoryFilter]);

    const totalPages = Math.max(
        1,
        Math.ceil(filteredTests.length / rowsPerPage)
    );

    const currentData = filteredTests.slice(
        (currentPage - 1) * rowsPerPage,
        currentPage * rowsPerPage
    );

    const urgentCount = pendingTestData.filter(
        (test) => test.priority === "Urgent"
    ).length;

    const statCount = pendingTestData.filter(
        (test) => test.priority === "STAT"
    ).length;

    const handleReset = () => {
        setSearchTerm("");
        setPriorityFilter("All");
        setCategoryFilter("All");
        setCurrentPage(1);
    };

    const handleViewDetails = (test: PendingTest) => {
        setSelectedTest(test);
        setShowDetails(true);
    };

    const handleCloseDetails = () => {
        setShowDetails(false);
        setSelectedTest(null);
    };
    ;

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
                            Pending Tests
                        </h1>

                        <p className="mt-0.5 text-xs text-gray-500 sm:text-sm">
                            Accepted samples waiting to begin laboratory analysis
                        </p>
                    </div>
                </div>

                <div className="flex w-fit items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-3 py-2">
                    <ScienceOutlinedIcon
                        className="text-blue-600"
                        fontSize="small"
                    />

                    <span className="text-xs font-semibold text-blue-700">
                        Ready for Analysis
                    </span>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="mb-5 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {/* Total */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Total Pending
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-gray-800">
                                {pendingTestData.length}
                            </h2>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                            <ScienceOutlinedIcon className="text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Normal */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Normal Priority
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-blue-600">
                                {
                                    pendingTestData.filter(
                                        (test) => test.priority === "Normal"
                                    ).length
                                }
                            </h2>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50">
                            <CheckCircleIcon className="text-blue-600" />
                        </div>
                    </div>
                </div>

                {/* Urgent */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                Urgent Tests
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-orange-600">
                                {urgentCount}
                            </h2>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-50">
                            <PriorityHighIcon className="text-orange-600" />
                        </div>
                    </div>
                </div>

                {/* STAT */}
                <div className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs font-medium text-gray-500">
                                STAT Tests
                            </p>

                            <h2 className="mt-1 text-2xl font-bold text-red-600">
                                {statCount}
                            </h2>
                        </div>

                        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50">
                            <PriorityHighIcon className="text-red-600" />
                        </div>
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
                            placeholder="Search sample, accession, patient or test..."
                            className="h-11 w-full rounded-xl border border-gray-200 bg-gray-50 pl-10 pr-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white"
                        />
                    </div>

                    {/* Priority */}
                    <select
                        value={priorityFilter}
                        onChange={(e) => {
                            setPriorityFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none focus:border-blue-500"
                    >
                        <option value="All">All Priority</option>
                        <option value="Normal">Normal</option>
                        <option value="Urgent">Urgent</option>
                        <option value="STAT">STAT</option>
                    </select>

                    {/* Category */}
                    <select
                        value={categoryFilter}
                        onChange={(e) => {
                            setCategoryFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="h-11 rounded-xl border border-gray-200 bg-gray-50 px-3 text-sm text-gray-700 outline-none focus:border-blue-500"
                    >
                        <option value="All">All Categories</option>
                        <option value="Biochemistry">Biochemistry</option>
                        <option value="Hematology">Hematology</option>
                        <option value="Immunology">Immunology</option>
                        <option value="Clinical Pathology">
                            Clinical Pathology
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
                            Tests Waiting for Analysis
                        </h2>

                        <p className="text-xs text-gray-500">
                            {filteredTests.length} test
                            {filteredTests.length !== 1 ? "s" : ""} found
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <Table
                        columns={columns}
                        data={currentData}
                        maxHeight="500px"
                        renderRow={(test: PendingTest) => (
                            <>
                                {/* Sample ID */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-2">
                                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                                            <ScienceOutlinedIcon
                                                className="text-blue-600"
                                                fontSize="small"
                                            />
                                        </div>

                                        <div>
                                            <p className="whitespace-nowrap text-xs font-semibold text-blue-700">
                                                {test.sampleId}
                                            </p>

                                            <p className="text-[11px] text-gray-500">
                                                {test.sampleType}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Accession */}
                                <td className="px-4 py-3">
                                    <span className="whitespace-nowrap text-xs font-semibold text-gray-700">
                                        {test.accessionNumber}
                                    </span>
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
                                                {test.patientName}
                                            </p>

                                            <p className="text-[11px] text-gray-500">
                                                {test.patientId}
                                            </p>
                                        </div>
                                    </div>
                                </td>

                                {/* Test */}
                                <td className="px-4 py-3">
                                    <p className="whitespace-nowrap text-xs font-medium text-gray-700">
                                        {test.testName}
                                    </p>
                                </td>

                                {/* Category */}
                                <td className="px-4 py-3">
                                    <span className="whitespace-nowrap rounded-lg bg-purple-50 px-2.5 py-1 text-[11px] font-medium text-purple-700">
                                        {test.testCategory}
                                    </span>
                                </td>

                                {/* Sample */}
                                <td className="px-4 py-3">
                                    <span className="whitespace-nowrap text-xs text-gray-600">
                                        {test.sampleType}
                                    </span>
                                </td>

                                {/* Received */}
                                <td className="px-4 py-3">
                                    <div className="min-w-[125px]">
                                        <div className="flex items-center gap-1.5">
                                            <AccessTimeIcon
                                                className="text-gray-400"
                                                fontSize="small"
                                            />

                                            <span className="whitespace-nowrap text-xs font-medium text-gray-700">
                                                {test.receivedTime}
                                            </span>
                                        </div>

                                        <p className="ml-6 mt-0.5 whitespace-nowrap text-[11px] text-gray-500">
                                            {test.receivedDate}
                                        </p>
                                    </div>
                                </td>

                                {/* Priority */}
                                <td className="px-4 py-3">
                                    <span
                                        className={`inline-flex items-center gap-1 whitespace-nowrap rounded-full border px-3 py-1 text-[11px] font-semibold ${getPriorityClasses(
                                            test.priority
                                        )}`}
                                    >
                                        {(test.priority === "Urgent" ||
                                            test.priority === "STAT") && (
                                                <PriorityHighIcon
                                                    fontSize="inherit"
                                                />
                                            )}

                                        {test.priority}
                                    </span>
                                </td>

                                {/* Status */}
                                <td className="px-4 py-3">
                                    <span className="inline-flex whitespace-nowrap rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700">
                                        Pending
                                    </span>
                                </td>

                                {/* Actions */}
                                <td className="px-4 py-3">
                                    <div className="flex items-center gap-1.5">
                                        <button
                                            onClick={() => handleViewDetails(test)}
                                            title="View Details"
                                            className="flex h-8 w-8 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
                                        >
                                            <VisibilityOutlinedIcon fontSize="small" />
                                        </button>
                                    </div>
                                </td>
                            </>
                        )}
                    />
                </div>

                {/* Pagination */}
                {filteredTests.length > 0 && (
                    <div className="mt-4 border-t border-gray-100 pt-4">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={setCurrentPage}
                        />
                    </div>
                )}

                {/* Empty State */}
                {filteredTests.length === 0 && (
                    <div className="flex flex-col items-center justify-center py-12">
                        <ScienceOutlinedIcon className="mb-2 text-4xl text-gray-300" />

                        <p className="text-sm font-semibold text-gray-600">
                            No pending tests found
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                            Try changing your search or filter criteria.
                        </p>
                    </div>
                )}
            </div>

            {showDetails && selectedTest && (
                <>
                    {/* Backdrop */}
                    <div
                        className="fixed inset-0 z-[9998] bg-black/30 backdrop-blur-[1px]"
                        onClick={handleCloseDetails}
                    />

                    {/* Drawer */}
                    <div className="fixed right-0 top-0 z-[9999] flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

                        {/* Header */}
                        <div className="flex items-center justify-between border-b border-gray-200 bg-white px-5 py-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50">
                                        <ScienceOutlinedIcon className="text-blue-600" />
                                    </div>

                                    <div>
                                        <h2 className="text-base font-semibold text-gray-800">
                                            Test Details
                                        </h2>

                                        <p className="text-xs text-gray-500">
                                            {selectedTest.sampleId}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCloseDetails}
                                title="Close"
                                className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 text-gray-500 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                            >
                                <CloseIcon fontSize="small" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="flex-1 overflow-y-auto px-5 py-5">

                            {/* Status */}
                            <div className="mb-5 rounded-xl border border-amber-200 bg-amber-50 p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-xs font-medium text-amber-700">
                                            Current Status
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-amber-800">
                                            Pending Analysis
                                        </p>
                                    </div>

                                    <span
                                        className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold ${getPriorityClasses(
                                            selectedTest.priority
                                        )}`}
                                    >
                                        {(selectedTest.priority === "Urgent" ||
                                            selectedTest.priority === "STAT") && (
                                                <PriorityHighIcon fontSize="inherit" />
                                            )}

                                        {selectedTest.priority}
                                    </span>
                                </div>
                            </div>

                            {/* Patient Information */}
                            <div className="mb-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <PersonIcon
                                        className="text-blue-600"
                                        fontSize="small"
                                    />

                                    <h3 className="text-sm font-semibold text-gray-800">
                                        Patient Information
                                    </h3>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <div className="grid grid-cols-2 gap-x-4 gap-y-4">

                                        <div>
                                            <p className="text-[11px] text-gray-500">
                                                Patient Name
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-800">
                                                {selectedTest.patientName}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[11px] text-gray-500">
                                                Patient ID
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-blue-700">
                                                {selectedTest.patientId}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Sample Information */}
                            <div className="mb-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <ScienceOutlinedIcon
                                        className="text-purple-600"
                                        fontSize="small"
                                    />

                                    <h3 className="text-sm font-semibold text-gray-800">
                                        Sample Information
                                    </h3>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white">
                                    <div className="grid grid-cols-2 divide-x divide-gray-200">

                                        <div className="p-3">
                                            <p className="text-[11px] text-gray-500">
                                                Sample ID
                                            </p>

                                            <p className="mt-1 text-xs font-semibold text-gray-800">
                                                {selectedTest.sampleId}
                                            </p>
                                        </div>

                                        <div className="p-3">
                                            <p className="text-[11px] text-gray-500">
                                                Accession ID
                                            </p>

                                            <p className="mt-1 text-xs font-semibold text-blue-700">
                                                {selectedTest.accessionNumber}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="border-t border-gray-200 grid grid-cols-2 divide-x divide-gray-200">

                                        <div className="p-3">
                                            <p className="text-[11px] text-gray-500">
                                                Sample Type
                                            </p>

                                            <p className="mt-1 text-xs font-medium text-gray-700">
                                                {selectedTest.sampleType}
                                            </p>
                                        </div>

                                        <div className="p-3">
                                            <p className="text-[11px] text-gray-500">
                                                Test Category
                                            </p>

                                            <span className="mt-1 inline-flex rounded-lg bg-purple-50 px-2.5 py-1 text-[10px] font-semibold text-purple-700">
                                                {selectedTest.testCategory}
                                            </span>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Test Information */}
                            <div className="mb-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <AssignmentOutlinedIcon
                                        className="text-green-600"
                                        fontSize="small"
                                    />

                                    <h3 className="text-sm font-semibold text-gray-800">
                                        Test Information
                                    </h3>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-white p-4">

                                    <div className="mb-4">
                                        <p className="text-[11px] text-gray-500">
                                            Test Name
                                        </p>

                                        <p className="mt-1 text-sm font-semibold text-gray-800">
                                            {selectedTest.testName}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-[11px] text-gray-500">
                                            Priority
                                        </p>

                                        <span
                                            className={`mt-1 inline-flex items-center gap-1 rounded-full border px-3 py-1 text-[11px] font-semibold ${getPriorityClasses(
                                                selectedTest.priority
                                            )}`}
                                        >
                                            {(selectedTest.priority === "Urgent" ||
                                                selectedTest.priority === "STAT") && (
                                                    <PriorityHighIcon fontSize="inherit" />
                                                )}

                                            {selectedTest.priority}
                                        </span>
                                    </div>

                                </div>
                            </div>

                            {/* Received Information */}
                            <div className="mb-5">
                                <div className="mb-3 flex items-center gap-2">
                                    <AccessTimeIcon
                                        className="text-orange-500"
                                        fontSize="small"
                                    />

                                    <h3 className="text-sm font-semibold text-gray-800">
                                        Received Information
                                    </h3>
                                </div>

                                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <div className="grid grid-cols-2 gap-4">

                                        <div>
                                            <p className="text-[11px] text-gray-500">
                                                Received Date
                                            </p>

                                            <p className="mt-1 text-xs font-semibold text-gray-800">
                                                {selectedTest.receivedDate}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-[11px] text-gray-500">
                                                Received Time
                                            </p>

                                            <p className="mt-1 text-xs font-semibold text-gray-800">
                                                {selectedTest.receivedTime}
                                            </p>
                                        </div>

                                    </div>
                                </div>
                            </div>

                            {/* Workflow Info */}
                            <div className="rounded-xl border border-blue-100 bg-blue-50 p-4">
                                <div className="flex gap-3">
                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-white">
                                        <ScienceOutlinedIcon
                                            className="text-blue-600"
                                            fontSize="small"
                                        />
                                    </div>

                                    <div>
                                        <p className="text-xs font-semibold text-blue-800">
                                            Ready for Analysis
                                        </p>

                                        <p className="mt-1 text-[11px] leading-5 text-blue-700">
                                            This sample has been received and is waiting to be
                                            processed by the laboratory technician.
                                        </p>
                                    </div>
                                </div>
                            </div>

                        </div>

                        {/* Footer */}
                        <div className="border-t border-gray-200 bg-white px-5 py-4">
                            <div className="flex gap-3">

                                <button
                                    onClick={handleCloseDetails}
                                    className="flex-1 rounded-xl border border-gray-200 px-4 py-2.5 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
                                >
                                    Close
                                </button>

                                <button
                                    onClick={() => {
                                        console.log("Start Analysis:", selectedTest);
                                        handleCloseDetails();
                                    }}
                                    className="flex-1 rounded-xl bg-blue-600 px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-blue-700"
                                >
                                    Start Analysis
                                </button>

                            </div>
                        </div>

                    </div>
                </>
            )}
        </div>
    );
};

export default PendingTests;