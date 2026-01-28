import express from "express";
import {
  registerController,
  loginController,
  refreshController,
  logoutController,
} from "./auth.controller.js";

const router = express.Router();

/* ---------------- Auth Routes ---------------- */

router.post("/register", registerController);
router.post("/login", loginController);
router.post("/refresh", refreshController);
router.post("/logout", logoutController);

export default router;