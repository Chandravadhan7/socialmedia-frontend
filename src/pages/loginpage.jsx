import { useState } from "react";
import "./loginpage.css"; // Assuming you have a CSS file for styles
import { useNavigate } from "react-router-dom";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  Heart,
  MessageCircle,
  Share2,
} from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let inputobj = { email: email, password: password };

    try {
      const response = await fetch(
        "http://ec2-51-21-182-252.eu-north-1.compute.amazonaws.com:8080/user/api/login",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(inputobj),
        }
      );

      if (!response.ok) {
        throw new Error("Login failed. Check your credentials.");
      }

      const loginResponse = await response.json();
      localStorage.setItem('sessionId', loginResponse.sessionId);
      localStorage.setItem('userId', loginResponse.userId);
      console.log("Login successful:", loginResponse);

      navigate("/"); 
    } catch (error) {
      setError(error.message);
      console.error("Error during login:", error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="login-container">
        {/* Animated background elements */}
        <div className="background-overlay">
          <div className="bg-circle bg-circle-1"></div>
          <div className="bg-circle bg-circle-2"></div>
          <div className="bg-circle bg-circle-3"></div>
        </div>

        {/* Floating social icons */}
        <div className="floating-icon floating-icon-1">
          <Heart className="icon-heart" />
        </div>
        <div className="floating-icon floating-icon-2">
          <MessageCircle className="icon-message" />
        </div>
        <div className="floating-icon floating-icon-3">
          <Share2 className="icon-share" />
        </div>

        {/* Main login container */}
        <div className="login-wrapper">
          {/* Glassmorphism card */}
          <div className="login-card">
            {/* Header */}
            <div className="login-header">
              <div className="logo-container">
                <div className="logo-inner">
                  <div className="logo-dot"></div>
                </div>
              </div>
              <h1 className="login-title">Welcome Back</h1>
              <p className="login-subtitle">
                Connect with friends and share your world
              </p>
            </div>

            {/* Login form */}
            <div className="login-form">
              {error && (
                <div className={`error-message ${error ? "error-shake" : ""}`}>
                  {error}
                </div>
              )}

              {/* Email input */}
              <div className="input-group">
                <Mail className="input-icon" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email address"
                  required
                  className="form-input"
                />
              </div>

              {/* Password input */}
              <div className="input-group">
                <Lock className="input-icon" />
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  required
                  className="form-input form-input-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="password-toggle"
                >
                  {showPassword ? (
                    <EyeOff className="toggle-icon" />
                  ) : (
                    <Eye className="toggle-icon" />
                  )}
                </button>
              </div>

              {/* Remember me and forgot password */}
              <div className="form-options">
                <label className="remember-me">
                  <input type="checkbox" className="checkbox" />
                  Remember me
                </label>
                <a href="#" className="forgot-password">
                  Forgot password?
                </a>
              </div>

              {/* Login button */}
              <button
                onClick={handleLogin}
                disabled={isLoading}
                className={`login-button ${isLoading ? "login-button-loading" : ""}`}
              >
                {isLoading ? (
                  <div className="loading-content">
                    <div className="loading-spinner"></div>
                    Signing in...
                  </div>
                ) : (
                  "Sign In"
                )}
              </button>
            </div>

            {/* Divider */}
            <div className="divider">
              <div className="divider-line"></div>
              <span className="divider-text">or</span>
              <div className="divider-line"></div>
            </div>

            {/* Sign up link */}
            <p className="signup-link">
              Don't have an account?{" "}
              <a href="#" className="signup-link-anchor">
                Sign up
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
