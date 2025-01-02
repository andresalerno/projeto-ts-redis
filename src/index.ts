import express, { Request, Response } from "express";
import Redis from "ioredis";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
const redis = new Redis({ host: "redis" }); // Matches docker-compose service name

app.use(express.json());

const REDIS_KEY_PREFIX = "items";

// CREATE
app.post("/items", async (req: Request, res: Response) => {
  const id = Date.now().toString();
  const item = { id, ...req.body };
  await redis.set(`${REDIS_KEY_PREFIX}:${id}`, JSON.stringify(item));
  res.status(201).json({ message: "Item created", item });
});

// READ ALL
app.get("/items", async (req: Request, res: Response) => {
  const keys = await redis.keys(`${REDIS_KEY_PREFIX}:*`);
  const items = await Promise.all(keys.map(async (key) => {
    const item = await redis.get(key);
    return item ? JSON.parse(item) : null;
  }));
  res.json(items);
});

// READ BY ID
app.get("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const item = await redis.get(`${REDIS_KEY_PREFIX}:${id}`);
  if (item) {
    res.json(JSON.parse(item));
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// UPDATE
app.put("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const existingItem = await redis.get(`${REDIS_KEY_PREFIX}:${id}`);
  if (existingItem) {
    const updatedItem = { ...JSON.parse(existingItem), ...req.body };
    await redis.set(`${REDIS_KEY_PREFIX}:${id}`, JSON.stringify(updatedItem));
    res.json({ message: "Item updated", item: updatedItem });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// DELETE
app.delete("/items/:id", async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await redis.del(`${REDIS_KEY_PREFIX}:${id}`);
  if (result) {
    res.json({ message: "Item deleted" });
  } else {
    res.status(404).json({ message: "Item not found" });
  }
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
