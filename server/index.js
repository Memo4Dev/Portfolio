import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '.env') });

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from './middleware/logger.js';
import projectsRouter from './routes/projects.js';
import certificatesRouter from './routes/certificates.js';
import uploadRouter from './routes/upload.js';

const app = express();
const PORT = process.env.PORT || 3001;

const ALLOWED_ORIGINS = [
  'http://localhost:3000',
  'http://localhost:5173',
  process.env.ALLOWED_ORIGIN,
].filter(Boolean);

const globalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
  message: { error: 'Too many requests, please try again later' },
});

const uploadLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 20,
  message: { error: 'Upload limit reached, please try again later' },
});

const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5,
  message: { error: 'Too many messages, please try again later' },
});

app.use(helmet());
app.use(cors({
  origin: ALLOWED_ORIGINS.length > 0 ? ALLOWED_ORIGINS : false,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
}));
app.use(express.json({ limit: '1mb' }));
app.use(logger);
app.use('/api', globalLimiter);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok' });
});

app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Name, email, and message are required' });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    const formsubmitRes = await fetch('https://formsubmit.co/ajax/mesam7849@gmail.com', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, email, subject: subject || 'Portfolio Contact', message }),
    });

    if (!formsubmitRes.ok) {
      throw new Error('Form submission failed');
    }

    res.json({ message: 'Message sent successfully' });
  } catch (err) {
    console.error('[Contact] Error:', err.message);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

app.use('/api/projects', projectsRouter);
app.use('/api/certificates', certificatesRouter);
app.use('/api/upload', uploadLimiter, uploadRouter);

app.use((err, req, res, _next) => {
  console.error('[Server] Unhandled error:', err.message);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`[Server] Running on http://localhost:${PORT}`);
});
