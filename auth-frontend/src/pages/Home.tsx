import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { logout } from "@/api/auth/authSlice";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Card className="w-96 text-center p-6 shadow-xl bg-white/90 rounded-lg">
        <CardContent>
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">
            Welcome to the Application
          </h2>
          <p className="text-gray-700 mb-6">
            You are successfully logged in! Enjoy using our app. 🎉
          </p>

          <Button
            onClick={handleLogout}
            className="w-full bg-red-500 hover:bg-red-600 text-white"
          >
            Logout
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Home;
