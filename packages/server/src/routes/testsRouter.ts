import express from "express";
import testsController from "../controllers/testsController";

const router = express.Router();

router.put("/", testsController.putTest);
router.post("/", testsController.postTest);

export default router;
