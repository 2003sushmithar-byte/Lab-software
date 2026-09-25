import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import PersonAddAltOutlinedIcon from "@mui/icons-material/PersonAddAltOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import PendingActionsOutlinedIcon from "@mui/icons-material/PendingActionsOutlined";
import VerifiedOutlinedIcon from "@mui/icons-material/VerifiedOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import ReceiptLongOutlinedIcon from "@mui/icons-material/ReceiptLongOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowForwardOutlinedIcon from "@mui/icons-material/ArrowForwardOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";

const Dashboard = () => {
  const statistics = [
    {
      title: "Total Patients",
      value: "1,248",
      description: "Registered patients",
      icon: PeopleAltOutlinedIcon,
    },
    {
      title: "Today's Patients",
      value: "42",
      description: "Today's registrations",
      icon: PersonAddAltOutlinedIcon,
    },
    {
      title: "Today's Tests",
      value: "86",
      description: "Tests scheduled today",
      icon: ScienceOutlinedIcon,
    },
    {
      title: "Pending Samples",
      value: "18",
      description: "Waiting for processing",
      icon: Inventory2OutlinedIcon,
    },
    {
      title: "Processing",
      value: "24",
      description: "Samples under analysis",
      icon: PendingActionsOutlinedIcon,
    },
    {
      title: "Pending Verification",
      value: "12",
      description: "Results awaiting review",
      icon: VerifiedOutlinedIcon,
    },
    {
      title: "Pending Reports",
      value: "8",
      description: "Reports to generate",
      icon: DescriptionOutlinedIcon,
    },
    {
      title: "Today's Collection",
      value: "₹48,650",
      description: "Collected today",
      icon: PaymentsOutlinedIcon,
    },
  ];

  const quickActions = [
    {
      title: "New Registration",
      description: "Register a new patient",
      icon: PersonAddAltOutlinedIcon,
    },
    {
      title: "Add Test",
      description: "Create laboratory test",
      icon: ScienceOutlinedIcon,
    },
    {
      title: "Collect Sample",
      description: "Record sample collection",
      icon: Inventory2OutlinedIcon,
    },
    {
      title: "Accession",
      description: "Receive collected samples",
      icon: ReceiptLongOutlinedIcon,
    },
    {
      title: "Enter Result",
      description: "Enter test results",
      icon: DescriptionOutlinedIcon,
    },
    {
      title: "Create Bill",
      description: "Create patient billing",
      icon: PaymentsOutlinedIcon,
    },
  ];

  const pendingSamples = [
    {
      sampleId: "SMP-1025",
      patient: "Arun Kumar",
      test: "Complete Blood Count",
      status: "Pending",
      time: "10:25 AM",
    },
    {
      sampleId: "SMP-1026",
      patient: "Priya Sharma",
      test: "Liver Function Test",
      status: "Processing",
      time: "10:42 AM",
    },
    {
      sampleId: "SMP-1027",
      patient: "Rahul Raj",
      test: "Thyroid Profile",
      status: "Pending",
      time: "11:05 AM",
    },
    {
      sampleId: "SMP-1028",
      patient: "Meena Devi",
      test: "Lipid Profile",
      status: "Processing",
      time: "11:20 AM",
    },
  ];

  return (
    <div className="space-y-6">

      {/* Page Heading */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-blue-600">
            Laboratory Overview
          </p>

          <h2 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
            Dashboard
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Monitor today's laboratory operations and activities.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5">
          <AccessTimeOutlinedIcon className="text-lg text-slate-400" />

          <div>
            <p className="text-xs font-medium text-slate-500">
              Today
            </p>
            <p className="text-sm font-semibold text-slate-800">
              Laboratory Overview
            </p>
          </div>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {statistics.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500">
                    {item.title}
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-slate-900">
                    {item.value}
                  </h3>

                  <p className="mt-1 text-xs text-slate-400">
                    {item.description}
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                  <Icon />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Quick Actions */}
      <section>
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-900">
              Quick Actions
            </h3>

            <p className="mt-1 text-sm text-slate-500">
              Frequently used laboratory operations
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <button
                key={action.title}
                type="button"
                className="group rounded-xl border border-slate-200 bg-white p-4 text-left shadow-sm transition-all hover:-translate-y-0.5 hover:border-blue-200 hover:shadow-md"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
                    <Icon className="text-xl" />
                  </div>

                  <ArrowForwardOutlinedIcon className="text-lg text-slate-300 transition-transform group-hover:translate-x-1 group-hover:text-blue-500" />
                </div>

                <h4 className="mt-4 text-sm font-semibold text-slate-800">
                  {action.title}
                </h4>

                <p className="mt-1 text-xs leading-5 text-slate-400">
                  {action.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Bottom Content */}
      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.5fr_1fr]">

        {/* Sample Processing */}
        <section className="overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Sample Processing
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Recently received laboratory samples
              </p>
            </div>

            <button
              type="button"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700"
            >
              View All
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[650px]">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/70">
                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Sample ID
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Patient
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Test
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Time
                  </th>

                  <th className="px-5 py-3 text-left text-xs font-semibold text-slate-500">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody>
                {pendingSamples.map((sample) => (
                  <tr
                    key={sample.sampleId}
                    className="border-b border-slate-100 last:border-0 hover:bg-slate-50"
                  >
                    <td className="px-5 py-4 text-sm font-semibold text-slate-800">
                      {sample.sampleId}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {sample.patient}
                    </td>

                    <td className="px-5 py-4 text-sm text-slate-600">
                      {sample.test}
                    </td>

                    <td className="px-5 py-4 text-xs text-slate-500">
                      {sample.time}
                    </td>

                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-semibold ${
                          sample.status === "Processing"
                            ? "bg-blue-50 text-blue-600"
                            : "bg-amber-50 text-amber-600"
                        }`}
                      >
                        {sample.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* Pending Work */}
        <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-bold text-slate-900">
                Pending Work
              </h3>

              <p className="mt-1 text-xs text-slate-500">
                Items requiring attention
              </p>
            </div>

            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600">
              <PendingActionsOutlinedIcon />
            </div>
          </div>

          <div className="mt-5 space-y-3">

            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-amber-500" />

                <span className="text-sm font-medium text-slate-700">
                  Pending Samples
                </span>
              </div>

              <span className="text-sm font-bold text-slate-900">
                18
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-blue-500" />

                <span className="text-sm font-medium text-slate-700">
                  Results Processing
                </span>
              </div>

              <span className="text-sm font-bold text-slate-900">
                24
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-purple-500" />

                <span className="text-sm font-medium text-slate-700">
                  Verification Pending
                </span>
              </div>

              <span className="text-sm font-bold text-slate-900">
                12
              </span>
            </div>

            <div className="flex items-center justify-between rounded-lg bg-slate-50 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-emerald-500" />

                <span className="text-sm font-medium text-slate-700">
                  Reports Pending
                </span>
              </div>

              <span className="text-sm font-bold text-slate-900">
                8
              </span>
            </div>

          </div>

          <button
            type="button"
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-lg border border-slate-200 py-2.5 text-xs font-semibold text-slate-600 transition-colors hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
          >
            <AddOutlinedIcon className="text-base" />
            View Laboratory Tasks
          </button>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;