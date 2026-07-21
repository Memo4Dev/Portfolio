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

const AdminCertificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [form, setForm] = useState({ Img: "", ImgFile: null, ImgPreview: "" });
  const [fileKey, setFileKey] = useState(0);

  const fetchCertificates = useCallback(async () => {
    try {
      setLoading(true);
      const data = await api.certificates.list();
      setCertificates(data || []);
    } catch (err) {
      Toast.fire({ icon: "error", title: err.message });
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCertificates();
  }, [fetchCertificates]);

  const openModal = () => {
    setForm({ Img: "", ImgFile: null, ImgPreview: "" });
    setFileKey((k) => k + 1);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setForm({ Img: "", ImgFile: null, ImgPreview: "" });
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

    try {
      if (form.ImgFile) {
        setUploading(true);
        const result = await api.upload.image(form.ImgFile, 'portfolio/certificates');
        imgUrl = result.url;
      }

      if (!imgUrl) {
        Toast.fire({ icon: "error", title: "Image URL or file is required" });
        return;
      }

      await api.certificates.create({ Img: imgUrl });
      Toast.fire({ icon: "success", title: "Created" });
      closeModal();
      fetchCertificates();
    } catch (err) {
      Toast.fire({ icon: "error", title: err.message });
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This certificate will be deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#6366f1",
      cancelButtonColor: "#ef4444",
      background: "#030014",
      color: "#fff",
    });

    if (!result.isConfirmed) return;

    try {
      await api.certificates.remove(id);
      Toast.fire({ icon: "success", title: "Deleted" });
      fetchCertificates();
    } catch (err) {
      Toast.fire({ icon: "error", title: err.message });
    }
  };

  const handleMove = async (index, direction) => {
    const newIndex = index + direction;
    if (newIndex < 0 || newIndex >= certificates.length) return;

    const updated = [...certificates];
    [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
    setCertificates(updated);

    try {
      await api.certificates.reorder(updated.map((c) => c.id));
    } catch (err) {
      Toast.fire({ icon: "error", title: err.message });
      fetchCertificates();
    }
  };

  return (
    <div className="bg-white/5 backdrop-blur-xl rounded-2xl p-6 border border-white/10">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-white">Manage Certificates</h2>
        <button onClick={openModal} className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold transition-all hover:opacity-90 hover:-translate-y-0.5">
          + Add Certificate
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
                <th className="p-4 border-b border-white/10 bg-white/[0.02] text-gray-300">Created At</th>
                <th className="p-4 border-b border-white/10 bg-white/[0.02] text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {certificates.map((c, index) => (
                <tr key={c.id} className="border-b border-white/10">
                  <td className="p-4">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => handleMove(index, -1)} disabled={index === 0} className="text-gray-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                        &#9650;
                      </button>
                      <button onClick={() => handleMove(index, 1)} disabled={index === certificates.length - 1} className="text-gray-400 hover:text-white disabled:opacity-20 disabled:cursor-not-allowed transition-colors">
                        &#9660;
                      </button>
                    </div>
                  </td>
                  <td className="p-4">
                    <img src={c.img} alt="img" className="w-24 object-cover rounded border border-white/10" />
                  </td>
                  <td className="p-4 text-sm text-gray-400">
                    {new Date(c.created_at || Date.now()).toLocaleDateString()}
                  </td>
                  <td className="p-4">
                    <button onClick={() => handleDelete(c.id)} className="text-red-400 hover:text-red-300">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {modalOpen && (
        <div className="fixed inset-0 bg-black/80 flex items-start justify-center z-50 overflow-y-auto pt-[10vh] pb-[10vh]">
          <div className="bg-[#0a0a1a] backdrop-blur-xl rounded-2xl p-6 sm:p-8 w-full max-w-md border border-white/10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#6366f1] to-[#a855f7]">
                Add Certificate
              </h2>
              <button onClick={closeModal} className="w-8 h-8 flex items-center justify-center rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white transition-all text-sm">
                X
              </button>
            </div>

            <div>
              <label className="text-sm text-gray-300">Image</label>
              <div className="flex flex-col gap-2 mt-1">
                <input key={fileKey} type="file" accept="image/*" onChange={handleFileChange} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:border-[#6366f1] focus:outline-none transition-colors file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:bg-gradient-to-r file:from-[#6366f1] file:to-[#a855f7] file:text-white file:text-sm file:font-bold file:cursor-pointer" />
                {form.ImgPreview ? (
                  <div className="relative inline-block">
                    <img src={form.ImgPreview} alt="preview" className="w-32 object-cover rounded-lg border border-white/10" />
                    <button onClick={() => { setForm({ Img: "", ImgFile: null, ImgPreview: "" }); setFileKey((k) => k + 1); }} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 rounded-full text-white text-xs flex items-center justify-center hover:bg-red-600 transition-colors">
                      X
                    </button>
                  </div>
                ) : (
                  <input type="text" value={form.Img} onChange={(e) => setForm({ ...form, Img: e.target.value })} className="w-full bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 focus:border-[#6366f1] focus:outline-none transition-colors" placeholder="Or paste image URL" />
                )}
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <button onClick={closeModal} className="flex-1 px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-gray-300 font-bold transition-all hover:bg-white/10 hover:text-white">
                Cancel
              </button>
              <button onClick={handleSave} disabled={uploading} className="flex-1 px-4 py-3 rounded-lg bg-gradient-to-r from-[#6366f1] to-[#a855f7] text-white font-bold transition-all hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed">
                {uploading ? "Uploading..." : "Save Certificate"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminCertificates;
