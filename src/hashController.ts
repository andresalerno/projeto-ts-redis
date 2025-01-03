import { Request, Response } from "express";
import Redis from "ioredis";

const HASH_PREFIX = "hash:";

const redis = new Redis({
  host: "redis", // Nome do serviço no Docker Compose
  port: 6379,    // Porta padrão do Redis
});

// Criar um novo hash
export const createHash = async (req: Request, res: Response) => {
  const { key, fields } = req.body;
  if (!key || !fields || typeof fields !== "object") {
    return res.status(400).json({ message: "Invalid input" });
  }
  await redis.hset(`${HASH_PREFIX}${key}`, fields);
  res.status(201).json({ message: "Hash created", key });
};

// Ler um hash pelo key
export const getHash = async (req: Request, res: Response) => {
  const { key } = req.params;
  const data = await redis.hgetall(`${HASH_PREFIX}${key}`);
  if (Object.keys(data).length === 0) {
    return res.status(404).json({ message: "Hash not found" });
  }
  res.json(data);
};

// Atualizar campos de um hash
export const updateHash = async (req: Request, res: Response) => {
  const { key } = req.params;
  const { fields } = req.body;

  if (!fields || typeof fields !== "object") {
    return res.status(400).json({ message: "Invalid input" });
  }

  const hashExists = await redis.exists(`${HASH_PREFIX}${key}`);
  if (!hashExists) {
    return res.status(404).json({ message: "Hash not found" });
  }

  await redis.hset(`${HASH_PREFIX}${key}`, fields);
  res.status(200).json({ message: "Hash updated", key });
};

// Deletar um hash
export const deleteHash = async (req: Request, res: Response) => {
  const { key } = req.params;
  const result = await redis.del(`${HASH_PREFIX}${key}`);
  if (result === 0) {
    return res.status(404).json({ message: "Hash not found" });
  }
  res.json({ message: "Hash deleted" });
};

export const listHashesByPrefix = async (req: Request, res: Response) => {
  const { prefix } = req.query;

  if (!prefix || typeof prefix !== "string") {
    return res.status(400).json({ message: "Invalid or missing prefix" });
  }

  try {
    const keys = await redis.keys(`${HASH_PREFIX}${prefix}*`);
    if (keys.length === 0) {
      return res.status(404).json({ message: "No hashes found with the given prefix" });
    }

    const hashes = await Promise.all(
      keys.map(async (key) => {
        const fields = await redis.hgetall(key);
        return { key: key.replace(HASH_PREFIX, ""), fields };
      })
    );

    res.json(hashes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred while fetching hashes" });
  }
};

export const getHashField = async (req: Request, res: Response) => {
  const { key, field } = req.params;

  try {
    // Verifica se o hash existe
    const hashExists = await redis.exists(`${HASH_PREFIX}${key}`);
    if (!hashExists) {
      return res.status(404).json({ message: "Hash not found" });
    }

    // Obtém o valor do campo específico
    const value = await redis.hget(`${HASH_PREFIX}${key}`, field);
    if (value === null) {
      return res.status(404).json({ message: `Field '${field}' not found in hash` });
    }

    res.json({ field, value });
  } catch (error) {
    console.error("Error fetching field from hash:", error);
    res.status(500).json({ message: "An error occurred while fetching the field" });
  }
};
