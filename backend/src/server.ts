// backend/src/server.ts
import { spawn } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import multer from "multer";

const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadsDir = path.join(__dirname, "..", "uploads");
fs.mkdirSync(uploadsDir, { recursive: true });

const upload = multer({
  dest: uploadsDir,
  limits: {
    fileSize: 20 * 1024 * 1024,
  },
});

app.get("/api", (_req, res) => {
  res.json({ message: "Hello from Express!" });
});

app.post(
  "/api/pronunciation",
  upload.fields([
    { name: "reference", maxCount: 1 },
    { name: "attempt", maxCount: 1 },
  ]),
  (req, res) => {
    console.log("Starting request");
    const files = req.files as
      | {
          [fieldname: string]: Express.Multer.File[];
        }
      | undefined;
    const reference = files?.reference?.[0];
    const attempt = files?.attempt?.[0];

    if (!reference || !attempt) {
      res.status(400).json({
        error: "Both reference and attempt files are required.",
      });
      return;
    }

    const pythonPath = process.env.PYTHON_PATH ?? "python";
    const scriptPath = path.join(__dirname, "ai.py");
    const args = [scriptPath, reference.path, attempt.path];

    const proc = spawn(pythonPath, args, {
      stdio: ["ignore", "pipe", "pipe"],
    });

    let stdout = "";
    let stderr = "";

    const cleanup = async () => {
      await Promise.allSettled([
        fs.promises.unlink(reference.path),
        fs.promises.unlink(attempt.path),
      ]);
    };

    proc.stdout.on("data", (chunk) => {
      stdout += chunk.toString();
    });

    proc.stderr.on("data", (chunk) => {
      stderr += chunk.toString();
    });

    proc.on("error", async (err) => {
      await cleanup();
      res.status(500).json({
        error: "Failed to start AI process.",
        details: err.message,
      });
    });

    proc.on("close", async (code) => {
      await cleanup();

      if (code !== 0) {
        res.status(500).json({
          error: "Scoring failed.",
          details: stderr.trim() || stdout.trim(),
        });
        return;
      }

      const output = stdout.trim();
      try {
        const parsed = JSON.parse(output);
        res.json(parsed);
      } catch {
        res.status(500).json({
          error: "Invalid AI output.",
          details: output || stderr.trim(),
        });
      }
    });
  }
);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
