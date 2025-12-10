import express from "express";
import {connect} from "node:net";
// @ts-ignore
import {createUrl, deleteUrl, getAllUrl, getUrl} from "../controllers/shortUrl.ts";

const router = express.Router();




router.post("/shortUrl", createUrl);
router.get("/shortUrl", getAllUrl);
router.get("/shortUrl/:id", getUrl);
router.delete("/shortUrl/:id", deleteUrl);


export default router
