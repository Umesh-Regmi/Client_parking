import "./App.css";
import MapWithParking from "./components/MapWithParking";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
import MyBookings from "./pages/auth/my-bookings";
import PrivateRoute from "./components/private-route";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="h-full w-full tracking-wider">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            {/* Protected Routes */}
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<MapWithParking />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>
           
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </Routes>
        </Router>
        <Toaster position="top-right" />
      </QueryClientProvider>
    </div>
  );
}

export default App;
