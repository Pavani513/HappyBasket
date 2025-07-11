import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../toolkit/AuthSliceRoutes/Login";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { status, error } = useSelector((state) => state.login);

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(loginUser(formData)).unwrap();
            toast.success("✅ Login Successful!");
            navigate("/products");
        } catch (err) {
            console.error(err);
            toast.error("❌ Login failed. Please check your credentials.");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gradient-to-tr from-pink-200 via-white to-pink-200 px-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-8 md:p-10 rounded-3xl shadow-2xl w-full max-w-md transition transform hover:scale-[1.01]"
            >
                <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Welcome Back</h2>

                {status === "loading" && (
                    <p className="text-center text-gray-500 mb-2">Authenticating...</p>
                )}
                {status === "failed" && (
                    <p className="text-center text-red-500 mb-2">{error}</p>
                )}

                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email address"
                    className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-900 transition placeholder-gray-400"
                    required
                />

                <div className="relative mb-4">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Password"
                        className="w-full px-4 py-3 border border-gray-300 rounded-xl pr-12 focus:outline-none focus:border-blue-900 focus:ring focus:ring-blue-900 transition placeholder-gray-400"
                        required
                    />
                    <div
                        className="absolute inset-y-0 right-4 flex items-center cursor-pointer text-gray-400 hover:text-gray-600 transition"
                        onClick={() => setShowPassword(!showPassword)}
                    >
                        {showPassword ? <FaEyeSlash size={18} /> : <FaEye size={18} />}
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={status === "loading"}
                    className="w-full bg-blue-900 text-white py-3 rounded-xl hover:bg-blue-950 transition text-lg font-semibold shadow-md disabled:bg-blue-300"
                >
                    {status === "loading" ? "Logging in..." : "Login"}
                </button>

                <p className="mt-6 text-center text-sm text-gray-600">
    Don't have an account?{" "}
    <span
        onClick={() => navigate("/")}
        className="text-blue-900 cursor-pointer hover:underline font-medium"
    >
        Sign Up
    </span>
</p>

            </form>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                pauseOnFocusLoss={false}
                draggable
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default Login;
