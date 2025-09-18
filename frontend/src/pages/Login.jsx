
import  { useState } from "react";

const Login = ({ onLogin }) => {
	const [form, setForm] = useState({
		email: "",
		phone: "",
		password: ""
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
		if ((!form.email && !form.phone) || !form.password) {
			setError("Email or phone and password are required.");
			return;
		}
		try {
			const res = await fetch("/api/citizen/login", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					email: form.email,
					phone: form.phone,
					password: form.password
				})
			});
			const data = await res.json();
			if (res.ok) {
				setSuccess("Login successful!");
				setForm({ email: "", phone: "", password: "" });
				if (onLogin) onLogin(data);
			} else {
				setError(data.message || "Login failed.");
			}
		} catch (err) {
			setError("Server error. Please try again later.");
			console.error(err);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-green-50 px-4">
			<div className="w-full max-w-md bg-white rounded-xl shadow-lg p-8">
				<h2 className="text-2xl font-bold text-center mb-6 text-gray-900">Citizen Login</h2>
				<form onSubmit={handleSubmit} className="space-y-5">
					<div>
						<label className="block text-gray-700 mb-1">Email</label>
						<input
							type="email"
							name="email"
							className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
							value={form.email}
							onChange={handleChange}
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
					{error && <div className="text-red-500 text-sm">{error}</div>}
					{success && <div className="text-green-600 text-sm">{success}</div>}
					<button
						type="submit"
						className="w-full bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition-all"
					>
						Login
					</button>
				</form>
			</div>
		</div>
	);
};

export default Login;
