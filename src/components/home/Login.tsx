import { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import ScienceOutlinedIcon from "@mui/icons-material/ScienceOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

import { useAuth } from "../auth/useAuth";
import { loginApi } from "../../services/api";

import "./login.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();

  const locationState = location.state as { message?: string; email?: string } | null;
  const [email, setEmail] = useState(() => locationState?.email || "");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState<string | null>(
    () => locationState?.message || null
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    let isValid = true;

    setEmailError("");
    setPasswordError("");
    setGeneralError("");
    setSuccessMessage(null);

    if (!email.trim()) {
      setEmailError("Email address is required.");
      isValid = false;
    }

    if (!password.trim()) {
      setPasswordError("Password is required.");
      isValid = false;
    }

    if (!isValid) {
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await loginApi({
        email: email.trim(),
        password,
      });

      login(response.user, response.accessToken);
      navigate("/dashboard");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error
          ? err.message
          : "Authentication failed. Please check your credentials.";

      if (errorMessage.toLowerCase().includes("email")) {
        setEmailError(errorMessage);
      } else if (errorMessage.toLowerCase().includes("password")) {
        setPasswordError(errorMessage);
      } else {
        setGeneralError(errorMessage);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-layout">

        <section className="login-brand-panel">
          <div className="login-brand-content">

            <div className="login-brand-logo">
              <div className="login-brand-logo-icon">
                <ScienceOutlinedIcon />
              </div>

              <div>
                <h1>Laboratory Management</h1>
                <span>Management System</span>
              </div>
            </div>

            <div className="login-brand-main">

              <div className="login-brand-badge">
                <SecurityOutlinedIcon />
                <span>Secure Laboratory Platform</span>
              </div>

              <h2>
                Manage your laboratory
                <span>with confidence.</span>
              </h2>

              <p>
                Access patient records, samples, tests, reports,
                billing and laboratory operations from one secure
                management platform.
              </p>

              <div className="login-brand-features">

                <div className="login-brand-feature">
                  <div className="login-feature-icon">
                    <ScienceOutlinedIcon />
                  </div>

                  <div>
                    <strong>Complete Lab Management</strong>
                    <span>
                      Manage patients, samples, tests and results
                      from one platform.
                    </span>
                  </div>
                </div>

                <div className="login-brand-feature">
                  <div className="login-feature-icon">
                    <SecurityOutlinedIcon />
                  </div>

                  <div>
                    <strong>Role-Based Access</strong>
                    <span>
                      Access is controlled according to your
                      assigned laboratory role.
                    </span>
                  </div>
                </div>

              </div>
            </div>

            <div className="login-brand-footer">
              Secure laboratory management platform
            </div>

          </div>
        </section>

        {/* =========================================
            LOGIN FORM
        ========================================= */}

        <section className="login-form-section">

          <div className="login-form-wrapper">

            {/* Mobile Logo */}

            <div className="login-mobile-brand">

              <div className="login-mobile-brand-icon">
                <ScienceOutlinedIcon />
              </div>

              <div>
                <strong>Laboratory Management</strong>
                <span>Management System</span>
              </div>

            </div>

            {/* Heading */}

            <div className="login-heading">

              <span className="login-eyebrow">
                WELCOME BACK
              </span>

              <h2>Sign in to your account</h2>

              <p>
                Enter your credentials to access your laboratory
                management dashboard.
              </p>

            </div>

            {/* Form */}

            <form
              className="login-form"
              onSubmit={handleSubmit}
            >

              {/* Email */}

              <div className="login-field">

                <label htmlFor="email">
                  Email Address
                  <span>*</span>
                </label>

                <div
                  className={`login-input-wrapper ${
                    emailError ? "login-input-error" : ""
                  }`}
                >
                  <EmailOutlinedIcon />

                  <input
                    id="email"
                    type="email"
                    value={email}
                    placeholder="Enter your email address"
                    autoComplete="email"
                    onChange={(event) => {
                      setEmail(event.target.value);
                      setEmailError("");
                    }}
                  />
                </div>

                {emailError && (
                  <p className="login-field-error">
                    {emailError}
                  </p>
                )}

              </div>

              {/* Password */}

              <div className="login-field">

                <div className="login-password-label">

                  <label htmlFor="password">
                    Password
                    <span>*</span>
                  </label>

                  <Link to="/forgot-password">
                    Forgot password?
                  </Link>

                </div>

                <div
                  className={`login-input-wrapper ${
                    passwordError ? "login-input-error" : ""
                  }`}
                >
                  <LockOutlinedIcon />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setPasswordError("");
                    }}
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword((previous) => !previous)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </button>
                </div>

                {passwordError && (
                  <p className="login-field-error">
                    {passwordError}
                  </p>
                )}

              </div>

              {/* Remember */}

              <div className="login-options">

                <label className="login-remember">

                  <input type="checkbox" />

                  <span className="login-custom-checkbox">
                    ✓
                  </span>

                  <span>Remember me</span>

                </label>

              </div>

              {/* Submit */}

              {successMessage && (
                <div style={{ textAlign: "center", color: "#16a34a", fontSize: "12px", fontWeight: 500 }}>
                  {successMessage}
                </div>
              )}

              {generalError && (
                <p className="login-field-error" style={{ textAlign: "center", marginTop: 0 }}>
                  {generalError}
                </p>
              )}

              <button
                type="submit"
                className="login-submit"
                disabled={isSubmitting}
              >
                <span>{isSubmitting ? "Signing In..." : "Sign In"}</span>
                <ArrowForwardIcon className="login-submit-arrow" />
              </button>

            </form>

            {/* Signup */}

            <div className="signup-redirect">

              <span>Don't have an account?</span>

              <Link to="/signup">
                Create laboratory account
              </Link>

            </div>

            <div className="login-mobile-footer">
              <span>
                Secure laboratory management platform
              </span>
            </div>

          </div>

        </section>

      </div>
    </div>
  );
};

export default Login;