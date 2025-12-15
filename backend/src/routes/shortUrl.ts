import express from "express";
import {createUrl, deleteUrl, getAllUrl, getUrl, incrementClick} from "../controllers/shortUrl.ts";

const router = express.Router();


router.post("/shortUrl", createUrl);
router.get("/shortUrl", getAllUrl);
router.get("/shortUrl/:id", getUrl);
router.post("/shortUrl/click/:id", incrementClick);
router.delete("/shortUrl/:id", deleteUrl);


export default router
