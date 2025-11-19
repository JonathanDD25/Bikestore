import express from "express";
import { AuthController } from "../controllers/auth.controller.js";

const router = express.Router();
const authController = new AuthController();

// Ruta de login
router.post("/login", (req, res) => authController.login(req, res));

export default router;