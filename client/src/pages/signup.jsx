import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { authApi } from "../utils/api";

const Signup = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAccepted: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (pass) => /^(?=.*[A-Z])(?=.*\d).{6,}$/.test(pass);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    } else if (formData.fullName.trim().length < 2) {
      newErrors.fullName = "Name must be at least 2 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (!validatePassword(formData.password)) {
      newErrors.password =
        "Password must be 6+ chars with 1 uppercase & 1 number";
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.confirmPassword !== formData.password) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (!formData.termsAccepted) {
      newErrors.termsAccepted = "You must accept terms to continue";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    if (errors[name]) {
      setErrors({ ...errors, [name]: "" });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const data = await authApi.register({
        fullName: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      // Auto-login after signup
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      navigate("/");
    } catch (error) {
      setErrors({
        general: error?.message || "Signup failed. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-dark-primary via-dark-secondary to-dark-tertiary flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse" />
        <div
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent-cyan/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
      </div>

      {/* Signup Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-dark-secondary/80 backdrop-blur-xl border border-border-default rounded-2xl shadow-2xl p-6 sm:p-7 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-1.5">
              Create Account
            </h1>
            <p className="text-text-tertiary text-sm">
              Join the PicoForge community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-3.5">
            {/* General Error */}
            {errors.general && (
              <div
                className="bg-error/10 border border-error/30 text-error rounded-lg p-3 text-sm animate-slide-down"
                role="alert"
              >
                {errors.general}
              </div>
            )}

            {/* Full Name */}
            <div className="space-y-1.5">
              <label
                htmlFor="fullName"
                className="block text-sm font-semibold text-text-primary"
              >
                Full Name
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-dark-tertiary border ${
                  errors.fullName ? "border-error" : "border-border-default"
                } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all duration-200`}
                placeholder="Enter your full name"
                autoComplete="name"
              />
              {errors.fullName && (
                <p className="text-error text-xs mt-1 animate-slide-down">
                  {errors.fullName}
                </p>
              )}
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-primary"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-dark-tertiary border ${
                  errors.email ? "border-error" : "border-border-default"
                } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all duration-200`}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-error text-xs mt-1 animate-slide-down">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text-primary"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 pr-12 bg-dark-tertiary border ${
                    errors.password ? "border-error" : "border-border-default"
                  } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all duration-200`}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors p-1"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-error text-xs mt-1 animate-slide-down">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password */}
            <div className="space-y-1.5">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-semibold text-text-primary"
              >
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 pr-12 bg-dark-tertiary border ${
                    errors.confirmPassword
                      ? "border-error"
                      : "border-border-default"
                  } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all duration-200`}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-text-tertiary hover:text-text-primary transition-colors p-1"
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-error text-xs mt-1 animate-slide-down">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms Checkbox */}
            <div className="space-y-1.5 pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer group">
                <input
                  type="checkbox"
                  name="termsAccepted"
                  checked={formData.termsAccepted}
                  onChange={handleChange}
                  className={`mt-0.5 w-4 h-4 rounded border ${
                    errors.termsAccepted
                      ? "border-error"
                      : "border-border-default"
                  } bg-dark-tertiary text-accent-purple focus:ring-2 focus:ring-accent-purple focus:ring-offset-0 cursor-pointer transition-all`}
                />
                <span className="text-sm text-text-body group-hover:text-text-primary transition-colors leading-snug">
                  I agree to the{" "}
                  <a
                    href="#"
                    className="text-accent-purple hover:text-accent-purple-light font-medium transition-colors"
                  >
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a
                    href="#"
                    className="text-accent-purple hover:text-accent-purple-light font-medium transition-colors"
                  >
                    Privacy Policy
                  </a>
                </span>
              </label>
              {errors.termsAccepted && (
                <p className="text-error text-xs animate-slide-down">
                  {errors.termsAccepted}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 bg-linear-to-r from-accent-purple to-accent-purple-dark text-white font-semibold rounded-lg shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 mt-4 ${
                isLoading ? "relative" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <span className="opacity-0">Sign Up</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                </>
              ) : (
                "Sign Up"
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-border-default text-center">
            <p className="text-sm text-text-tertiary">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-accent-purple hover:text-accent-purple-light font-semibold transition-colors"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
