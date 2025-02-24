import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { RootState } from "@/api/store";
import { useDispatch, useSelector } from "react-redux";
import Login from "@/pages/Login";
import Home from "@/pages/Home";
import Signup from "@/pages/SignUp";
import { Toaster } from "./components/ui/sonner";
import Loading from "./components/Loading";
import { useProtectedQuery } from "./api/auth/authApi";
import { logout } from "./api/auth/authSlice";

const App = () => {
  const dispatch = useDispatch();

  const token = useSelector((state: RootState) => state.auth.token);
  const { data, error } = useProtectedQuery(undefined, { skip: !token });

  if (error) {
    dispatch(logout());
  }

  const isAuthenticated = !!data;

  return (
    <div className="bg-gray-100 min-h-screen">
      <Toaster position="top-right" richColors />
      <Loading />
      <Router>
        <Routes>
          <Route
            path="/"
            element={
              isAuthenticated && token ? <Home /> : <Navigate to="/login" />
            }
          />
          <Route path="/signup" element={<Signup />} />
          <Route
            path="/login"
            element={isAuthenticated && token ? <Navigate to="/" /> : <Login />}
          />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
