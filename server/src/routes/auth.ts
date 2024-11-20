import { Router } from "express";
import Auth from "../controller/Auth";

const router = Router();

// Register route
router.post("/register", Auth.register);

// Login route
router.post("/login", Auth.login);

export default router;