import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const MotionContainer = ({ children, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.3 }}
    transition={{ duration: 0.8, ease: 'easeOut' }}
  >
    {children}
  </motion.div>
);

const API_URL = 'http://localhost:3000/api';

const logoUrl = "/logo192.png"; // Use your actual logo path if different

const Home = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch(`${API_URL}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    if (res.ok) setSuccess(true);
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="h-screen flex flex-col justify-center items-center text-center px-4 pt-32">
        <MotionContainer>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400">
            Where Talent Meets Opportunity
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg md:text-xl text-gray-300">
            Step into the future of recruitment. We connect the top 1% of talent with visionary companies that are shaping the world.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link
              to="/register"
              className="px-8 py-3 text-base font-bold rounded-md text-black bg-white hover:bg-gray-200 md:py-4 md:text-lg md:px-10 transform hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              Join Now
            </Link>
          </div>
        </MotionContainer>
      </section>

      {/* Features Section with Glassmorphism */}
      <MotionContainer className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-base text-blue-400 font-semibold tracking-wide uppercase">Why We're Different</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-white sm:text-4xl">
              An Ecosystem for Excellence
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
              <h3 className="text-lg text-white font-semibold">AI-Powered Matching</h3>
              <p className="mt-2 text-base text-gray-400">Intelligent algorithms that connect you to roles you were born to do.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
              <h3 className="text-lg text-white font-semibold">Elite & Exclusive</h3>
              <p className="mt-2 text-base text-gray-400">Access opportunities from world-class companies not available anywhere else.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
              <h3 className="text-lg text-white font-semibold">Absolute Privacy</h3>
              <p className="mt-2 text-base text-gray-400">Your search is 100% confidential. You control who sees your profile, always.</p>
            </div>
            <div className="p-8 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 shadow-lg">
              <h3 className="text-lg text-white font-semibold">Effortless Process</h3>
              <p className="mt-2 text-base text-gray-400">A seamless, intuitive interface designed to get you hired faster.</p>
            </div>
          </div>
        </div>
      </MotionContainer>

      {/* CTA Section */}
      <MotionContainer className="py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-br from-white to-gray-400 sm:text-5xl">
            Your Future Awaits
          </h2>
          <p className="mt-4 text-lg text-gray-300">
            Don't just find a job. Find your purpose. Create your profile in minutes and let your dream career find you.
          </p>
          <div className="mt-8">
            <Link
              to="/register"
              className="px-10 py-4 border border-transparent text-lg font-bold rounded-md text-black bg-white hover:bg-gray-200 transform hover:scale-105 transition-transform duration-300 shadow-2xl"
            >
              Sign Up for Free
            </Link>
          </div>
        </div>
      </MotionContainer>

      {/* Contact Section */}
      <section style={{ background: "#18181b", padding: "3rem 0" }}>
        <div style={{ maxWidth: 600, margin: "0 auto", background: "#23272f", borderRadius: 16, boxShadow: "0 2px 12px rgba(0,0,0,0.12)", padding: 36, border: "1.5px solid #444" }}>
          <h2 style={{ fontSize: "2rem", fontWeight: "bold", marginBottom: 18, color: "#fff" }}>Contact Us</h2>
          {success ? (
            <p style={{ color: "#22c55e", fontWeight: 500 }}>Thank you for contacting us!</p>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <input
                name="name"
                placeholder="Name"
                value={form.name}
                onChange={handleChange}
                required
                style={{ padding: 12, border: "1px solid #333", borderRadius: 6, background: "#18181b", color: "#fff" }}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={form.email}
                onChange={handleChange}
                required
                style={{ padding: 12, border: "1px solid #333", borderRadius: 6, background: "#18181b", color: "#fff" }}
              />
              <textarea
                name="message"
                placeholder="Message"
                value={form.message}
                onChange={handleChange}
                required
                style={{ padding: 12, border: "1px solid #333", borderRadius: 6, minHeight: 80, background: "#18181b", color: "#fff" }}
              />
              <button type="submit" style={{ background: "#2563eb", color: "#fff", padding: 14, borderRadius: 6, border: "none", fontWeight: 600, fontSize: 16, marginTop: 6 }}>
                Send
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Footer Section */}
      <footer style={{ background: "#111827", color: "#f3f4f6", padding: "3.5rem 0 1.5rem 0", marginTop: 40 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "flex-start", gap: 32, minHeight: 120 }}>
          {/* Left: Logo and Address */}
          <div style={{ flex: 1.2, minWidth: 280, display: "flex", alignItems: "flex-start", gap: 18 }}>
            <img src={logoUrl} alt="Hire1Percent Logo" style={{ width: 70, height: 70, objectFit: "contain", borderRadius: 10, background: "#fff", padding: 8, marginRight: 10 }} />
            <div>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 8, color: "#fff" }}>Hire1Percent</div>
              <div style={{ fontSize: 16, color: "#e5e7eb", lineHeight: 1.6 }}>
                Plot no - 47, H.no - 8-2-334/N/47,<br/>
                Road no 3, Banjara Hills,<br/>
                Hyderabad - 500034
              </div>
            </div>
          </div>
          {/* Right: Links */}
          <div style={{ flex: 1, minWidth: 220, textAlign: "right", display: "flex", flexDirection: "column", justifyContent: "flex-end", alignItems: "flex-end", height: "100%" }}>
            <div style={{ fontWeight: 600, fontSize: 17, marginBottom: 16, color: "#f3f4f6" }}>Quick Links</div>
            <a href="#about" style={{ color: "#f3f4f6", textDecoration: "none", marginBottom: 10, fontSize: 15 }}>About</a>
            <a href="#contact" style={{ color: "#f3f4f6", textDecoration: "none", marginBottom: 10, fontSize: 15 }}>Contact</a>
            <a href="#privacy" style={{ color: "#f3f4f6", textDecoration: "none", fontSize: 15 }}>Privacy Policy</a>
          </div>
        </div>
        <div style={{ borderTop: "1px solid #222", marginTop: 32, paddingTop: 18, textAlign: "center", color: "#9ca3af", fontSize: 14 }}>
          &copy; {new Date().getFullYear()} Hire1Percent. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;