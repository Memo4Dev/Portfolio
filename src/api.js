const API_BASE = '/api';

async function request(path, options = {}) {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { 'Content-Type': 'application/json', ...options.headers },
    ...options,
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || `Request failed: ${res.status}`);
  }
  return res.json();
}

export const api = {
  projects: {
    list: () => request('/projects'),
    count: () => request('/projects/count'),
    get: (id) => request(`/projects/${id}`),
    create: (data) => request('/projects', { method: 'POST', body: JSON.stringify(data) }),
    update: (id, data) => request(`/projects/${id}`, { method: 'PUT', body: JSON.stringify(data) }),
    remove: (id) => request(`/projects/${id}`, { method: 'DELETE' }),
    reorder: (orderedIds) => request('/projects/reorder', { method: 'POST', body: JSON.stringify({ orderedIds }) }),
  },
  certificates: {
    list: () => request('/certificates'),
    count: () => request('/certificates/count'),
    create: (data) => request('/certificates', { method: 'POST', body: JSON.stringify(data) }),
    remove: (id) => request(`/certificates/${id}`, { method: 'DELETE' }),
    reorder: (orderedIds) => request('/certificates/reorder', { method: 'POST', body: JSON.stringify({ orderedIds }) }),
  },
  upload: {
    image: async (file, folder = 'portfolio/images') => {
      const formData = new FormData();
      formData.append('image', file);
      formData.append('folder', folder);

      const res = await fetch(`${API_BASE}/upload`, {
        method: 'POST',
        body: formData,
      });
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Upload failed: ${res.status}`);
      }
      return res.json();
    },
    remove: (imageRef) => request('/upload', {
      method: 'DELETE',
      body: JSON.stringify({ imageRef }),
    }),
  },
};
