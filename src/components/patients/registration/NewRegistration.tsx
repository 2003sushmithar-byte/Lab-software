import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import PersonIcon from "@mui/icons-material/Person";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import LocalHospitalOutlinedIcon from "@mui/icons-material/LocalHospitalOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddIcon from "@mui/icons-material/Add";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import SmsOutlinedIcon from "@mui/icons-material/SmsOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";

interface FormData {
  patientName: string;
  age: string;
  gender: string;
  phone: string;
  address: string;
  doctorReferral: string;
  requiredTests: string[];
}

interface FormErrors {
  patientName?: string;
  age?: string;
  gender?: string;
  phone?: string;
  requiredTests?: string;
}

interface TestOption {
  id: string;
  name: string;
  category: string;
}

const testOptions: TestOption[] = [
  {
    id: "CBC",
    name: "Complete Blood Count (CBC)",
    category: "Hematology",
  },
  {
    id: "LFT",
    name: "Liver Function Test (LFT)",
    category: "Biochemistry",
  },
  {
    id: "KFT",
    name: "Kidney Function Test (KFT)",
    category: "Biochemistry",
  },
  {
    id: "LIPID",
    name: "Lipid Profile",
    category: "Biochemistry",
  },
  {
    id: "THYROID",
    name: "Thyroid Profile",
    category: "Hormones",
  },
  {
    id: "HBA1C",
    name: "HbA1c",
    category: "Diabetes",
  },
  {
    id: "URINE",
    name: "Urine Routine",
    category: "Clinical Pathology",
  },
  {
    id: "DENGUE",
    name: "Dengue Test",
    category: "Immunology",
  },
];

