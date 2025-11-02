import axios from "axios";
import React, { useState, useEffect } from "react";
import { ServelURL } from "../App";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

const Logo = ({ className = "" }) => (
  <div className={`flex items-center gap-3 ${className}`} aria-hidden>
    <svg
      width="40"
      height="40"
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="flex-none"
    >
      <rect width="100" height="100" rx="18" fill="url(#g)" />
      <path
        d="M28 72V28l22 30 22-30v44"
        stroke="#FFD166"
        strokeWidth="8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <defs>
        <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
          <stop offset="0" stopColor="#000000" />
          <stop offset="1" stopColor="#1a1a1a" />
        </linearGradient>
      </defs>
    </svg>
    <span className="font-semibold text-lg text-yellow-500">Novex</span>
  </div>
);

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  // Agar userData already hai (refresh ya login ke baad) → home me redirect
  useEffect(() => {
    if (userData) {
      navigate("/");
    }
  }, [userData, navigate]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);
    setError(null);

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post(
        ServelURL + "/api/auth/login",
        { email, password },
        { withCredentials: true }
      );

      if (res?.data) {
        // Redux me set karo
        dispatch(setUserData(res.data));

        // LocalStorage me bhi save karo taaki refresh ke baad bhi rahe
        localStorage.setItem("userData", JSON.stringify(res.data));

        setMessage(res.data.message || "Logged in successfully.");
      }

      // Clear inputs
      setEmail("");
      setPassword("");
    } catch (err) {
      setError(err?.response?.data?.error || err?.message || "Login failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-black to-gray-900 px-6 py-12">
      <div className="w-full max-w-md bg-black border border-yellow-500 rounded-2xl p-8 shadow-2xl">
        <header className="flex items-center justify-between mb-4">
          <Logo />
          <p className="text-sm text-yellow-500">
            Welcome back — good to see you
          </p>
        </header>

        <h1 className="text-2xl font-semibold text-yellow-500 mb-6">
          Sign in to Novex
        </h1>

        <form onSubmit={HandleSubmit} className="space-y-4" noValidate>
          <div>
            <label className="block text-sm text-yellow-500 mb-2">Email</label>
            <input
              type="email"
              className="w-full rounded-xl bg-black border border-yellow-500 px-4 py-3 text-yellow-500 placeholder-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm text-yellow-500 mb-2">
              Password
            </label>
            <input
              type="password"
              className="w-full rounded-xl bg-black border border-yellow-500 px-4 py-3 text-yellow-500 placeholder-yellow-500/40 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full inline-flex items-center justify-center gap-3 rounded-xl px-4 py-3 bg-yellow-500 text-black font-semibold shadow-md hover:bg-yellow-600 disabled:opacity-70 transition"
          >
            {loading ? (
              <svg
                className="w-5 h-5 animate-spin text-black"
                viewBox="0 0 24 24"
                fill="none"
                aria-hidden
              >
                <circle
                  className="opacity-20"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-100"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                ></path>
              </svg>
            ) : null}
            <span>{loading ? "Signing in..." : "Sign in"}</span>
          </button>

          {message && (
            <div className="rounded-lg p-3 text-sm bg-green-500/10 border border-green-500/20 text-green-500">
              {message}
            </div>
          )}
          {error && (
            <div className="rounded-lg p-3 text-sm bg-red-500/10 border border-red-500/20 text-red-500">
              {error}
            </div>
          )}
        </form>

        <footer className="mt-6 text-center text-sm text-yellow-500">
          <Link
            to={"/signup"}
            className="text-yellow-500 font-medium hover:text-yellow-300 underline"
          >
            Create an account
          </Link>{" "}
          ·{" "}
          <Link
            to="/forget-password"
            className="text-yellow-500 hover:text-yellow-300 underline"
          >
            Forgot password?
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Login;
