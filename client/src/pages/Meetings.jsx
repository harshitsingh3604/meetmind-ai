import { useEffect, useState } from "react";
import api from "../services/api";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { Link } from "react-router-dom";

const Meetings = () => {

  const [meetings, setMeetings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMeetings = async () => {
      try {
        setLoading(true);

        const response = await api.get("/meetings");

        setMeetings(response.data.data || []);
      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          "Unable to load meetings."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMeetings();
  }, []);

  const handleDelete = async (meetingId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this meeting?"
    );

    if (!confirmed) return;

    try {
      await api.delete(`/meetings/${meetingId}`);

      setMeetings((prevMeetings) =>
        prevMeetings.filter(
          (meeting) => meeting.id !== meetingId
        )
      );

    } catch (error) {
      console.error(error);

      setError(
        error.response?.data?.message ||
        "Unable to delete meeting."
      );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-64 flex flex-1 flex-col">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="flex-1 bg-gray-100 p-6 md:p-8">

          <div className="mx-auto w-full max-w-6xl">

            {/* Page Header */}
            <div className="mb-8 flex items-center justify-between">

              <div>
                <h1 className="text-3xl font-bold text-gray-800">
                  Meetings
                </h1>

                <p className="mt-2 text-gray-500">
                  View, manage, and organize all your meetings in one place.
                </p>
              </div>

              <Link
                to="/meetings/new"
                className="rounded-lg bg-blue-600 px-5 py-3 font-medium text-white transition hover:bg-blue-700"
              >
                + Create Meeting
              </Link>

            </div>

            {/* Meeting List Card */}
            <div className="rounded-xl bg-white p-8 shadow-md">

              {error ? (

                <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                  {error}
                </div>

              ) : loading ? (

                <div className="flex flex-col items-center justify-center py-12">
                  <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"></div>

                  <p className="mt-4 text-gray-500">
                    Loading meetings...
                  </p>
                </div>

              ) : meetings.length === 0 ? (

                <div className="flex flex-col items-center justify-center py-16">

                  <h2 className="text-2xl font-semibold text-gray-700">
                    No meetings found
                  </h2>

                  <p className="mt-3 text-center text-gray-500">
                    Create your first meeting to start managing your notes and AI summaries.
                  </p>

                </div>

              ) : (

                <div className="grid gap-6">

                  {meetings.map((meeting) => (

                    <div
                      key={meeting.id}
                      className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
                    >

                      <div className="grid gap-4 md:grid-cols-2">

                        <div className="div">
                          <p className="text-sm font-medium text-gray-500">
                            Meeting Title
                          </p>
                          <p className="text-xl font-semibold text-gray-800">
                            {meeting.title}
                          </p>
                        </div>

                        <div className="div">
                          <p className="text-sm font-medium text-gray-500">
                            Meeting Type
                          </p>
                          <p className="text-xl font-semibold text-gray-800">
                            {meeting.meeting_type}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 grid gap-4 md:grid-cols-2">

                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Participants
                          </p>

                          <p className="mt-1 text-gray-800">
                            {meeting.participants || "No participants"}
                          </p>
                        </div>

                        <div>
                          <p className="text-sm font-medium text-gray-500">
                            Meeting Date
                          </p>

                          <p className="mt-1 text-gray-800">
                            {new Date(meeting.meeting_date).toLocaleDateString("en-GB", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                          </p>
                        </div>

                      </div>

                      <div className="mt-6 flex flex-wrap gap-3">

                        <Link
                          to={`/meetings/${meeting.id}`}
                          className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                        >
                          View
                        </Link>

                        <Link
                          to={`/meetings/${meeting.id}/edit`}
                          className="rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600"
                        >
                          Edit
                        </Link>

                        <button
                          onClick={() => handleDelete(meeting.id)}
                          className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                        >
                          Delete
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              )}

            </div>

          </div>

        </main>

      </div>

    </div>
  );
};

export default Meetings;