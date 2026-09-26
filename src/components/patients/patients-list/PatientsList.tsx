import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import HistoryOutlinedIcon from "@mui/icons-material/HistoryOutlined";
import "./patients.css";
import Table from "../../../common components/Table";
import Pagination from "../../../common components/Pagination";

interface Patient {
  id: string;
  patientId: string;
  registrationId: string;
  patientName: string;
  age: string | number;
  gender: string;
  phone: string;
  address?: string;
  doctorReferral?: string;
  requiredTests: string[];
  registrationDate: string;
  status: string;
}

const patientsData: Patient[] = [
  {
    id: "1",
    patientId: "PAT-10001",
    registrationId: "REG-10001",
    patientName: "Arun Kumar",
    age: 34,
    gender: "Male",
    phone: "9876543210",
    doctorReferral: "Dr. John Smith",
    requiredTests: ["CBC"],
    registrationDate: "25 Sep 2026",
    status: "Active",
  },
  {
    id: "2",
    patientId: "PAT-10002",
    registrationId: "REG-10002",
    patientName: "Priya Sharma",
    age: 28,
    gender: "Female",
    phone: "9876543211",
    doctorReferral: "Dr. Sarah Wilson",
    requiredTests: ["LFT"],
    registrationDate: "25 Sep 2026",
    status: "Pending",
  },
  {
    id: "3",
    patientId: "PAT-10003",
    registrationId: "REG-10003",
    patientName: "Rajesh Kumar",
    age: 45,
    gender: "Male",
    phone: "9876543212",
    doctorReferral: "Dr. Michael Brown",
    requiredTests: ["KFT"],
    registrationDate: "24 Sep 2026",
    status: "Completed",
  },
  {
    id: "4",
    patientId: "PAT-10004",
    registrationId: "REG-10004",
    patientName: "Divya Menon",
    age: 31,
    gender: "Female",
    phone: "9876543213",
    doctorReferral: "Dr. John Smith",
    requiredTests: ["CBC", "LFT"],
    registrationDate: "24 Sep 2026",
    status: "Active",
  },
  {
    id: "5",
    patientId: "PAT-10005",
    registrationId: "REG-10005",
    patientName: "Karthik Raj",
    age: 52,
    gender: "Male",
    phone: "9876543214",
    doctorReferral: "Dr. Sarah Wilson",
    requiredTests: ["Lipid Profile"],
    registrationDate: "23 Sep 2026",
    status: "Pending",
  },
  {
    id: "6",
    patientId: "PAT-10006",
    registrationId: "REG-10006",
    patientName: "Anitha Devi",
    age: 39,
    gender: "Female",
    phone: "9876543215",
    doctorReferral: "Dr. Michael Brown",
    requiredTests: ["Thyroid Profile"],
    registrationDate: "23 Sep 2026",
    status: "Completed",
  },
];

const columns = [
  "Patient ID",
  "Registration ID",
  "Patient Name",
  "Age",
  "Gender",
  "Phone",
  "Doctor / Referral",
  "Registration Date",
  "Status",
  "Actions",
];

