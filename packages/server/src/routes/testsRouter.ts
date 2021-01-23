import express from "express";
import testsController from "../controllers/testsController";

const router = express.Router();

router.put("/", testsController.putTest);

export default router;
