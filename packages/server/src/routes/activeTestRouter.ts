import express from "express";
import activeTestsController from "../controllers/activeTestsController";

const router = express.Router();

router.post("/", activeTestsController.postStartTest);
router.put("/", activeTestsController.putTest);
router.put("/submit", activeTestsController.putSubmitTest);

export default router;
