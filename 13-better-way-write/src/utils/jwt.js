import jwt from "jsonwebtoken";

const signAccessToken = (id) => {
    const secretKey = process.env.ACCESSTOKEN_SECRET;
    const token = jwt.sign({ id }, secretKey, { expiresIn: process.env.ACCESSTOKEN_EXPIRES_IN });
    return token;
};

const signRefreshToken = (id) => {
    const secretKey = process.env.REFRESHTOKEN_SECRET;
    const token = jwt.sign({ id }, secretKey, { expiresIn: process.env.REFRESHTOKEN_EXPIRES_IN });
    return token;
};

const verifyToken = (token) => {
    const secretKey = process.env.ACCESSTOKEN_SECRET;
    const decoded = jwt.verify(token, secretKey);
    return decoded;
};

const getCookieOptions = () => {
    return {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "none",
    };
};

export {
    signAccessToken,
    signRefreshToken,
    verifyToken,
    getCookieOptions
}