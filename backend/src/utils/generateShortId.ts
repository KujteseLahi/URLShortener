import { customAlphabet } from "nanoid";

const alphabet =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";

export const generateShortId: () => string = customAlphabet(alphabet, 6);
