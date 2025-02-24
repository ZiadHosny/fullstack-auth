import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { useSignupMutation } from "@/api/auth/authApi";
import { setCredentials } from "@/api/auth/authSlice";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [signup, { isLoading, error }] = useSignupMutation();

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "" },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email").required("Required"),
      password: Yup.string()
        .min(8, "Must be at least 8 characters")
        .matches(/[A-Za-z]/, "Must contain at least one letter")
        .matches(/\d/, "Must contain at least one number")
        .matches(/[@$!%*?&]/, "Must contain at least one special character")
        .required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        const userData = await signup(values).unwrap();
        dispatch(setCredentials(userData));
        navigate("/");
      } catch (err) {
        console.error("Signup failed:", err);
      }
    },
  });

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-br from-blue-400 to-purple-500">
      <Card className="w-96 text-center p-6 shadow-xl bg-white/90 rounded-lg">
        <CardContent>
          <h2 className="text-3xl font-bold mb-4 text-indigo-700">Sign Up</h2>
          <form onSubmit={formik.handleSubmit} className="space-y-4">
            <Input
              type="text"
              {...formik.getFieldProps("name")}
              placeholder="Name"
              className="border border-indigo-300 focus:ring-indigo-500"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-red-500 text-sm">{formik.errors.name}</p>
            )}

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
              {isLoading ? "Signing up..." : "Sign Up"}
            </Button>
          </form>

          <div className="mt-4 text-sm">
            <p className="text-gray-700">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-600 hover:underline">
                Log in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;
