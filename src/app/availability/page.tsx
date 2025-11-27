"use client";

import { motion } from "framer-motion";
import { Search, Filter, RefreshCw } from "lucide-react";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import BloodCard from "@/components/BloodCard";
import { getBloodInventory, BloodInventory } from "@/lib/supabase";

const fallbackData = [
  { blood_type: "A+", units: 45, status: "adequate" as const },
  { blood_type: "A-", units: 12, status: "low" as const },
  { blood_type: "B+", units: 67, status: "high" as const },
  { blood_type: "B-", units: 8, status: "critical" as const },
  { blood_type: "AB+", units: 34, status: "adequate" as const },
  { blood_type: "AB-", units: 5, status: "critical" as const },
  { blood_type: "O+", units: 78, status: "high" as const },
  { blood_type: "O-", units: 15, status: "low" as const },
];

export default function AvailabilityPage() {
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [bloodData, setBloodData] = useState<BloodInventory[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const data = await getBloodInventory();
      setBloodData(data);
    } catch (error) {
      console.error("Using fallback data:", error);
      setBloodData(fallbackData as BloodInventory[]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filteredData = bloodData.filter((blood) => {
    const matchesFilter = filter === "all" || blood.status === filter;
    const matchesSearch = blood.blood_type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

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
              Blood <span className="text-gradient">Availability</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real-time blood inventory across all blood types
            </p>
          </motion.div>

          {/* Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card rounded-2xl p-6 mb-8"
          >
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search blood type..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 outline-none transition-all"
                />
              </div>
              <div className="flex items-center gap-2">
                <Filter className="w-5 h-5 text-gray-500" />
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="px-4 py-3 rounded-xl border border-gray-200 focus:border-[#c41e3a] focus:ring-2 focus:ring-[#c41e3a]/20 outline-none transition-all bg-white"
                >
                  <option value="all">All Status</option>
                  <option value="critical">Critical</option>
                  <option value="low">Low</option>
                  <option value="adequate">Adequate</option>
                  <option value="high">High</option>
                </select>
              </div>
              <button
                onClick={fetchData}
                disabled={loading}
                className="flex items-center gap-2 px-4 py-3 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors"
              >
                <RefreshCw className={`w-5 h-5 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </button>
            </div>
          </motion.div>

          {/* Blood Cards Grid */}
          {loading ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="glass-card rounded-2xl p-6 animate-pulse">
                  <div className="h-14 w-14 bg-gray-200 rounded-full mb-4" />
                  <div className="h-8 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-4 bg-gray-200 rounded w-full" />
                </div>
              ))}
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredData.map((blood, index) => (
                <motion.div
                  key={blood.blood_type}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <BloodCard bloodType={blood.blood_type} units={blood.units} status={blood.status} />
                </motion.div>
              ))}
            </div>
          )}

          {!loading && filteredData.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12 text-gray-500"
            >
              No blood types found matching your criteria.
            </motion.div>
          )}

          {/* Legend */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-12 glass-card rounded-2xl p-6"
          >
            <h3 className="font-semibold text-gray-800 mb-4">Status Legend</h3>
            <div className="flex flex-wrap gap-6">
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-red-500" />
                <span className="text-gray-600">Critical (&lt;10 units)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-orange-500" />
                <span className="text-gray-600">Low (10-20 units)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-yellow-500" />
                <span className="text-gray-600">Adequate (20-50 units)</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-4 h-4 rounded-full bg-green-500" />
                <span className="text-gray-600">High (&gt;50 units)</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
