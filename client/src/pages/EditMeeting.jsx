import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import api from "../services/api";



const EditMeeting = () => {

  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");


  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    title: "",
    meetingType: "",
    participants: "",
    meetingDate: "",
    meetingNotes: "",
  });

  useEffect(() => {
    const fetchMeeting = async () => {
      try {
        setLoading(true);

        const response = await api.get(`/meetings/${id}`);

        const meeting = response.data.data;

        setFormData({
          title: meeting.title,
          meetingType: meeting.meetingType,
          participants: meeting.participants || "",
          meetingDate: meeting.meetingDate
            ? meeting.meetingDate.split("T")[0]
            : "",
          meetingNotes: meeting.meetingNotes,
        });

      } catch (error) {
        console.error(error);

        setError(
          error.response?.data?.message ||
          "Unable to load meeting."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchMeeting();
  }, [id]);

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
      setSaving(true);

      const response = await api.put(
        `/meetings/${id}`,
        formData
      );

      setSuccess(
        response.data.message ||
        "Meeting updated successfully."
      );

      setTimeout(() => {
        navigate(`/meetings/${id}`);
      }, 1500);

    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setApiError(
          error.response?.data?.message ||
          "Unable to update meeting."
        );
      }

    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading meeting...
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

      <Sidebar />

      <div className="ml-64 flex flex-1 flex-col">

        <Navbar />

        <main className="flex-1 bg-gray-100 p-6 md:p-8">

          <div className="mx-auto max-w-4xl">

            {/* Page Heading */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800">
                Edit Meeting
              </h1>

              <p className="mt-2 text-gray-500">
                Update meeting details and keep your meeting information up to date.
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
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
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
                    className="w-full resize-none rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />

                  {errors.meetingNotes && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.meetingNotes}
                    </p>
                  )}
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-4">

                  <button
                    type="button"
                    onClick={() => navigate(-1)}
                    disabled={saving}
                    className="rounded-xl border border-gray-300 bg-white px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {saving ? "Saving Changes..." : "Save Changes"}
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

export default EditMeeting;