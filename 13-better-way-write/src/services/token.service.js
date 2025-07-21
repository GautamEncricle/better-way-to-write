import jwt from "jsonwebtoken";
import { redis } from "../lib/redis.js";
import { v4 as uuidv4 } from "uuid";

const generateAuthTokens = async (user) => {
  if (!user || !user._id) {
    throw new Error("Invalid user object passed to generateAuthTokens.");
  }

  const accessToken = jwt.sign(
    { id: user._id, role: user.role },
    process.env.ACCESSTOKEN_SECRET,
    { expiresIn: process.env.ACCESSTOKEN_EXPIRES_IN }
  );

  const refreshToken = uuidv4();

  await redis.set(
    `refreshToken:${user._id}`,
    refreshToken,
    "EX",
    60 * 60 * 24 * 7
  );

  return {
    accessToken,
    refreshToken,
  };
};

export default generateAuthTokens;
