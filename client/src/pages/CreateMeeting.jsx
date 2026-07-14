import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateMeeting = () => {

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    meetingType: "",
    participants: "",
    meetingNotes: "",
    meetingDate: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.title.trim()) {
      newErrors.title = "Meeting title is required.";
    }

    if (!formData.meetingType) {
      newErrors.meetingType = "Meeting type is required.";
    }

    if (!formData.meetingDate) {
      newErrors.meetingDate = "Meeting date is required.";
    }

    if (!formData.meetingNotes.trim()) {
      newErrors.meetingNotes = "Meeting notes cannot be empty.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {

    e.preventDefault();
    setApiError("");
    setSuccess("");

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("/meetings", formData);

      setSuccess(response.data.message || "Meeting created successfully.");

      setFormData({
        title: "",
        meetingType: "",
        participants: "",
        meetingNotes: "",
        meetingDate: "",
      });

      setErrors({});

      setTimeout(() => {
        navigate("/dashboard");
      }, 1500);

    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setApiError(
          error.response?.data?.message ||
          "Unable to create meeting. Please try again."
        );
      }
    } finally {
    setLoading(false);
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

        <div className="mx-auto w-full max-w-4xl">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">
              Create Meeting
            </h1>

            <p className="mt-2 text-gray-500">
              Add meeting details to generate AI-powered summaries and action items.
            </p>
          </div>

          {/* Form Card */}
          <div className="rounded-xl bg-white p-8 shadow-md">

            {success && (
              <div className="mb-6 rounded-xl bg-green-100 p-4 text-green-700">
                {success}
              </div>
            )}
            {apiError && (
              <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-red-700">
                {apiError}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">

              {/* Meeting Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Meeting Title
                </label>

                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="Sprint Planning"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                {errors.title && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Meeting Type */}
              <div>
                <label
                  htmlFor="meetingType"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Meeting Type
                </label>

                <select
                  id="meetingType"
                  name="meetingType"
                  value={formData.meetingType}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">Select Meeting Type</option>
                  <option value="Team Meeting">Team Meeting</option>
                  <option value="Client Meeting">Client Meeting</option>
                  <option value="Interview">Interview</option>
                  <option value="Standup">Standup</option>
                  <option value="Other">Other</option>
                </select>
                {errors.meetingType && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.meetingType}
                  </p>
                )}
              </div>

              {/* Participants */}
              <div>
                <label
                  htmlFor="participants"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Participants
                </label>

                <input
                  type="text"
                  id="participants"
                  name="participants"
                  value={formData.participants}
                  onChange={handleChange}
                  placeholder="Alice, Bob, Charlie"
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Meeting Date */}
              <div>
                <label
                  htmlFor="meetingDate"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Meeting Date
                </label>

                <input
                  type="date"
                  id="meetingDate"
                  name="meetingDate"
                  value={formData.meetingDate}
                  onChange={handleChange}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                />
                {errors.meetingDate && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.meetingDate}
                  </p>
                )}
              </div>

              {/* Meeting Notes */}
              <div>
                <label
                  htmlFor="meetingNotes"
                  className="mb-2 block text-sm font-medium text-gray-700"
                >
                  Meeting Notes
                </label>

                <textarea
                  id="meetingNotes"
                  name="meetingNotes"
                  rows="6"
                  value={formData.meetingNotes}
                  onChange={handleChange}
                  placeholder={`Discussed backend APIs...

Deployment scheduled...

Testing next week...`}
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100 resize-y"
                />
                {errors.meetingNotes && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.meetingNotes}
                  </p>
                )}
              </div>

              <div className="flex justify-end gap-4">

                <button
                  type="button"
                  onClick={() => navigate("/dashboard")}
                  disabled={loading}
                  className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={loading}
                  className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {loading ? "Saving..." : "Save Meeting"}
                </button>

              </div>

            </form>

          </div>
        </div>
      </main>

    </div>

  </div>
);
};

export default CreateMeeting;