import { NavLink, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  CalendarDays,
  User,
  LogOut,
} from "lucide-react";

import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const navLinkClass = ({ isActive }) =>
    `flex items-center gap-3 rounded-lg px-4 py-3 font-medium transition-all duration-200 ${
      isActive
        ? "bg-white text-blue-600  shadow"
        : "text-gray-700 hover:bg-gray-100 hover:text-blue-600"
    }`;

  return (
    <aside className="fixed left-0 top-0 flex h-screen w-64 flex-col bg-blue-600 text-white shadow-lg">

      {/* Logo */}
      <div className="border-b p-6">
        <h1 className="text-2xl font-bold text-white">
          MeetMind AI
        </h1>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2 p-4">

        <NavLink
          to="/dashboard"
          className={navLinkClass}
        >
          <LayoutDashboard size={20} />
          Dashboard
        </NavLink>

        <NavLink
          to="/meetings"
          className={navLinkClass}
        >
          <CalendarDays size={20} />
          Meetings
        </NavLink>

        <NavLink
          to="/profile"
          className={navLinkClass}
        >
          <User size={20} />
          Profile
        </NavLink>

      </nav>

      {/* Logout */}
      <div className="border-t p-4">

        <button
          onClick={handleLogout}
          className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-red-600 transition hover:bg-red-50"
        >
          <LogOut size={20} />
          Logout
        </button>

      </div>

    </aside>
  );
};

export default Sidebar;