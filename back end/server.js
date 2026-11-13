import express from "express";
import cors from "cors";
import { PrismaClient } from "@prisma/client";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import "dotenv/config";

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ---- Prisma client (connects using DATABASE_URL from .env) ----
// Prisma 7 connects through a driver adapter instead of a built-in engine.
const adapter = new PrismaMariaDb(process.env.DATABASE_URL);
const prisma = new PrismaClient({ adapter });

// ---- Health check: proves the API + database are connected ----
app.get("/api/health", async (req, res) => {
  try {
    await prisma.$queryRaw`SELECT 1 AS ok`;
    res.json({ status: "ok", database: "connected" });
  } catch (err) {
    res.status(500).json({ status: "error", database: err.message });
  }
});

// ---- Receive a "Contact Me" message and store it ----
app.post("/api/contact", async (req, res) => {
  const { name, email, body } = req.body || {};

  // Validation (server side - never trust the browser)
  const errors = {};
  if (!name?.trim()) errors.name = "Name is required.";
  if (!email?.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Enter a valid email address.";
  }
  if (!body?.trim()) errors.body = "Message is required.";

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    await prisma.message.create({
      data: {
        name: name.trim(),
        email: email.trim(),
        body: body.trim(),
      },
    });
    res.status(201).json({ message: "Thanks! Your message has been sent." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Could not save your message." });
  }
});

// Close the database connection cleanly on Ctrl+C / restart
async function shutdown() {
  await prisma.$disconnect();
  process.exit(0);
}
process.on("SIGINT", shutdown);
process.on("SIGTERM", shutdown);

app.listen(PORT, () => {
  console.log(`Backend API running on http://localhost:${PORT}`);
});
