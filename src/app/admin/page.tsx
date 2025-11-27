"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, Droplet, Trash2, RefreshCw } from "lucide-react";
import Navbar from "@/components/Navbar";
import { getLocalRequests, DonationRequest } from "@/lib/supabase";

export default function AdminPage() {
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [filter, setFilter] = useState<"all" | "donate" | "receive">("all");

  const loadRequests = () => {
    const data = getLocalRequests();
    setRequests(data);
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const clearAll = () => {
    if (confirm("Are you sure you want to delete all requests?")) {
      localStorage.removeItem("donation_requests");
      setRequests([]);
    }
  };

  const filteredRequests = requests.filter(
    (r) => filter === "all" || r.request_type === filter
  );

  const donateCount = requests.filter((r) => r.request_type === "donate").length;
  const receiveCount = requests.filter((r) => r.request_type === "receive").length;

  return (
    <main className="min-h-screen">
      <Navbar />

      <section className="pt-28 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Admin <span className="text-gradient">Dashboard</span>
            </h1>
            <p className="text-xl text-gray-600">
              View and manage all donation requests
            </p>
          </motion.div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <Users className="w-8 h-8 text-[#c41e3a] mx-auto mb-2" />
              <div className="text-3xl font-bold text-gradient">{requests.length}</div>
              <div className="text-gray-600">Total Requests</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <Droplet className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-green-600">{donateCount}</div>
              <div className="text-gray-600">Donors</div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="glass-card rounded-2xl p-6 text-center"
            >
              <Droplet className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-3xl font-bold text-orange-600">{receiveCount}</div>
              <div className="text-gray-600">Recipients</div>
            </motion.div>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap gap-4 mb-6">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value as "all" | "donate" | "receive")}
              className="px-4 py-2 rounded-xl border border-gray-200 bg-white"
            >
              <option value="all">All Requests</option>
              <option value="donate">Donors Only</option>
              <option value="receive">Recipients Only</option>
            </select>
            <button
              onClick={loadRequests}
              className="flex items-center gap-2 px-4 py-2 rounded-xl border border-gray-200 hover:bg-gray-50"
            >
              <RefreshCw className="w-4 h-4" /> Refresh
            </button>
            <button
              onClick={clearAll}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-red-100 text-red-700 hover:bg-red-200"
            >
              <Trash2 className="w-4 h-4" /> Clear All
            </button>
          </div>

          {/* Requests Table */}
          {filteredRequests.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl p-12 text-center text-gray-500"
            >
              No requests yet. Submit a donation or blood request to see it here.
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="glass-card rounded-2xl overflow-hidden"
            >
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Name</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Email</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Phone</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Blood Type</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredRequests.map((request, index) => (
                      <motion.tr
                        key={request.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="hover:bg-gray-50"
                      >
                        <td className="px-6 py-4">
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-medium ${
                              request.request_type === "donate"
                                ? "bg-green-100 text-green-700"
                                : "bg-orange-100 text-orange-700"
                            }`}
                          >
                            {request.request_type === "donate" ? "Donor" : "Recipient"}
                          </span>
                        </td>
                        <td className="px-6 py-4 font-medium text-gray-900">{request.name}</td>
                        <td className="px-6 py-4 text-gray-600">{request.email}</td>
                        <td className="px-6 py-4 text-gray-600">{request.phone}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-red-100 text-red-700">
                            {request.blood_type}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-gray-600">{request.preferred_date}</td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-700">
                            {request.status}
                          </span>
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </main>
  );
}