const NewRegistration = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState<FormData>({
    patientName: "",
    age: "",
    gender: "",
    phone: "",
    address: "",
    doctorReferral: "",
    requiredTests: [],
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [registrationId, setRegistrationId] = useState("");

  const handleChange = (
    field: keyof Omit<FormData, "requiredTests">,
    value: string
  ) => {
    setFormData((previous) => ({
      ...previous,
      [field]: value,
    }));

    setErrors((previous) => ({
      ...previous,
      [field]: "",
    }));
  };

  const handleTestChange = (testId: string) => {
    setFormData((previous) => {
      const alreadySelected =
        previous.requiredTests.includes(testId);

      return {
        ...previous,
        requiredTests: alreadySelected
          ? previous.requiredTests.filter(
              (id) => id !== testId
            )
          : [...previous.requiredTests, testId],
      };
    });

    setErrors((previous) => ({
      ...previous,
      requiredTests: "",
    }));
  };

  const validateForm = () => {
    const newErrors: FormErrors = {};

    if (!formData.patientName.trim()) {
      newErrors.patientName = "Patient name is required.";
    }

    if (!formData.age.trim()) {
      newErrors.age = "Age is required.";
    } else if (
      Number(formData.age) < 1 ||
      Number(formData.age) > 120
    ) {
      newErrors.age = "Please enter a valid age.";
    }

    if (!formData.gender) {
      newErrors.gender = "Please select gender.";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone =
        "Please enter a valid 10-digit phone number.";
    }

    if (formData.requiredTests.length === 0) {
      newErrors.requiredTests =
        "Please select at least one test.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const generateRegistrationId = () => {
    const number = Math.floor(
      10000 + Math.random() * 90000
    );

    return `REG-${number}`;
  };

  const handleSubmit = (event: React.FormEvent) => {
  event.preventDefault();

  if (!validateForm()) {
    return;
  }

  const generatedRegistrationId = generateRegistrationId();

  const newPatient = {
    id: `PAT-${Date.now()}`,
    patientId: `PAT-${Math.floor(10000 + Math.random() * 90000)}`,
    registrationId: generatedRegistrationId,
    patientName: formData.patientName.trim(),
    age: formData.age,
    gender: formData.gender,
    phone: formData.phone,
    address: formData.address.trim(),
    doctorReferral: formData.doctorReferral.trim(),
    requiredTests: formData.requiredTests,
    registrationDate: new Date().toISOString(),
    status: "Registered",
  };

  const existingPatients = localStorage.getItem("lab_patients");

  let patients = [];

  if (existingPatients) {
    try {
      patients = JSON.parse(existingPatients);

      if (!Array.isArray(patients)) {
        patients = [];
      }
    } catch {
      patients = [];
    }
  }

  localStorage.setItem(
    "lab_patients",
    JSON.stringify([newPatient, ...patients])
  );

  setRegistrationId(generatedRegistrationId);
  setShowSuccess(true);
};

  const handleNewRegistration = () => {
    setFormData({
      patientName: "",
      age: "",
      gender: "",
      phone: "",
      address: "",
      doctorReferral: "",
      requiredTests: [],
    });

    setErrors({});
    setRegistrationId("");
    setShowSuccess(false);
  };
  
  const handleView = () => {
    navigate("/patients");
  };


if (showSuccess) {
  return (
    <div className="flex min-h-[calc(100vh-80px)] items-center justify-center p-4 sm:p-6">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-sm sm:p-10">

        <div className="flex flex-col items-center text-center">

          {/* Success Icon */}
          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
            <CheckCircleIcon
              className="text-green-600"
              sx={{ fontSize: 42 }}
            />
          </div>

          {/* Success Message */}
          <h2 className="text-2xl font-bold text-slate-800">
            Patient Registered Successfully
          </h2>

          <p className="mt-2 text-sm text-slate-500">
            The patient registration has been created successfully.
          </p>

          {/* Registration ID */}
          <div className="mt-7 w-full rounded-xl border border-blue-100 bg-blue-50 p-5">
            <p className="text-xs font-semibold uppercase tracking-wide text-blue-600">
              Registration ID
            </p>

            <p className="mt-1 text-2xl font-bold tracking-wide text-blue-800">
              {registrationId}
            </p>
          </div>

          {/* Patient Details */}
          <div className="mt-6 grid w-full grid-cols-1 gap-3 sm:grid-cols-2">

            <div className="rounded-xl bg-slate-50 p-4 text-left">
              <p className="text-xs text-slate-500">
                Patient Name
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {formData.patientName}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-left">
              <p className="text-xs text-slate-500">
                Phone
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {formData.phone}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-left">
              <p className="text-xs text-slate-500">
                Age / Gender
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {formData.age} / {formData.gender}
              </p>
            </div>

            <div className="rounded-xl bg-slate-50 p-4 text-left">
              <p className="text-xs text-slate-500">
                Tests
              </p>

              <p className="mt-1 font-semibold text-slate-800">
                {formData.requiredTests.length} selected
              </p>
            </div>

          </div>

          {/* Notification Section */}
          <div className="mt-7 w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 sm:p-5">

            <div className="mb-4 text-left">
              <h3 className="text-sm font-semibold text-slate-800">
                Send Welcome Notification
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Send the patient's registration details through the preferred communication channel.
              </p>
            </div>

            <div className="grid w-full grid-cols-1 gap-3 sm:grid-cols-3">

              {/* WhatsApp */}
              <button
                type="button"
                onClick={() => {
                  // Backend notification API will be added here
                  console.log(
                    "Send WhatsApp welcome notification",
                    registrationId
                  );
                }}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl
                  border border-green-200
                  bg-green-50
                  px-4 py-3
                  text-sm font-semibold
                  text-green-700
                  transition
                  hover:bg-green-100
                "
              >
                <WhatsAppIcon fontSize="small" />
                WhatsApp
              </button>

              {/* SMS */}
              <button
                type="button"
                onClick={() => {
                  // Backend notification API will be added here
                  console.log(
                    "Send SMS welcome notification",
                    registrationId
                  );
                }}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl
                  border border-blue-200
                  bg-blue-50
                  px-4 py-3
                  text-sm font-semibold
                  text-blue-700
                  transition
                  hover:bg-blue-100
                "
              >
                <SmsOutlinedIcon fontSize="small" />
                SMS
              </button>

              {/* Email */}
              <button
                type="button"
                onClick={() => {
                  // Backend notification API will be added here
                  console.log(
                    "Send Email welcome notification",
                    registrationId
                  );
                }}
                className="
                  flex items-center justify-center gap-2
                  rounded-xl
                  border border-purple-200
                  bg-purple-50
                  px-4 py-3
                  text-sm font-semibold
                  text-purple-700
                  transition
                  hover:bg-purple-100
                "
              >
                <EmailOutlinedIcon fontSize="small" />
                Email
              </button>

            </div>

          </div>

          {/* Main Actions */}
          <div className="mt-6 flex w-full flex-col gap-3 sm:flex-row">

            {/* View Patients */}
            <button
              type="button"
              onClick={handleView}
              className="
                flex flex-1
                items-center justify-center
                gap-2
                rounded-xl
                border border-slate-200
                px-5 py-3
                text-sm font-semibold
                text-slate-700
                transition
                hover:bg-slate-50
              "
            >
              <VisibilityOutlinedIcon fontSize="small" />
              View Patients
            </button>

            {/* New Registration */}
            <button
              type="button"
              onClick={handleNewRegistration}
              className="
                flex flex-1
                items-center justify-center
                gap-2
                rounded-xl
                bg-slate-700
                px-5 py-3
                text-sm font-semibold
                text-white
                transition
                hover:bg-slate-800
              "
            >
              <AddIcon fontSize="small" />
              New Registration
            </button>

          </div>

        </div>
      </div>
    </div>
  );
}


  return (
    <div className="w-full space-y-6">

      {/* PAGE HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

        <div>
          <button
            type="button"
            onClick={() => navigate("/patients")}
            className="
              mb-3
              flex items-center gap-1.5
              text-sm font-medium
              text-slate-500
              transition
              hover:text-blue-600
            "
          >
            <ArrowBackIcon fontSize="small" />
            Back to Patients
          </button>

          <h1 className="text-2xl font-bold text-slate-800">
            New Patient Registration
          </h1>

          <p className="mt-1 text-sm text-slate-500">
            Register a new patient and assign the required laboratory tests.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3">
          <ScienceOutlinedIcon className="text-blue-600" />

          <div>
            <p className="text-xs text-slate-500">
              Registration ID
            </p>

            <p className="text-sm font-bold text-blue-700">
              Auto Generated
            </p>
          </div>
        </div>

      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* PATIENT INFORMATION */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">
            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                <PersonIcon className="text-blue-600" />
              </div>

              <div>
                <h2 className="font-semibold text-slate-800">
                  Patient Information
                </h2>

                <p className="text-xs text-slate-500">
                  Enter the patient's basic information.
                </p>
              </div>

            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 p-5 sm:p-6 md:grid-cols-2">

            {/* Patient Name */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Patient Name <span className="text-red-500">*</span>
              </label>

              <div
                className={`flex items-center rounded-xl border bg-white transition ${
                  errors.patientName
                    ? "border-red-400"
                    : "border-slate-200 focus-within:border-blue-500"
                }`}
              >
                <PersonIcon className="ml-3 text-slate-400" />

                <input
                  type="text"
                  value={formData.patientName}
                  onChange={(event) =>
                    handleChange(
                      "patientName",
                      event.target.value
                    )
                  }
                  placeholder="Enter patient full name"
                  className="w-full rounded-xl border-0 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              {errors.patientName && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.patientName}
                </p>
              )}
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Age <span className="text-red-500">*</span>
              </label>

              <input
                type="number"
                min="1"
                max="120"
                value={formData.age}
                onChange={(event) =>
                  handleChange("age", event.target.value)
                }
                placeholder="Enter age"
                className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-800 outline-none transition ${
                  errors.age
                    ? "border-red-400"
                    : "border-slate-200 focus:border-blue-500"
                }`}
              />

              {errors.age && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.age}
                </p>
              )}
            </div>

            {/* Gender */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Gender <span className="text-red-500">*</span>
              </label>

              <select
                value={formData.gender}
                onChange={(event) =>
                  handleChange("gender", event.target.value)
                }
                className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 outline-none transition ${
                  errors.gender
                    ? "border-red-400"
                    : "border-slate-200 focus:border-blue-500"
                }`}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>

              {errors.gender && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.gender}
                </p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Phone <span className="text-red-500">*</span>
              </label>

              <div
                className={`flex items-center rounded-xl border bg-white ${
                  errors.phone
                    ? "border-red-400"
                    : "border-slate-200 focus-within:border-blue-500"
                }`}
              >
                <PhoneOutlinedIcon className="ml-3 text-slate-400" />

                <input
                  type="tel"
                  maxLength={10}
                  value={formData.phone}
                  onChange={(event) =>
                    handleChange(
                      "phone",
                      event.target.value.replace(/\D/g, "")
                    )
                  }
                  placeholder="Enter 10-digit phone number"
                  className="w-full rounded-xl border-0 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>

              {errors.phone && (
                <p className="mt-1.5 text-xs text-red-500">
                  {errors.phone}
                </p>
              )}
            </div>

            {/* Doctor / Referral */}
            <div>
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Doctor / Referral
              </label>

              <div className="flex items-center rounded-xl border border-slate-200 bg-white focus-within:border-blue-500">
                <LocalHospitalOutlinedIcon className="ml-3 text-slate-400" />

                <input
                  type="text"
                  value={formData.doctorReferral}
                  onChange={(event) =>
                    handleChange(
                      "doctorReferral",
                      event.target.value
                    )
                  }
                  placeholder="Enter doctor or referral source"
                  className="w-full rounded-xl border-0 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

            {/* Address */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-slate-700">
                Address
              </label>

              <div className="flex rounded-xl border border-slate-200 bg-white focus-within:border-blue-500">
                <HomeOutlinedIcon className="ml-3 mt-3 text-slate-400" />

                <textarea
                  value={formData.address}
                  onChange={(event) =>
                    handleChange(
                      "address",
                      event.target.value
                    )
                  }
                  placeholder="Enter patient address"
                  rows={3}
                  className="w-full resize-none rounded-xl border-0 bg-transparent px-3 py-3 text-sm text-slate-800 outline-none placeholder:text-slate-400"
                />
              </div>
            </div>

          </div>
        </section>

        {/* REQUIRED TESTS */}
        <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">

          <div className="border-b border-slate-200 px-5 py-4 sm:px-6">

            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
                  <ScienceOutlinedIcon className="text-blue-600" />
                </div>

                <div>
                  <h2 className="font-semibold text-slate-800">
                    Required Tests
                  </h2>

                  <p className="text-xs text-slate-500">
                    Select the laboratory tests required for this patient.
                  </p>
                </div>

              </div>

              <div className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700">
                {formData.requiredTests.length} Selected
              </div>

            </div>
          </div>

          <div className="p-5 sm:p-6">

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">

              {testOptions.map((test) => {
                const selected =
                  formData.requiredTests.includes(test.id);

                return (
                  <label
                    key={test.id}
                    className={`cursor-pointer rounded-xl border p-4 transition ${
                      selected
                        ? "border-blue-400 bg-blue-50"
                        : "border-slate-200 bg-white hover:border-blue-200 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-start gap-3">

                      <input
                        type="checkbox"
                        checked={selected}
                        onChange={() =>
                          handleTestChange(test.id)
                        }
                        className="mt-1 h-4 w-4 accent-blue-600"
                      />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {test.name}
                        </p>

                        <p className="mt-1 text-xs text-slate-500">
                          {test.category}
                        </p>
                      </div>

                    </div>
                  </label>
                );
              })}

            </div>

            {errors.requiredTests && (
              <p className="mt-3 text-xs text-red-500">
                {errors.requiredTests}
              </p>
            )}

          </div>
        </section>

        {/* ACTIONS */}
        <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">

          <button
            type="button"
            onClick={() => navigate("/patients")}
            className="
              rounded-xl
              border border-slate-200
              bg-white
              px-6 py-3
              text-sm font-semibold
              text-slate-700
              transition
              hover:bg-slate-50
            "
          >
            Cancel
          </button>

          <button
            type="submit"
            className="
              flex items-center justify-center gap-2
              rounded-xl
              bg-slate-700
              px-6 py-3
              text-sm font-semibold
              text-white
              shadow-sm
              transition
              hover:bg-slate-800
            "
          >
            <CheckCircleIcon fontSize="small" />
            Register Patient
          </button>

        </div>

      </form>
    </div>
  );
};

export default NewRegistration;