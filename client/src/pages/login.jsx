import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { authApi } from "../utils/api";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
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
      const data = await authApi.login({
        email: formData.email,
        password: formData.password,
      });

      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));

      if (formData.rememberMe)
        localStorage.setItem("userEmail", formData.email);
      navigate("/");
    } catch (error) {
      setErrors({
        general: error?.message || "Login failed. Please try again.",
      });
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Login successful:", formData);
      localStorage.setItem("isAuthenticated", "true");
      if (formData.rememberMe) {
        localStorage.setItem("userEmail", formData.email);
      }
      navigate("/");
    } catch (error) {
      setErrors({ general: "Login failed. Please try again." });
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
          className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDelay: "1s" }}
        />
    <div className="min-h-screen bg-gradient-to-br from-dark-primary via-dark-secondary to-dark-tertiary flex items-center justify-center p-4 sm:p-6 lg:p-8 relative overflow-hidden">
      {/* Background Glow Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent-blue/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      {/* Login Card */}
      <div className="relative w-full max-w-md">
        <div className="bg-dark-secondary/80 backdrop-blur-xl border border-border-default rounded-2xl shadow-2xl p-6 sm:p-7 animate-fade-in">
          {/* Header */}
          <div className="text-center mb-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-text-primary mb-1.5">
              Welcome Back
            </h1>
            <p className="text-text-tertiary text-sm">
              Sign in to continue to PicoForge
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            {/* General Error */}
            {errors.general && (
              <div
                className="bg-error/10 border border-error/30 text-error rounded-lg p-3 text-sm animate-slide-down"
                role="alert"
              >
              <div className="bg-error/10 border border-error/30 text-error rounded-lg p-3 text-sm animate-slide-down" role="alert">
                {errors.general}
              </div>
            )}

            {/* Email Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="email"
                className="block text-sm font-semibold text-text-primary"
              >
              <label htmlFor="email" className="block text-sm font-semibold text-text-primary">
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
                  errors.email ? 'border-error' : 'border-border-default'
                } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all duration-200`}
                placeholder="you@example.com"
                autoComplete="email"
              />
              {errors.email && (
                <p className="text-error text-xs mt-1 animate-slide-down">
                  {errors.email}
                </p>
                <p className="text-error text-xs mt-1 animate-slide-down">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-1.5">
              <label
                htmlFor="password"
                className="block text-sm font-semibold text-text-primary"
              >
              <label htmlFor="password" className="block text-sm font-semibold text-text-primary">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={`w-full px-4 py-2.5 bg-dark-tertiary border ${
                  errors.password ? "border-error" : "border-border-default"
                  errors.password ? 'border-error' : 'border-border-default'
                } rounded-lg text-text-primary placeholder-text-tertiary focus:outline-none focus:ring-2 focus:ring-accent-purple focus:border-transparent transition-all duration-200`}
                placeholder="Enter your password"
                autoComplete="current-password"
              />
              {errors.password && (
                <p className="text-error text-xs mt-1 animate-slide-down">
                  {errors.password}
                </p>
                <p className="text-error text-xs mt-1 animate-slide-down">{errors.password}</p>
              )}
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 pt-1">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-border-default bg-dark-tertiary text-accent-purple focus:ring-2 focus:ring-accent-purple focus:ring-offset-0 cursor-pointer transition-all"
                />
                <span className="text-sm text-text-body group-hover:text-text-primary transition-colors">
                  Remember me
                </span>
              </label>
              <Link
                to="/forgot-password"
              <Link 
                to="/forgot-password" 
                className="text-sm text-accent-purple hover:text-accent-purple-light font-medium transition-colors"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 px-6 bg-linear-to-r from-accent-purple to-accent-purple-dark text-white font-semibold rounded-lg shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${
                isLoading ? "relative" : ""
              className={`w-full py-3 px-6 bg-gradient-to-r from-accent-purple to-accent-purple-dark text-white font-semibold rounded-lg shadow-lg shadow-accent-purple/30 hover:shadow-accent-purple/40 hover:-translate-y-0.5 transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0 ${
                isLoading ? 'relative' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <span className="opacity-0">Sign In</span>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  </div>
                </>
              ) : (
                "Sign In"
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-5 border-t border-border-default text-center">
            <p className="text-sm text-text-tertiary">
              Don't have an account?{" "}
              <Link
                to="/signup"
              Don't have an account?{' '}
              <Link 
                to="/signup" 
                className="text-accent-purple hover:text-accent-purple-light font-semibold transition-colors"
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
export default Login;
