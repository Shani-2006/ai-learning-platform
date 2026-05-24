/**
 * @swagger
 * /api/prompts:
 *   post:
 *     summary: Submit prompt to AI
 *     tags: [Prompts]
 *
 * /api/prompts/history/{userId}:
 *   get:
 *     summary: Get user prompt history
 *     tags: [Prompts]
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *
 * /api/prompts/admin/all:
 *   get:
 *     summary: Get all prompts (admin)
 *     tags: [Admin]
 */

const express = require("express");
const router = express.Router();

const {
  createPrompt,
  getUserPromptHistory,
  getAllPrompts
} = require("../controllers/promptController");

router.post("/", createPrompt);
router.get("/history/:userId", getUserPromptHistory);
router.get("/admin/all", getAllPrompts);

module.exports = router;