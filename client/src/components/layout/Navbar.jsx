import { Bell, Search } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-white px-8 shadow-md">

      {/* Search Bar */}
      <div className="relative w-full max-w-lg">
        <Search
          size={18}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          placeholder="Search meetings..."
          className="w-full rounded-xl border border-gray-300 bg-gray-50 py-2 pl-10 pr-4 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-6">

        {/* Notification */}
        <button className="relative rounded-full p-2 transition hover:bg-gray-100">
          <Bell size={22} />

          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-red-500"></span>
        </button>

        {/* User */}
        <div className="flex items-center gap-3">

          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-600 text-lg font-semibold text-white">
            {user?.name?.charAt(0).toUpperCase() || "U"}
          </div>

          <div className="hidden text-left md:block">
            <p className="font-semibold text-gray-800">
              {user?.name || "User"}
            </p>

            <p className="text-sm text-gray-500">
              {user?.email || ""}
            </p>
          </div>

        </div>

      </div>

    </header>
  );
};

export default Navbar;