import { customAlphabet } from "nanoid";

const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateShortId = customAlphabet(alphabet, 6);
