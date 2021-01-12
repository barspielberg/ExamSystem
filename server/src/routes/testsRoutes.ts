import express from "express";
import testsController from "../controllers/testsController";

const router = express.Router();

router.get("/", testsController.getTests);

export default router;
