import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";

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
    address: "Chennai, Tamil Nadu",
    doctorReferral: "Dr. John Smith",
    requiredTests: ["CBC", "LFT"],
    registrationDate: "25 Sep 2026",
    status: "Active",
  },
];

const PatientHistory = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");

  /*
   * Temporary frontend data.
   *
   * Later this will be replaced with:
   * GET /patients/history
   *
   * Backend can return the complete patient history.
   */
  const patient = useMemo<Patient>(() => {
    const storedPatients = localStorage.getItem("lab_patients");

    if (!storedPatients) {
      return patientsData[0];
    }

    try {
      const parsedPatients = JSON.parse(storedPatients);

      if (Array.isArray(parsedPatients) && parsedPatients.length > 0) {
        return parsedPatients[0] as Patient;
      }
    } catch {
      // Use demo patient below
    }

    return patientsData[0];
  }, []);

  const tabs = ["Overview", "Tests", "Reports", "Visits"];

  return (
    <div className="min-h-full w-full px-4 py-5 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => navigate("/patients")}
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 bg-white text-slate-600 shadow-sm transition hover:bg-slate-50"
            title="Back to Patients"
          >
            <ArrowBackIcon fontSize="small" />
          </button>

          <div>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Patient History
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              Complete patient information, tests and medical history
            </p>
          </div>
        </div>
      </div>

      {/* Patient Summary */}
      <div className="mb-6 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
              <PersonIcon fontSize="large" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-slate-800">
                {patient.patientName}
              </h2>

              <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-500">
                <span>{patient.patientId}</span>
                <span>{patient.registrationId}</span>
                <span>
                  {patient.age} years / {patient.gender}
                </span>
              </div>
            </div>
          </div>

          <span
            className={`inline-flex w-fit rounded-full px-3 py-1.5 text-xs font-semibold ${patient.status === "Completed"
                ? "bg-emerald-50 text-emerald-700"
                : patient.status === "Pending"
                  ? "bg-amber-50 text-amber-700"
                  : "bg-blue-50 text-blue-700"
              }`}
          >
            {patient.status}
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="flex min-w-max border-b border-slate-200">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-4 text-sm font-semibold transition ${activeTab === tab
                  ? "border-b-2 border-blue-600 text-blue-600"
                  : "text-slate-500 hover:text-slate-700"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Overview */}
      {activeTab === "Overview" && (
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {/* Personal Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <PersonIcon fontSize="small" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Patient Information
                </h3>

                <p className="text-xs text-slate-400">
                  Personal and contact details
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <p className="text-xs font-medium text-slate-400">
                  Patient ID
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {patient.patientId}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Registration ID
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {patient.registrationId}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Patient Name
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {patient.patientName}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Age
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {patient.age}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Gender
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {patient.gender}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Phone
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {patient.phone}
                </p>
              </div>
            </div>

            {patient.address && (
              <div className="mt-5 border-t border-slate-100 pt-5">
                <p className="text-xs font-medium text-slate-400">
                  Address
                </p>

                <p className="mt-1 text-sm leading-6 text-slate-600">
                  {patient.address}
                </p>
              </div>
            )}
          </div>

          {/* Registration Information */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <CalendarTodayOutlinedIcon fontSize="small" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Registration Details
                </h3>

                <p className="text-xs text-slate-400">
                  Registration and referral information
                </p>
              </div>
            </div>

            <div className="space-y-5">
              <div>
                <p className="text-xs font-medium text-slate-400">
                  Registration Date
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {patient.registrationDate}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Doctor / Referral
                </p>

                <p className="mt-1 text-sm font-semibold text-slate-700">
                  {patient.doctorReferral || "Not provided"}
                </p>
              </div>

              <div>
                <p className="text-xs font-medium text-slate-400">
                  Current Status
                </p>

                <span
                  className={`mt-1 inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${patient.status === "Completed"
                      ? "bg-emerald-50 text-emerald-700"
                      : patient.status === "Pending"
                        ? "bg-amber-50 text-amber-700"
                        : "bg-blue-50 text-blue-700"
                    }`}
                >
                  {patient.status}
                </span>
              </div>
            </div>
          </div>

          {/* Required Tests */}
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6 xl:col-span-2">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                <ScienceOutlinedIcon fontSize="small" />
              </div>

              <div>
                <h3 className="text-base font-bold text-slate-800">
                  Required Tests
                </h3>

                <p className="text-xs text-slate-400">
                  Tests assigned during registration
                </p>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              {patient.requiredTests?.length > 0 ? (
                patient.requiredTests.map((test: string) => (
                  <span
                    key={test}
                    className="rounded-xl bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700"
                  >
                    {test}
                  </span>
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  No tests assigned
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tests */}
      {activeTab === "Tests" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <ScienceOutlinedIcon className="text-blue-600" />

            <div>
              <h3 className="text-base font-bold text-slate-800">
                Patient Tests
              </h3>

              <p className="text-xs text-slate-400">
                Tests associated with this patient
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {patient.requiredTests?.map((test: string, index: number) => (
              <div
                key={`${test}-${index}`}
                className="flex items-center justify-between rounded-xl border border-slate-100 bg-slate-50 px-4 py-4"
              >
                <div>
                  <p className="text-sm font-semibold text-slate-700">
                    {test}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    Assigned during registration
                  </p>
                </div>

                <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                  Pending
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Reports */}
      {activeTab === "Reports" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <ReceiptLongOutlinedIcon
            className="text-slate-300"
            style={{ fontSize: 48 }}
          />

          <h3 className="mt-4 text-base font-semibold text-slate-700">
            No Reports Available
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Patient reports will appear here after test results are completed.
          </p>
        </div>
      )}

      {/* Visits */}
      {activeTab === "Visits" && (
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <CalendarTodayOutlinedIcon
            className="text-slate-300"
            style={{ fontSize: 48 }}
          />

          <h3 className="mt-4 text-base font-semibold text-slate-700">
            No Previous Visits
          </h3>

          <p className="mt-1 text-sm text-slate-400">
            Patient visit history will appear here.
          </p>
        </div>
      )}
    </div>
  );
};

export default PatientHistory;