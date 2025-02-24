import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useLoginMutation } from "@/api/auth/authApi";
import { setCredentials } from "@/api/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading, error }] = useLoginMutation();

  const formik = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string().required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const userData = await login(values).unwrap();
        dispatch(setCredentials(userData));
        navigate("/");
      } catch (err) {
        console.error("Login failed:", err);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Card className="w-96 text-center p-6 shadow-xl bg-white/90 rounded-lg">
        <CardContent>
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Login</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
              type="email"
              {...formik.getFieldProps("email")}
              placeholder="Email"
              className="border border-indigo-300 focus:ring-indigo-500"
            />
            {formik.touched.email && formik.errors.email && (
              <p className="text-red-500 text-sm">{formik.errors.email}</p>
            )}

            <Input
              type="password"
              {...formik.getFieldProps("password")}
              placeholder="Password"
              className="border border-indigo-300 focus:ring-indigo-500"
            />
            {formik.touched.password && formik.errors.password && (
              <p className="text-red-500 text-sm">{formik.errors.password}</p>
            )}

            {error && (
              <p className="text-red-500 text-sm">
                {(error as any).data?.message}
              </p>
            )}

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isLoading ? "Logging in..." : "Log In"}
            </Button>
          </form>

          <div className="mt-4 text-sm">
            <p className="text-gray-700">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-600 hover:underline">
                Sign Up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;
