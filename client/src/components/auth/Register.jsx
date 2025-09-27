import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../styles/auth.css"; 
import AUTH_IMAGE from "../../assets/robot.png";

export default function Register({ setShowLogin }) {
  const navigate = useNavigate();
  const { register } = useUser();

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  // Input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // Client-side validation
  const validateForm = () => {
    const newErrors = {};

    if (!formData.username.trim()) {
      newErrors.username = "Username is required";
    } else if (formData.username.length < 3) {
      newErrors.username = "Username must be at least 3 characters";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^.\s@]+[^@\s]*@[^.\s@]+\.[^.\s@]+$/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please correct the errors in the form.");
      return;
    }

    setIsLoading(true);
    try {
      const result = await register({
        username: formData.username,
        email: formData.email,
        password: formData.password,
      });

      if (result.success) {
        toast.success("Registration successful 🎉");
        navigate("/profile");
      } else {
        if (result.errors) {
          const backendErrors = {};
          result.errors.forEach((err) => {
            if (err.field) backendErrors[err.field] = err.message;
          });
          setErrors((prev) => ({ ...prev, ...backendErrors }));
        }
        toast.error(result.message || "Registration failed ❌");
      }
    } catch (err) {
      console.error("Registration error:", err);
      toast.error("Network error. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="register-page">
      <div className="register-container">
        {/* Image Section */}
        <div className="register-image">
          <div
            className="register-image-bg"
            style={{ backgroundImage: `url(${AUTH_IMAGE})` }}
          />
          <div className="register-image-overlay">
            <div className="register-image-text">
              <h2>Join Our Community</h2>
              <p>Create an account and discover a world of possibilities.</p>
            </div>
          </div>
        </div>

        {/* Form Section */}
        <div className="register-form-section">
          <div className="register-form-header mobile-only">
            <h1>Create Account</h1>
            <p>Join us and start your journey</p>
          </div>

          <form onSubmit={handleSubmit} className="register-form">
            <div className="auth-form-group">
              <label>Username</label>
              <input
                type="text"
                name="username"
                placeholder="Choose a username"
                value={formData.username}
                onChange={handleChange}
                className={errors.username ? "input-error" : ""}
                disabled={isLoading}
                required
              />
              {errors.username && (
                <span className="error-message">{errors.username}</span>
              )}
            </div>

            <div className="auth-form-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? "input-error" : ""}
                disabled={isLoading}
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
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className={errors.password ? "input-error" : ""}
                disabled={isLoading}
                required
              />
              {errors.password && (
                <span className="error-message">{errors.password}</span>
              )}
              <p className="password-hint">Minimum 6 characters</p>
            </div>

            <div className="form-check">
              <input id="terms" name="terms" type="checkbox" required />
              <label htmlFor="terms">
                I agree to the{" "}
                <a href="#" className="link">
                  Terms
                </a>{" "}
                and{" "}
                <a href="#" className="link">
                  Privacy Policy
                </a>
              </label>
            </div>

            <button type="submit" disabled={isLoading} className="btn-submit">
              {isLoading ? "Creating account..." : "Create Account"}
            </button>
          </form>

          <div className="register-footer">
            <p>
              Already have an account?{" "}
              <Link to="/login" className="link-btn">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}