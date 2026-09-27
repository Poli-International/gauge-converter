import 'dotenv/config';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3000;

  app.use(express.json());

  // API endpoint for feedback submissions
  app.post('/api/feedback', async (req, res) => {
    try {
      const { email, role, feedback, toolName, toolUrl, timestamp } = req.body;
      console.log(`[Feedback Received] From: ${email} | Role: ${role} | Tool: ${toolName}`);

      const accessKey = process.env.WEB3FORMS_ACCESS_KEY || 'ebd0e138-c7aa-4290-b028-74d1c3fa8faa';
      if (accessKey) {
        try {
          await fetch('https://api.web3forms.com/submit', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
            body: JSON.stringify({
              access_key: accessKey,
              subject: `Poli Tools Feedback: ${toolName || 'Gauge Converter'}`,
              from_name: email,
              email,
              message: `Feedback for ${toolName}\nRole: ${role}\nURL: ${toolUrl}\nTime: ${timestamp}\n\n${feedback}`,
            }),
          });
        } catch (fetchErr) {
          console.warn('Could not forward feedback upstream:', fetchErr);
        }
      }

      return res.json({ success: true, message: 'Feedback successfully received.' });
    } catch (err) {
      console.error('Feedback handling error:', err);
      return res.status(500).json({ success: false, error: 'Internal server error' });
    }
  });

  // Serve static files
  if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  } else {
    // In development, mount Vite middleware
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Body Piercing Gauge Converter server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
