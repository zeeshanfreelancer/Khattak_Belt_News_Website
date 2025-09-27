import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useUser } from "../UserContext";
import { FaGoogle } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import "../../styles/auth.css";
import AUTH_IMAGE from "../../assets/robot.png";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (!email || !password) {
      setErrors({
        email: !email ? "Email is required" : "",
        password: !password ? "Password is required" : "",
      });
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        toast.success("Login successful! 🎉");
        navigate("/profile");
      } else {
        toast.error(result.message || "Login failed ❌");
        if (result.errors) {
          setErrors(result.errors);
        }
      }
    } catch (error) {
      console.error("Login error:", error);
      toast.error("An unexpected error occurred ❌");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">
        {/* Image Section */}
        <div className="login-image">
          <div
            className="login-image-bg"
            style={{ backgroundImage: `url(${AUTH_IMAGE})` }}
          ></div>
          <div className="login-image-overlay">
            <div className="login-image-text">
              <h2>Welcome Back!</h2>
              <p>Enter your details and continue your journey with us.</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="login-form-section">
          <div className="login-form-header">
            <h1>Welcome Back</h1>
            <p>Sign in to continue your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            <div className="auth-form-group">
              <label>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                className={errors.email ? "input-error" : ""}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <span className="error-message">{errors.email}</span>
              )}
            </div>

            <div className="auth-form-group">
              <label>Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  if (errors.password)
                    setErrors((prev) => ({ ...prev, password: "" }));
                }}
                className={errors.password ? "input-error" : ""}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
            </div>

            <div className="form-options">
              <label>
                <input type="checkbox" /> Remember me
              </label>
              <a href="/forgot-password">Forgot password?</a>
            </div>

            <button type="submit" disabled={isLoading} className="btn-primary">
              {isLoading ? "Signing In..." : "Login"}
            </button>
          </form>

          <div className="login-register">
            <p>
              Don’t have an account?{" "}
              <Link to="/register" className="link-btn">
                Register now
              </Link>
            </p>
          </div>

          <div className="divider">
            <span>Or continue with</span>
          </div>

          <div className="social-buttons">
            <button className="social-btn">
              <FaGoogle />
            </button>
            <button className="social-btn">
              <FaGithub />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
