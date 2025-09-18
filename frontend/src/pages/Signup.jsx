
import React, { useState } from "react";

const Signup = ({ onSignup }) => {
	const [form, setForm] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		confirm: ""
	});
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setError("");
		setSuccess("");
		if (!form.name || !form.email || !form.phone || !form.password || !form.confirm) {
			setError("Please fill all fields.");
			return;
		}
		if (form.password !== form.confirm) {
			setError("Passwords do not match.");
			return;
		}
				// Password strength validation (match backend)
				const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/;
				if (!strongPasswordRegex.test(form.password)) {
					setError("Password must be at least 8 characters and include uppercase, lowercase, number, and symbol.");
					return;
				}
				try {
					const res = await fetch("/api/citizen/register", {
						method: "POST",
						headers: { "Content-Type": "application/json" },
						body: JSON.stringify({
							name: form.name,
							email: form.email,
							phone: form.phone,
							password: form.password,
							role: "citizen"
						})
					});
					const data = await res.json();
					if (res.ok) {
						setSuccess("Signup successful! You can now log in.");
						setForm({ name: "", email: "", phone: "", password: "", confirm: "" });
						if (onSignup) onSignup();
					} else {
						setError(data.message || "Signup failed.");
					}
				} catch (err) {
					setError("Server error. Please try again later.");
					console.error(err);
				}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
			<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Citizen Sign Up</h2>
				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block text-gray-700 mb-1">Name</label>
						<input
							type="text"
							name="name"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							value={form.name}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 mb-1">Email</label>
						<input
							type="email"
							name="email"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							value={form.email}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 mb-1">Phone</label>
						<input
							type="tel"
							name="phone"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							value={form.phone}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 mb-1">Password</label>
						<input
							type="password"
							name="password"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							value={form.password}
							onChange={handleChange}
							required
						/>
					</div>
					<div>
						<label className="block text-gray-700 mb-1">Confirm Password</label>
						<input
							type="password"
							name="confirm"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							value={form.confirm}
							onChange={handleChange}
							required
						/>
					</div>
					{error && <div className="text-red-500 text-sm">{error}</div>}
					{success && <div className="text-green-600 text-sm">{success}</div>}
					<button
						type="submit"
						className="w-full bg-green-600 text-white py-2 rounded-lg font-semibold hover:bg-green-700 transition-all"
					>
						Sign Up
					</button>
				</form>
			</div>
		</div>
	);
};

export default Signup;
