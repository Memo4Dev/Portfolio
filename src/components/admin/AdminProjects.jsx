import React, { useEffect, useState, useCallback } from "react";
import { api } from "../../api";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  background: "#1e1b4b",
  color: "#fff",
});

const EMPTY_FORM = {
  Title: "",
  Img: "",
  ImgFile: null,
  ImgPreview: "",
  Link: "",
  Github: "",
  Description: "",
  TechStack: "",
  Features: "",
  Username: "",
  Password: "",
};

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [fileKey, setFileKey] = useState(0);

  const fetchProjects = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.projects.list();
      setProjects(data || []);
    } catch (err) {
      Toast.fire({ icon: "error", title: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const openModal = (project = null) => {
    if (project) {
      setEditingProject(project);
      setForm({
        Title: project.Title || "",
        Img: project.Img || "",
        ImgFile: null,
        ImgPreview: project.Img || "",
        Link: project.Link || "",
        Github: project.Github || "",
        Description: project.Description || "",
        TechStack: (project.TechStack || []).join(", "),
        Features: (project.Features || []).join(", "),
        Username: project.Username || "",
        Password: project.Password || "",
      });
    } else {
      setEditingProject(null);
      setForm(EMPTY_FORM);
    }
    setFileKey((k) => k + 1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setEditingProject(null);
    setForm(EMPTY_FORM);
    setFileKey((k) => k + 1);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setForm((prev) => ({ ...prev, ImgFile: file, ImgPreview: preview }));
    }
  };

  const handleSave = async () => {
    let imgUrl = form.Img;

    const safeUrl = (url) => {
      if (!url) return '';
      try {
        const parsed = new URL(url);
        if (['https:', 'http:'].includes(parsed.protocol)) return url;
        return '';
      } catch {
        return '';
      }
    };

    try {
      if (form.ImgFile) {
        setUploading(true);
        const result = await api.upload.image(form.ImgFile, 'portfolio/projects');
        imgUrl = result.url;
      }

      const payload = {
        Title: form.Title,
        Img: imgUrl,
        Link: safeUrl(form.Link),
        Github: safeUrl(form.Github),
        Description: form.Description,
        TechStack: form.TechStack.split(",").map((s) => s.trim()).filter(Boolean),
        Features: form.Features.split(",").map((s) => s.trim()).filter(Boolean),
        Username: form.Username,
        Password: form.Password,
      };

      if (editingProject) {
        await api.projects.update(editingProject.id, payload);
        Toast.fire({ icon: "success", title: "Updated" });
      } else {
        await api.projects.create(payload);
        Toast.fire({ icon: "success", title: "Created" });
      }
      closeModal();
      fetchProjects();
    } catch (err) {
      Toast.fire({ icon: "error", title: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This project will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#ef4444",
      background: "#030014",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await api.projects.remove(id);
      Toast.fire({ icon: "success", title: "Deleted" });
      fetchProjects();
    } catch (err) {
      Toast.fire({ icon: "error", title: err.message });
    }
  };

  const handleMove = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= projects.length) return;

    const updated = [...projects];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setProjects(updated);

    try {
      await api.projects.reorder(updated.map((p) => p.id));
    } catch (err) {
      Toast.fire({ icon: "error", title: err.message });
      fetchProjects();
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Manage Projects</h2>
        <button onClick={() => openModal()} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold transition-all hover:opacity-90 hover:-translate-y-0.5">
          + Add Project
        </button>
      </div>

      {loading ? (
        <div className="text-center py-8 text-gray-400">Loading...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-4 border-b border-white/10 bg-white/[0.02] text-gray-300 w-12">#</th>
                <th className="p-4 border-b border-white/10 bg-white/[0.02] text-gray-300">Image</th>
                <th className="p-4 border-b border-white/10 bg-white/[0.02] text-gray-300">Title</th>
                <th className="p-4 border-b border-white/10 bg-white/[0.02] text-gray-300">Tech Stack</th>
                <th className="p-4 border-b border-white/10 bg-white/[0.02] text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {projects.map((p, index) => (
                <tr key={p.id} className="border-b border-white/10">
                  <td className="p-4">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => handleMove(index, -1)} disabled={index === 0} className="text-gray-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                        &#9650;
                      </button>
                      <button onClick={() => handleMove(index, 1)} disabled={index === projects.length - 1} className="text-gray-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                        &#9660;
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <img src={p.Img} alt="img" className="w-16 h-12 object-cover rounded" />
                  </td>
                  <td className="p-4 font-bold text-white">{p.Title}</td>
                  <td className="p-4 text-sm text-gray-400">{(p.TechStack || []).join(", ")}</td>
                  <td className="p-4">
                    <button onClick={() => openModal(p)} className="text-blue-400 hover:text-blue-300 mr-3">Edit</button>
                    <button onClick={() => handleDelete(p.id)} className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="bg-[#0a0a1a] backdrop-blur-xl rounded-2xl p-6 sm:p-8 w-full max-w-2xl border border-white/10 max-h-[60vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                {editingProject ? "Edit Project" : "Add Project"}
              </h2>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-sm">
                X
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-300">Title</label>
                <input type="text" value={form.Title} onChange={(e) => setForm({ ...form, Title: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 mt-1 focus:border-[#6366f1] focus:outline-none transition-colors" placeholder="Project Name" />
              </div>
              <div>
                <label className="text-sm text-gray-300">Live Link</label>
                <input type="text" value={form.Link} onChange={(e) => setForm({ ...form, Link: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 mt-1 focus:border-[#6366f1] focus:outline-none transition-colors" placeholder="https://..." />
              </div>
              <div>
                <label className="text-sm text-gray-300">Github Link</label>
                <input type="text" value={form.Github} onChange={(e) => setForm({ ...form, Github: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 mt-1 focus:border-[#6366f1] focus:outline-none transition-colors" placeholder="https://github.com/..." />
              </div>
              <div>
                <label className="text-sm text-gray-300">Image</label>
                <div className="flex flex-col gap-2 mt-1">
                  <input key={fileKey} type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2 focus:border-[#6366f1] focus:outline-none transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-[#6366f1] file:to-[#a855f7] file:text-white file:text-sm file:font-bold file:cursor-pointer" />
                  {form.ImgPreview ? (
                    <div className="relative inline-block">
                      <img src={form.ImgPreview} alt="preview" className="w-20 h-14 object-cover rounded-lg border border-white/10" />
                      <button onClick={() => { setForm((prev) => ({ ...prev, ImgFile: null, ImgPreview: "", Img: "" })); setFileKey((k) => k + 1); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors">
                        X
                      </button>
                    </div>
                  ) : (
                    <input type="text" value={form.Img} onChange={(e) => setForm({ ...form, Img: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:border-[#6366f1] focus:outline-none transition-colors" placeholder="Or paste image URL" />
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-300">Description</label>
              <textarea rows="3" value={form.Description} onChange={(e) => setForm({ ...form, Description: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 mt-1 focus:border-[#6366f1] focus:outline-none transition-colors resize-none" placeholder="Brief description..." />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-300">Tech Stack (comma separated)</label>
              <input type="text" value={form.TechStack} onChange={(e) => setForm({ ...form, TechStack: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 mt-1 focus:border-[#6366f1] focus:outline-none transition-colors" placeholder="React, Tailwind, Node.js" />
            </div>

            <div className="mt-4">
              <label className="text-sm text-gray-300">Features (comma separated)</label>
              <input type="text" value={form.Features} onChange={(e) => setForm({ ...form, Features: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 mt-1 focus:border-[#6366f1] focus:outline-none transition-colors" placeholder="User Auth, Dark Mode, Responsive" />
            </div>

            <div className="mt-4 p-4 bg-white/[0.02] rounded-xl border border-white/10">
              <p className="text-xs text-gray-500 mb-3">Optional — fill only if this project requires login credentials</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Login Username</label>
                  <input type="text" value={form.Username} onChange={(e) => setForm({ ...form, Username: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 mt-1 focus:border-[#6366f1] focus:outline-none transition-colors" placeholder="e.g. admin" />
                </div>
                <div>
                  <label className="text-sm text-gray-300">Login Password</label>
                  <input type="text" value={form.Password} onChange={(e) => setForm({ ...form, Password: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 mt-1 focus:border-[#6366f1] focus:outline-none transition-colors" placeholder="e.g. password123" />
                </div>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-bold transition-all hover:bg-white/10 hover:text-white">
                Cancel
              </button>
              <button onClick={handleSave} disabled={uploading || !form.Title} className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
                {uploading ? "Uploading..." : editingProject ? "Update Project" : "Save Project"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
