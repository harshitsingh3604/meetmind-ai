import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    if (!formData.name.trim()) {
      return "Name is required.";
    }

    if (!formData.email.trim()) {
      return "Email is required.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
      return "Enter a valid email address.";
    }

    if (formData.password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      await register(formData);

      setSuccess("Registration successful.");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);

    } catch (err) {
      setError(
        err.response?.data?.message ||
        "Registration failed."
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">

        <h1 className="mb-6 text-center text-3xl font-bold">
          Create Account
        </h1>

        {error && (
          <p className="mb-4 rounded bg-red-100 p-2 text-red-700">
            {error}
          </p>
        )}

        {success && (
          <p className="mb-4 rounded bg-green-100 p-2 text-green-700">
            {success}
          </p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full rounded border p-3"
          />

          <button
            type="submit"
            className="w-full rounded bg-blue-600 p-3 text-white hover:bg-blue-700"
          >
            Register
          </button>

        </form>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link
            to="/"
            className="font-medium text-blue-600"
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
};

export default Register;