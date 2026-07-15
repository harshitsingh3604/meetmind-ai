import { useEffect, useState } from "react";
import api from "../services/api";

import {
  CalendarDays,
  FileText,
  CheckSquare,
  Clock,
} from "lucide-react";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import DashboardCard from "../components/ui/DashboardCard";



const Dashboard = () => {

  const [dashboardStats, setDashboardStats] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        setLoading(true);

        const response = await api.get("/dashboard/stats");

        setDashboardStats(response.data.data);

      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          "Unable to load dashboard."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchDashboardStats();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        Loading dashboard...
      </div>
    );
  }
  if (error) {
    return (
      <div className="p-6 text-red-600">
        {error}
      </div>
    );
  }

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
              title="Meetings This Month"
              value={dashboardStats.meetingsThisMonth}
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

                  {dashboardStats.recentMeetings?.length === 0 ? (

                    <tr>
                      <td
                        colSpan="4"
                        className="py-8 text-center text-gray-500"
                      >
                        No recent meetings found.
                      </td>
                    </tr>

                  ) : (

                    (dashboardStats.recentMeetings || []).map((meeting) => (

                      <tr
                        key={meeting.id}
                        className="border-b transition hover:bg-gray-50"
                      >
                        <td className="px-4 py-3">
                          {meeting.title}
                        </td>

                        <td className="px-4 py-3">
                          {new Date(meeting.meetingDate).toLocaleDateString(
                            "en-GB",
                            {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            }
                          )}
                        </td>

                        <td className="px-4 py-3">
                          {meeting.meetingType || "—"}
                        </td>

                        <td className="px-4 py-3">
                          —
                        </td>
                      </tr>

                    ))

                  )}

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