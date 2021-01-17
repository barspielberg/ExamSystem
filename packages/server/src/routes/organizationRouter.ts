import express from "express";
import organizationController from "../controllers/organizationController";

const router = express.Router();

router.get("/", organizationController.getAdmin);

export default router;