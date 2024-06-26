import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  getMessage,
  sendMessage,
  getConversations,
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/conversations", protectRoute, getConversations);
router.get("/:otherUserId", protectRoute, getMessage);
router.post("/", protectRoute, sendMessage);

export default router;
