import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { toast } from "react-toastify";

// import ecoCycleLogo from "../assets/ecocycle-logo.png";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.jsx";

function Signup() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    location: "",
    gender: "",
    password: "",
    confirmPassword: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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

    if (
      !formData.name ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.location ||
      !formData.gender ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: Number(formData.phoneNumber),
        location: formData.location,
        gender: formData.gender,
        password: formData.password,
      };

      const response = await axios.post(
        "https://waste-management-3-iw0g.onrender.com/api/auth/register",
        payload
      );

      const data = response.data;

      if (data.token && data.user) {
        login(data.token, data.user);

        toast.success("Account created successfully!");

        navigate("/dashboard");
      } else {
        toast.success("Account created. Please log in.");

        navigate("/login");
      }
    } catch (error) {
      console.error("Registration error:", error);

      const message =
        error.response?.data?.message ||
        "Unable to create your account. Please try again.";

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
              Start making every cycle count.
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

            <h1 className=" font-medium tracking-tight text-[#18352a] text-3xl">
              Create your account
            </h1>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              {/* Full name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-base font-medium text-[#26372f]"
                >
                  Full name <span className="text-[#0d4f38]">*</span>
                </label>

                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter value"
                  autoComplete="name"
                  required
                  className="h-14 w-full rounded-xl border border-[#d7e0da] bg-white px-4 text-base outline-none transition placeholder:text-[#78857e] focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="signup-email"
                  className="mb-2 block text-base font-medium text-[#26372f]"
                >
                  Email <span className="text-[#0d4f38]">*</span>
                </label>

                <input
                  id="signup-email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter value"
                  autoComplete="email"
                  required
                  className="h-14 w-full rounded-xl border border-[#d7e0da] bg-white px-4 text-base outline-none transition placeholder:text-[#78857e] focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                />
              </div>

              {/* Phone */}
              <div>
                <label
                  htmlFor="phoneNumber"
                  className="mb-2 block text-base font-medium text-[#26372f]"
                >
                  Phone number
                </label>

                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter value"
                  autoComplete="tel"
                  className="h-14 w-full rounded-xl border border-[#d7e0da] bg-white px-4 text-base outline-none transition placeholder:text-[#78857e] focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                />
              </div>

              {/* Location */}
              <div>
                <label
                  htmlFor="location"
                  className="mb-2 block text-base font-medium text-[#26372f]"
                >
                  Location
                </label>

                <input
                  id="location"
                  name="location"
                  type="text"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter value"
                  required
                  className="h-14 w-full rounded-xl border border-[#d7e0da] bg-white px-4 text-base outline-none transition placeholder:text-[#78857e] focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                />
              </div>

              {/* Gender + Password */}
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="gender"
                    className="mb-2 block text-base font-medium text-[#26372f]"
                  >
                    Gender
                  </label>

                  <select
                    id="gender"
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="h-14 w-full rounded-xl border border-[#d7e0da] bg-white px-4 text-base text-[#68766f] outline-none transition focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                  >
                    <option value="">Enter value</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="signup-password"
                    className="mb-2 block text-base font-medium text-[#26372f]"
                  >
                    Password <span className="text-[#0d4f38]">*</span>
                  </label>

                  <div className="relative">
                    <input
                      id="signup-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleChange}
                      autoComplete="new-password"
                      required
                      className="h-14 w-full rounded-xl border border-[#d7e0da] bg-white px-4 pr-12 text-base outline-none transition focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                    />

                    <button
                      type="button"
                      onClick={() => setShowPassword((prev) => !prev)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68766f] hover:text-[#0d4f38]"
                    >
                      {showPassword ? (
                        <EyeOff size={19} />
                      ) : (
                        <Eye size={19} />
                      )}
                    </button>
                  </div>
                </div>
              </div>

              {/* Confirm password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-2 block text-base font-medium text-[#26372f]"
                >
                  Confirm password{" "}
                  <span className="text-[#0d4f38]">*</span>
                </label>

                <div className="relative">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    autoComplete="new-password"
                    required
                    className="h-14 w-full rounded-xl border border-[#d7e0da] bg-white px-4 pr-12 text-base outline-none transition focus:border-[#2d8b57] focus:ring-2 focus:ring-[#2d8b57]/10"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword((prev) => !prev)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#68766f] hover:text-[#0d4f38]"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="rounded-xl bg-[#0d4f38] px-7 py-3.5 text-base font-medium text-white transition hover:bg-[#083d2b] disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Creating account..." : "Create account"}
              </button>
            </form>

            <p className="mt-6 text-sm text-[#68766f]">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-[#2d8b57] hover:text-[#0d4f38]"
              >
                Log in
              </Link>
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

export default Signup;