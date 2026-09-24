import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Leaf } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.email || !formData.password) {
      toast.error("Please enter your email and password.");
      return;
    }

    try {
      setLoading(true);

      const response = await axios.post(
        "https://waste-management-3-iw0g.onrender.com/api/auth/login",
        formData
      );

      const data = response.data;

      if (!data.token || !data.user) {
        throw new Error("Invalid login response.");
      }

      login(data.token, data.user);

      toast.success("Welcome back!");

      if (data.user.role === "Community_admin") {
        navigate("/admin");
      } else if (data.user.role === "Collector") {
        navigate("/collector");
      } else {
        navigate("/houser");
      }
    } catch (error) {
      console.error("Login error:", error);

      const message =
        error.response?.data?.message ||
        "Unable to log in. Please check your details and try again.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f7f9f6] px-4 py-6 sm:px-8 sm:py-10">
      <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-[1400px] overflow-hidden rounded-[32px] border border-[#dce5df] bg-white shadow-[0_20px_70px_rgba(15,55,38,0.08)]">
        {/* Green panel */}
        <section className="relative hidden w-[32%] flex-col justify-between bg-[#0d4f38] p-10 text-white lg:flex xl:p-12">
          <Link to="/" className="inline-flex items-center">
            <img
              src="/ecocycle.png"
              alt="EcoCycle"
              className="h-20 w-auto brightness-0 invert"
            />
          </Link>

          <div className="max-w-[250px]">
            <h2 className="text-3xl font-semibold leading-tight xl:text-4xl">
              Welcome back to your cleaner community.
            </h2>
          </div>
        </section>

        {/* Form */}
        <section className="flex w-full flex-col justify-center px-6 py-10 sm:px-12 lg:w-[68%] lg:px-16 xl:px-20">
          <div className="mx-auto w-full max-w-[560px]">
            <div className="mb-8 lg:hidden">
              <Link to="/" className="inline-flex items-center">
                <img
                  src="/ecocycle.png"
                  alt="EcoCycle"
                  className="h-20 w-auto"
                />
              </Link>
            </div>

            <h1 className="text-4xl font-medium tracking-tight text-[#18352a] sm:text-5xl">
              Log in
            </h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="login-email"
                  className="mb-2 block text-base font-medium text-[#26372f]"
                >
                  Email <span className="text-[#0d4f38]">*</span>
                </label>

                <input
                  id="login-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="lawrence@example.com"
                  autoComplete="email"
                  required
                  className="h-14 w-full rounded-xl border border-[#d7e0da] bg-white px-4 text-base text-[#18352a] outline-none transition placeholder:text-[#78857e] focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                />
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="login-password"
                  className="mb-2 block text-base font-medium text-[#26372f]"
                >
                  Password <span className="text-[#0d4f38]">*</span>
                </label>

                <div className="relative">
                  <input
                    id="login-password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleChange}
                    autoComplete="current-password"
                    required
                    className="h-14 w-full rounded-xl border border-[#d7e0da] bg-white px-4 pr-14 text-base text-[#18352a] outline-none transition focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#68766f] transition hover:text-[#0d4f38]"
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff size={20} />
                    ) : (
                      <Eye size={20} />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <button
                  type="button"
                  className="text-sm font-medium text-[#2d8b57] transition hover:text-[#0d4f38]"
                >
                  Forgot password? Reset it securely
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#0d4f38] px-7 py-3.5 text-base font-medium text-white transition hover:bg-[#083d2b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Logging in..." : "Log in"}
              </button>
            </form>

            <p className="mt-6 text-sm text-[#68766f]">
              New to EcoCycle?{" "}
              <Link
                to="/signup"
                className="font-medium text-[#2d8b57] hover:text-[#0d4f38]"
              >
                Register
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Login;