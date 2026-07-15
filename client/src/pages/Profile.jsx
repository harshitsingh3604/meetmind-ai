import { useEffect, useState } from "react";
import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";
import api from "../services/api";

const Profile = () => {

  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", });
  const [joinedDate, setJoinedDate] = useState("");
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState("");
  const [apiError, setApiError] = useState("");
  const [errors, setErrors] = useState({});
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordSuccess, setPasswordSuccess] = useState("");
  const [passwordApiError, setPasswordApiError] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);

        const response = await api.get("/profile");

        const user = response.data.data;

        setFormData({
          name: user.name,
          email: user.email,
        });

        setJoinedDate(user.createdAt || "");

      } catch (error) {
        console.error(error);

        setApiError(
          error.response?.data?.message ||
          "Unable to load profile."
        );

      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);



  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)
    ) {
      newErrors.email = "Enter a valid email address.";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

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



  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess("");
    setApiError("");

    if (!validateForm()) {
      return;
    }

    try {
      setSaving(true);

      const response = await api.put(
        "/profile",
        formData
      );

      setSuccess(
        response.data.message ||
        "Profile updated successfully."
      );

      // Update form with latest data returned by backend
      if (response.data.data) {
        setFormData({
          name: response.data.data.name,
          email: response.data.data.email,
        });
      }

    } catch (error) {
      console.error(error);

      if (error.response?.data?.errors) {
        setErrors(error.response.data.errors);
      } else {
        setApiError(
          error.response?.data?.message ||
          "Unable to update profile."
        );
      }

    } finally {
      setSaving(false);
    }
  };

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;

    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }));

    setPasswordErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const validatePasswordForm = () => {
    const newErrors = {};

    if (!passwordData.currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!passwordData.newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    }

    if (passwordData.newPassword.length < 6) {
      newErrors.newPassword =
        "Password must be at least 6 characters.";
    }

    if (!passwordData.confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required.";
    }

    if (
      passwordData.newPassword !==
      passwordData.confirmPassword
    ) {
      newErrors.confirmPassword =
        "Passwords do not match.";
    }

    setPasswordErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handlePasswordSubmit = async (e) => {
  e.preventDefault();

  setPasswordSuccess("");
  setPasswordApiError("");

  if (!validatePasswordForm()) {
    return;
  }

  try {
    setPasswordLoading(true);

    const response = await api.put(
      "/profile/password",
      {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      }
    );

    setPasswordSuccess(
      response.data.message ||
      "Password updated successfully."
    );

    setPasswordData({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

  } catch (error) {
    console.error(error);

    setPasswordApiError(
      error.response?.data?.message ||
      "Unable to update password."
    );

  } finally {
    setPasswordLoading(false);
  }
};


  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading profile...
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

            <div className="mb-8">

              <h1 className="text-3xl font-bold text-gray-800">
                Profile
              </h1>

              <p className="mt-2 text-gray-500">
                Manage your profile information and account security.
              </p>

            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold">
                Profile Information
              </h2>
            </div>

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

            <div className="rounded-xl bg-white p-8 shadow-md">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-6">

                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Name
                    </label>

                    <input
                      id="name"
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>

                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-gray-300 px-4 py-3 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                    />
                    {errors.email && (
                      <p className="mt-1 text-sm text-red-600">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  {joinedDate && (
                    <div>
                      <label className="mb-2 block text-sm font-medium text-gray-700">
                        Joined
                      </label>

                      <p className="text-gray-600">
                        {new Date(joinedDate).toLocaleDateString(
                          "en-GB",
                          {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                          }
                        )}
                      </p>
                    </div>
                  )}

                </div>

                <div className="flex justify-end gap-4 pt-6">
                  <button
                    type="submit"
                    disabled={saving}
                    className="rounded-xl bg-blue-600 px-6 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
                  >
                    {saving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </form>
            </div>

            <div className="mt-10 rounded-xl bg-white p-8 shadow-md">

              <h2 className="mb-6 text-2xl font-semibold">
                Change Password
              </h2>

              {passwordSuccess && (
                <div className="mb-6 rounded-xl bg-green-100 p-4 text-green-700">
                  {passwordSuccess}
                </div>
              )}

              {passwordApiError && (
                <div className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                  {passwordApiError}
                </div>
              )}

              <form
                onSubmit={handlePasswordSubmit}
                className="space-y-6"
              >

                {/* Current Password */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Current Password
                  </label>

                  <input
                    type="password"
                    name="currentPassword"
                    value={passwordData.currentPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />

                  {passwordErrors.currentPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.currentPassword}
                    </p>
                  )}
                </div>

                {/* New Password */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    New Password
                  </label>

                  <input
                    type="password"
                    name="newPassword"
                    value={passwordData.newPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />

                  {passwordErrors.newPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.newPassword}
                    </p>
                  )}
                </div>

                {/* Confirm Password */}

                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    name="confirmPassword"
                    value={passwordData.confirmPassword}
                    onChange={handlePasswordChange}
                    className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-100"
                  />

                  {passwordErrors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">
                      {passwordErrors.confirmPassword}
                    </p>
                  )}
                </div>

                <div className="flex justify-end">

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="rounded-xl bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {passwordLoading
                      ? "Changing Password..."
                      : "Change Password"}
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

export default Profile;