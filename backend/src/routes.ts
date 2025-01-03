import express from "express";
import { createHash, getHash, deleteHash, updateHash, listHashesByPrefix, getHashField } from "./hashController";

const router = express.Router();

router.post("/hash", createHash);
router.get("/hash/:key", getHash);
router.patch("/hash/:key", updateHash);
router.delete("/hash/:key", deleteHash);

// Rota para listar hashes por prefixo
router.get("/hash", listHashesByPrefix);

router.get("/hash/:key/field/:field", getHashField);

export default router;
