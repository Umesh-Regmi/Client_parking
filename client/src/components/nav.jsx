import { useNavigate } from "react-router";
import { useState, useEffect } from "react";

export default function NavBar() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };

  const goToBookings = () => {
    navigate("/my-bookings");
  };

  return (
    <nav className="w-full bg-indigo-500 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Left Section: Logo or Title */}
      <div className="text-xl font-bold cursor-pointer" onClick={() => navigate("/")}>
        Parking
      </div>

     

      {/* Right Section: User, My Bookings & Logout */}
      <div className="flex items-center gap-4">
        {user && (
          <>
            <span className="text-sm md:text-base">
              Hello, <strong>{user.name}</strong>
            </span>
            <button
              onClick={goToBookings}
              className="bg-white text-indigo-500 hover:bg-gray-200 px-4 py-2 rounded font-medium"
            >
              My Bookings
            </button>
          </>
        )}
        <button
          onClick={handleLogout}
          className="bg-indigo-500 hover:bg-blue-700 text-white px-4 py-2 rounded font-medium"
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
