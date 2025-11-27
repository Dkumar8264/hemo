"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Phone, Mail, Droplet, MapPin, Calendar, CheckCircle, Loader2 } from "lucide-react";
import { createDonationRequest } from "@/lib/supabase";

interface FormData {
  name: string;
  email: string;
  phone: string;
  bloodType: string;
  address: string;
  date: string;
}

interface DonationFormProps {
  type: "donate" | "receive";
}

export default function DonationForm({ type }: DonationFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    bloodType: "",
    address: "",
    date: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const bloodTypes = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createDonationRequest({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        blood_type: formData.bloodType,
        address: formData.address,
        preferred_date: formData.date,
        request_type: type,
      });
      setSubmitted(true);
    } catch (err) {
      console.error(err);
      setError("Failed to submit. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass-card rounded-3xl p-8 text-center max-w-md mx-auto"
      >
        <div className="w-20 h-20 blood-gradient rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-800 mb-2">
          {type === "donate" ? "Thank You for Donating!" : "Request Submitted!"}
        </h3>
        <p className="text-gray-600 mb-6">
          {type === "donate"
            ? "Your donation appointment has been scheduled. We'll contact you shortly."
            : "Your blood request has been received. Our team will reach out soon."}
        </p>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({ name: "", email: "", phone: "", bloodType: "", address: "", date: "" });
          }}
          className="blood-gradient text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity"
        >
          Submit Another
        </button>
      </motion.div>
    );
  }

  return (
    <motion.form
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      onSubmit={handleSubmit}
      className="glass-card rounded-3xl p-8 max-w-2xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-gradient mb-8 text-center">
        {type === "donate" ? "Become a Donor" : "Request Blood"}
      </h2>

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-700 rounded-xl text-center">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <User className="w-4 h-4" /> Full Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 outline-none transition-all"
            placeholder="John Doe"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Mail className="w-4 h-4" /> Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 outline-none transition-all"
            placeholder="john@example.com"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Phone className="w-4 h-4" /> Phone Number
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 outline-none transition-all"
            placeholder="+1 234 567 890"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Droplet className="w-4 h-4" /> Blood Type
          </label>
          <select
            name="bloodType"
            value={formData.bloodType}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 outline-none transition-all bg-white"
          >
            <option value="">Select Blood Type</option>
            {bloodTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <MapPin className="w-4 h-4" /> Address
          </label>
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 outline-none transition-all"
            placeholder="123 Main St, City"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Calendar className="w-4 h-4" /> Preferred Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 outline-none transition-all"
          />
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        type="submit"
        disabled={loading}
        className="w-full mt-8 blood-gradient text-white py-4 rounded-xl font-semibold text-lg hover:opacity-90 transition-opacity disabled:opacity-70 flex items-center justify-center gap-2"
      >
        {loading ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Submitting...
          </>
        ) : (
          type === "donate" ? "Schedule Donation" : "Submit Request"
        )}
      </motion.button>
    </motion.form>
  );
}
