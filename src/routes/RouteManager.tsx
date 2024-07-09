import { Route, BrowserRouter, Routes, useLocation, Navigate } from "react-router-dom";
import Movies from "../screens/movies/Index";
import Navbar from "../components/Navbar";
import LoginPage from "../screens/Login/Index";
import SignUp from "../screens/Signup/Index";
import MovieDetail from "../screens/movie/Index";
import Favorites from "../screens/Favorites/Index";

interface PrivateRouteProps {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const token = localStorage.getItem("user");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return <>{children}</>;
};


const RouteManager = () => {
  return (
    <BrowserRouter>
      <Routing />
    </BrowserRouter>
  );
};

const Routing = () => {
  const location = useLocation();

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Movies />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/movies/:id" element={<MovieDetail />} />
        <Route
          path="/favorites"
          element={
            <PrivateRoute>
              <Favorites />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  );
};

export default RouteManager;
