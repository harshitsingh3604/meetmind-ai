import {
  CalendarDays,
  FileText,
  CheckSquare,
  Clock,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import DashboardCard from "../components/ui/DashboardCard";

const dashboardStats = {
  totalMeetings: 15,
  aiSummaries: 10,
  pendingTasks: 6,
  recentMeetings: 5,
};



const recentMeetings = [
  {
    id: 1,
    title: "Sprint Planning",
    date: "12 Jul 2026",
    type: "Team",
    status: "Completed",
  },
  {
    id: 2,
    title: "Client Discussion",
    date: "11 Jul 2026",
    type: "Client",
    status: "Pending",
  },
  {
    id: 3,
    title: "Project Review",
    date: "10 Jul 2026",
    type: "Review",
    status: "Completed",
  },
  {
    id: 4,
    title: "AI Brainstorming",
    date: "09 Jul 2026",
    type: "Workshop",
    status: "Pending",
  },
  {
    id: 5,
    title: "Weekly Sync",
    date: "08 Jul 2026",
    type: "Internal",
    status: "Completed",
  },
];

const Dashboard = () => {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Dashboard Content */}
        <main className="flex-1 p-6 md:p-8">

          {/* Dashboard Cards */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">

            <DashboardCard
              title="Total Meetings"
              value={dashboardStats.totalMeetings}
              icon={<CalendarDays size={28} />}
            />

            <DashboardCard
              title="AI Summaries"
              value={dashboardStats.aiSummaries}
              icon={<FileText size={28} />}
            />

            <DashboardCard
              title="Pending Tasks"
              value={dashboardStats.pendingTasks}
              icon={<CheckSquare size={28} />}
            />

            <DashboardCard
              title="Recent Meetings"
              value={dashboardStats.recentMeetings}
              icon={<Clock size={28} />}
            />

          </div>

          {/* Recent Meetings */}
          <div className="mt-8 rounded-xl bg-white p-6 shadow-md">

            <h2 className="mb-6 text-xl font-semibold">
              Recent Meetings
            </h2>

            <div className="overflow-x-auto">

              <table className="min-w-full">

                <thead>

                  <tr className="border-b transition hover:bg-gray-50">

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Meeting
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Date
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Type
                    </th>

                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-600">
                      Status
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {recentMeetings.map((meeting) => (

                    <tr
                      key={meeting.id}
                      className="border-b transition hover:bg-gray-50"
                    >

                      <td className="px-4 py-4 font-medium">
                        {meeting.title}
                      </td>

                      <td className="px-4 py-4">
                        {meeting.date}
                      </td>

                      <td className="px-4 py-4">
                        {meeting.type}
                      </td>

                      <td className="px-4 py-4">

                        <span
                          className={`rounded-full px-3 py-1 text-xs font-semibold ${meeting.status === "Completed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                            }`}
                        >
                          {meeting.status}
                        </span>

                      </td>

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Dashboard; 