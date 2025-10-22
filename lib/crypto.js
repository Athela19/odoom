import crypto from "crypto";

const SECRET = process.env.MODE_SECRET || "default_secret_key";

export function createHmacHash(value) {
  return crypto.createHmac("sha256", SECRET).update(value).digest("hex");
}

export function verifyHmacHash(value, hash) {
  const valid = createHmacHash(value);
  return valid === hash;
}
