import express from "express";
// @ts-ignore
import {urlModel} from "../models/shortUrl.ts";
import {customAlphabet} from "nanoid";

const alphabet = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet(alphabet, 6);

export const createUrl = async (req: express.Request, res: express.Response) => {
    try {
        const { fullUrl, expiration } = req.body;
        console.log("The fullUrl is", fullUrl, "Expiration:", expiration);

        if (!fullUrl) {
            return res.status(400).json({ message: "No URL provided" });
        }

        const shortUrl = `https://short.link/${nanoid(6)}`;

        const newUrl = await urlModel.create({
            fullUrl,
            shortUrl,
            expiration: expiration || null,
        });

        return res.status(201).json(newUrl);

    } catch (error) {
        console.error("ERROR in createUrl:", error);
        return res.status(500).json({ message: "Something went wrong!" });
    }
};

export const getAllUrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const shortUrls = await urlModel.find().sort({ createdAt: -1 });
        if (shortUrls.length < 0) {
            res.status(404).send({ message: "Short Urls not found!" });
        } else {
            res.status(200).send(shortUrls);
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
};

export const getUrl = async (req: express.Request, res: express.Response) => {
    try {
        const short = await urlModel.findOne({ shortUrl: req.params.id });
        if (!short) return res.status(404).send({ message: "Short URL not found" });
        if (short.expiration && new Date(short.expiration) < new Date()) {
            return res.status(403).send({ message: "This link has expired" });
        }
        short.clicks++;
        await short.save();
        res.redirect(short.fullUrl);
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: "Something went wrong!" });
    }
};
export const deleteUrl = async (
    req: express.Request,
    res: express.Response
) => {
    try {
        const shortUrl = await urlModel.findByIdAndDelete({ _id: req.params.id });
        if (shortUrl) {
            res.status(200).send({ message: "Requested URL succesfully deleted!" });
        }
    } catch (error) {
        res.status(500).send({ message: "Something went wrong!" });
    }
};
