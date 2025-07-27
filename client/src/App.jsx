import "./App.css";
import MapWithParking from "./components/MapWithParking";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router";
import Login from "./pages/auth/login";
import Register from "./pages/auth/register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
const queryClient = new QueryClient();
function App() {
  return (
    <div className="h-full w-full">
      <QueryClientProvider client={queryClient}>
        <Router>
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex items-center justify-center min-h-screen bg-gray-100">
                  <MapWithParking />
                </div>
              }
            />
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
