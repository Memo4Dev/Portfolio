import React, { useState } from "react";
import AdminProjects from "../components/admin/AdminProjects";
import AdminCertificates from "../components/admin/AdminCertificates";

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState("projects");

  return (
    <div className="min-h-screen bg-[#030014] text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-8">
          Admin Dashboard
        </h1>

        <div className="flex space-x-4 mb-8">
          <button
            onClick={() => setActiveTab("projects")}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              activeTab === "projects"
                ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white"
                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Projects
          </button>
          <button
            onClick={() => setActiveTab("certificates")}
            className={`px-6 py-2 rounded-xl font-bold transition-all ${
              activeTab === "certificates"
                ? "bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white"
                : "bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:text-white"
            }`}
          >
            Certificates
          </button>
        </div>

        {activeTab === "projects" && <AdminProjects />}
        {activeTab === "certificates" && <AdminCertificates />}
      </div>
    </div>
  );
};

export default AdminPage;