const PatientList = () => {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [, setOpenMenu] = useState<string | null>(null);

  const rowsPerPage = 5;

  const [selectedPatient, setSelectedPatient] =
    useState<Patient | null>(null);

  const [isViewDrawerOpen, setIsViewDrawerOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  /*
   * Load patients from localStorage.
   * If no patients exist, initialize with demo data.
   */
  const [patients, setPatients] = useState<Patient[]>(() => {
    const storedPatients = localStorage.getItem("lab_patients");

    if (!storedPatients) {
      localStorage.setItem(
        "lab_patients",
        JSON.stringify(patientsData)
      );

      return patientsData;
    }

    try {
      const parsedPatients = JSON.parse(storedPatients);

      if (Array.isArray(parsedPatients)) {
        return parsedPatients;
      }

      return patientsData;
    } catch {
      return patientsData;
    }
  });

  /*
   * Search
   */
  const filteredPatients = useMemo(() => {
    const value = search.trim().toLowerCase();

    if (!value) {
      return patients;
    }

    return patients.filter((patient) =>
      [
        patient.patientId,
        patient.registrationId,
        patient.patientName,
        patient.phone,
        patient.doctorReferral || "",
        patient.gender,
        patient.status,
      ].some((field) =>
        String(field).toLowerCase().includes(value)
      )
    );
  }, [search, patients]);

  /*
   * Pagination
   */
  const totalPages = Math.ceil(
    filteredPatients.length / rowsPerPage
  );

  const currentData = filteredPatients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  /*
   * Search handler
   */
  const handleSearch = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  /*
   * View patient
   */
  const handleView = (patient: Patient) => {
    setSelectedPatient({ ...patient });
    setIsEditMode(false);
    setIsViewDrawerOpen(true);
  };

  /*
   * Edit patient
   */
  const handleEdit = (patient: Patient) => {
    setSelectedPatient({ ...patient });
    setIsEditMode(true);
    setIsViewDrawerOpen(true);
  };

  const handleHistory = () => {
  navigate("/patients/history");
  setOpenMenu(null);
};

  const handleSavePatient = () => {
    if (!selectedPatient) {
      return;
    }

    const updatedPatients = patients.map((patient) =>
      patient.patientId === selectedPatient.patientId
        ? selectedPatient
        : patient
    );

    setPatients(updatedPatients);

    localStorage.setItem(
      "lab_patients",
      JSON.stringify(updatedPatients)
    );

    setIsEditMode(false);
    setIsViewDrawerOpen(false);
    setSelectedPatient(null);
  };

  /*
   * Cancel editing / close drawer
   */
  const handleCloseDrawer = () => {
    setIsViewDrawerOpen(false);
    setIsEditMode(false);
    setSelectedPatient(null);
  };

  /*
   * New Registration
   */
  const handleNewRegistration = () => {
    navigate("/patients/new-registration");
  };

  return (
    <div className="min-h-full w-full px-4 py-5 sm:px-6 lg:px-8">

      {/* ================= HEADER ================= */}
      <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Patients
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Manage patient registrations, details and history
          </p>
        </div>

        <button
          type="button"
          onClick={handleNewRegistration}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 active:scale-[0.98]"
        >
          <AddIcon fontSize="small" />
          New Registration
        </button>
      </div>

      {/* ================= MAIN CARD ================= */}
      <div className="rounded-2xl border border-slate-200 bg-white shadow-sm">

        {/* ================= SEARCH ================= */}
        <div className="border-b border-slate-200 p-4 sm:p-5">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

            <div className="relative w-full lg:max-w-md">
              <SearchIcon
                fontSize="small"
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                placeholder="Search by name, phone, Patient ID or Registration ID..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm text-slate-700 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
              />
            </div>

            <div className="text-sm text-slate-500">
              <span className="font-semibold text-slate-700">
                {filteredPatients.length}
              </span>{" "}
              patients found
            </div>

          </div>
        </div>

        {/* ================= TABLE ================= */}
        <div className="w-full overflow-x-auto">
          <Table
            columns={columns}
            data={currentData}
            maxHeight="500px"
            renderRow={(patient: Patient) => (
              <>
                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-slate-700">
                  {patient.patientId}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm font-medium text-blue-600">
                  {patient.registrationId}
                </td>

                <td className="whitespace-nowrap px-4 py-4">
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-50 text-sm font-semibold text-blue-600">
                      {patient.patientName
                        .charAt(0)
                        .toUpperCase()}
                    </div>

                    <span className="text-sm font-semibold text-slate-700">
                      {patient.patientName}
                    </span>
                  </div>
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {patient.age}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {patient.gender}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {patient.phone}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {patient.doctorReferral || "—"}
                </td>

                <td className="whitespace-nowrap px-4 py-4 text-sm text-slate-600">
                  {patient.registrationDate}
                </td>

               <td className="whitespace-nowrap px-4 py-4">
  <span
    className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
      patient.status === "Active"
        ? "bg-emerald-50 text-emerald-700"
        : patient.status === "Pending"
        ? "bg-amber-50 text-amber-700"
        : patient.status === "Completed"
        ? "bg-blue-50 text-blue-700"
        : patient.status === "New Registration"
        ? "bg-indigo-50 text-indigo-700"
        : "bg-slate-100 text-slate-700"
    }`}
  >
    {patient.status}
  </span>
</td>

                {/* ACTIONS */}
                <td className="relative whitespace-nowrap px-4 py-4">
                  <div className="flex items-center gap-1">

                    {/* VIEW */}
                    <button
                      type="button"
                      title="View"
                      onClick={() => handleView(patient)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-600"
                    >
                      <VisibilityOutlinedIcon fontSize="small" />
                    </button>

                    {/* EDIT */}
                    <button
                      type="button"
                      title="Edit"
                      onClick={() => handleEdit(patient)}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-amber-50 hover:text-amber-600"
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </button>

                    {/* HISTORY */}
                    <button
                      type="button"
                      title="History"
                      onClick={handleHistory}
                      className="rounded-lg p-2 text-slate-500 transition hover:bg-purple-50 hover:text-purple-600"
                    >
                      <HistoryOutlinedIcon fontSize="small" />
                    </button>

                  </div>
                </td>
              </>
            )}
          />
        </div>

        {/* ================= EMPTY STATE ================= */}
        {filteredPatients.length === 0 && (
          <div className="flex flex-col items-center justify-center px-5 py-14 text-center">
            <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-slate-100">
              <SearchIcon className="text-slate-400" />
            </div>

            <h3 className="text-base font-semibold text-slate-700">
              No patients found
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Try searching with a different patient name,
              phone number or ID.
            </p>
          </div>
        )}

        {/* ================= PAGINATION ================= */}
        {filteredPatients.length > 0 && totalPages > 1 && (
          <div className="border-t border-slate-200 px-4 py-4">
            <Pagination
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={setCurrentPage}
            />
          </div>
        )}
      </div>

      {/* ================================================= */}
      {/* RIGHT SIDE PATIENT DRAWER */}
      {/* ================================================= */}

      {isViewDrawerOpen && selectedPatient && (
        <>
          {/* Overlay */}
          <div
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[1px]"
            onClick={handleCloseDrawer}
          />

          {/* Drawer */}
          <div className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-white shadow-2xl">

            {/* ================= DRAWER HEADER ================= */}
            <div className="flex items-center justify-between border-b border-slate-200 px-6 py-5">

              <div>
                <p className="text-xs font-medium uppercase tracking-wide text-slate-400">
                  {isEditMode
                    ? "Edit Patient"
                    : "Patient Details"}
                </p>

                <h2 className="mt-1 text-xl font-semibold text-slate-800">
                  {selectedPatient.patientName}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {selectedPatient.patientId}
                </p>
              </div>

              <button
                type="button"
                onClick={handleCloseDrawer}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-700"
                title="Close"
              >
                ✕
              </button>
            </div>

            {/* ================= DRAWER CONTENT ================= */}
            <div className="flex-1 overflow-y-auto px-6 py-6">

              {/* PATIENT INFORMATION */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                  Patient Information
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  {/* Patient ID */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Patient ID
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedPatient.patientId}
                    </p>
                  </div>

                  {/* Registration ID */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Registration ID
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedPatient.registrationId}
                    </p>
                  </div>

                  {/* Patient Name */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Patient Name
                    </p>

                    {isEditMode ? (
                      <input
                        type="text"
                        value={selectedPatient.patientName}
                        onChange={(e) =>
                          setSelectedPatient({
                            ...selectedPatient,
                            patientName: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedPatient.patientName}
                      </p>
                    )}
                  </div>

                  {/* Age */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Age
                    </p>

                    {isEditMode ? (
                      <input
                        type="number"
                        value={selectedPatient.age}
                        onChange={(e) =>
                          setSelectedPatient({
                            ...selectedPatient,
                            age: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedPatient.age}
                      </p>
                    )}
                  </div>

                  {/* Gender */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Gender
                    </p>

                    {isEditMode ? (
                      <select
                        value={selectedPatient.gender}
                        onChange={(e) =>
                          setSelectedPatient({
                            ...selectedPatient,
                            gender: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      >
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                      </select>
                    ) : (
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedPatient.gender}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Phone
                    </p>

                    {isEditMode ? (
                      <input
                        type="tel"
                        value={selectedPatient.phone}
                        onChange={(e) =>
                          setSelectedPatient({
                            ...selectedPatient,
                            phone: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      />
                    ) : (
                      <p className="mt-1 text-sm font-medium text-slate-700">
                        {selectedPatient.phone}
                      </p>
                    )}
                  </div>

                </div>
              </div>

              {/* DIVIDER */}
              <div className="my-6 border-t border-slate-100" />

              {/* REFERRAL */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                  Referral Information
                </h3>

                <p className="text-xs text-slate-400">
                  Doctor / Referral
                </p>

                {isEditMode ? (
                  <input
                    type="text"
                    value={selectedPatient.doctorReferral || ""}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        doctorReferral: e.target.value,
                      })
                    }
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    placeholder="Enter doctor / referral"
                  />
                ) : (
                  <p className="mt-1 text-sm font-medium text-slate-700">
                    {selectedPatient.doctorReferral ||
                      "Not provided"}
                  </p>
                )}
              </div>

              {/* DIVIDER */}
              <div className="my-6 border-t border-slate-100" />

              {/* REQUIRED TESTS */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                  Required Tests
                </h3>

                <div className="flex flex-wrap gap-2">
                  {selectedPatient.requiredTests?.length > 0 ? (
                    selectedPatient.requiredTests.map(
                      (test) => (
                        <span
                          key={test}
                          className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-medium text-blue-700"
                        >
                          {test}
                        </span>
                      )
                    )
                  ) : (
                    <p className="text-sm text-slate-400">
                      No tests assigned
                    </p>
                  )}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="my-6 border-t border-slate-100" />

              {/* REGISTRATION DETAILS */}
              <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                  Registration Details
                </h3>

                <div className="grid grid-cols-2 gap-4">

                  {/* Registration Date */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Registration Date
                    </p>

                    <p className="mt-1 text-sm font-medium text-slate-700">
                      {selectedPatient.registrationDate}
                    </p>
                  </div>

                  {/* Status */}
                  <div>
                    <p className="text-xs text-slate-400">
                      Status
                    </p>

                    {isEditMode ? (
                      <select
                        value={selectedPatient.status}
                        onChange={(e) =>
                          setSelectedPatient({
                            ...selectedPatient,
                            status: e.target.value,
                          })
                        }
                        className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                      >
                        <option value="Active">
                          Active
                        </option>
                        <option value="Pending">
                          Pending
                        </option>
                        <option value="Completed">
                          Completed
                        </option>
                      </select>
                    ) : (
                      <span
                        className={`mt-1 inline-flex rounded-full px-2.5 py-1 text-xs font-medium ${
                          selectedPatient.status ===
                          "Completed"
                            ? "bg-green-50 text-green-700"
                            : selectedPatient.status ===
                              "Pending"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-blue-50 text-blue-700"
                        }`}
                      >
                        {selectedPatient.status}
                      </span>
                    )}
                  </div>

                </div>
              </div>

              {/* ADDRESS */}
              <div className="my-6 border-t border-slate-100" />

              <div>
                <h3 className="mb-4 text-sm font-semibold text-slate-800">
                  Address
                </h3>

                {isEditMode ? (
                  <textarea
                    value={selectedPatient.address || ""}
                    onChange={(e) =>
                      setSelectedPatient({
                        ...selectedPatient,
                        address: e.target.value,
                      })
                    }
                    rows={3}
                    className="w-full resize-none rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-100"
                    placeholder="Enter patient address"
                  />
                ) : (
                  <p className="text-sm leading-6 text-slate-600">
                    {selectedPatient.address ||
                      "Not provided"}
                  </p>
                )}
              </div>
            </div>

            {/* ================= EDIT FOOTER ================= */}
            {isEditMode && (
              <div className="border-t border-slate-200 bg-slate-50 px-6 py-4">
                <div className="flex gap-3">

                  {/* CANCEL */}
                  <button
                    type="button"
                    onClick={handleCloseDrawer}
                    className="flex-1 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50"
                  >
                    Cancel
                  </button>

                  {/* SAVE */}
                  <button
                    type="button"
                    onClick={handleSavePatient}
                    className="flex-1 rounded-xl bg-slate-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
                  >
                    Save
                  </button>

                </div>
              </div>
            )}

          </div>
        </>
      )}
    </div>
  );
};

export default PatientList;