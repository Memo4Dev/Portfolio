import { v2 as cloudinary } from 'cloudinary';

let _configured = false;

function ensureConfig() {
  if (_configured) return;
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  _configured = true;
}

/**
 * Upload a file buffer to Cloudinary.
 * @param {Buffer} fileBuffer - The file data
 * @param {string} folder - Cloudinary folder (e.g. "portfolio/projects")
 * @param {string} originalName - Original filename for public_id generation
 * @returns {Promise<{ url: string, public_id: string }>}
 */
export async function uploadToCloudinary(fileBuffer, folder, originalName) {
  ensureConfig();
  const timestamp = Date.now();
  const safeName = originalName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const publicId = `${folder.replace(/\//g, '_')}_${timestamp}_${safeName}`;

  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: publicId,
        resource_type: 'image',
        format: 'webp',
        transformation: [
          { quality: 'auto', fetch_format: 'auto' },
        ],
      },
      (error, result) => {
        if (error) return reject(error);
        resolve({ url: result.secure_url, public_id: result.public_id });
      },
    );
    stream.end(fileBuffer);
  });
}

/**
 * Delete an image from Cloudinary by public_id or URL.
 * @param {string} imageRef - public_id or full Cloudinary URL
 */
export async function deleteFromCloudinary(imageRef) {
  ensureConfig();
  let publicId = imageRef;

  // If it's a full URL, extract the public_id
  if (imageRef.startsWith('http')) {
    const parts = imageRef.split('/');
    const uploadIdx = parts.indexOf('upload');
    if (uploadIdx !== -1) {
      publicId = parts.slice(uploadIdx + 1).join('/');
      // Remove file extension
      publicId = publicId.replace(/\.[^.]+$/, '');
    }
  }

  return cloudinary.uploader.destroy(publicId);
}
