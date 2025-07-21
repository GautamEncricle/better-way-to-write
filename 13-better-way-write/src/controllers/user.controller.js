import authService from "../services/auth.service.js";
import AppError from "../utils/AppError.js";
import AppResponse from "../utils/AppResponse.js";
import catchAsync from "../utils/catchAsync.js";
import { getCookieOptions } from "../utils/jwt.js";
import generateAuthTokens from "../services/token.service.js";
import HTTP_STATUS from "../constants/HttpStatus.js";
import { redis } from "../lib/redis.js";

const sanitizeUser = (user) => {
    console.log("sanitizeUser - input user:", user);
    if (!user) return null;
    const userObj = typeof user.toObject === "function" ? user.toObject() : user;
    const { password, __v, ...safeUser } = userObj;

    if (!safeUser._id && userObj._id) {
        safeUser._id = userObj._id;
    }

    if (!safeUser._id) {
        console.error("sanitizeUser: _id is missing from user object", userObj);
    }
    console.log("sanitizeUser - output safeUser:", safeUser);

    return safeUser;
};


const signupUser = catchAsync(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        throw new AppError("Missing required fields", HTTP_STATUS.BAD_REQUEST);
    }

    const newUser = await authService.registerUser(username, email, password);
    const user = sanitizeUser(newUser);

    console.log(user);
    const { accessToken, refreshToken } = await generateAuthTokens(user);
    await redis.set(`refreshToken:${user._id}`, refreshToken, "EX", 60 * 60 * 24 * 7); // 7 days

    res.cookie("refreshToken", refreshToken, {
        ...getCookieOptions(),
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return new AppResponse(HTTP_STATUS.CREATED, "User registered successfully", user, accessToken);
});

const loginUser = catchAsync(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        throw new AppError("Missing required fields", HTTP_STATUS.BAD_REQUEST);
    }

    const loginResult = await authService.loginUser(email, password);
    const user = sanitizeUser(loginResult);

    console.log("loginUser - sanitized user:", user);

    if (!user || !user._id) {
        throw new AppError("Invalid user object", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    const { accessToken, refreshToken } = await generateAuthTokens(user);
    await redis.set(`refreshToken:${user._id}`, refreshToken, "EX", 60 * 60 * 24 * 7);

    res.cookie("refreshToken", refreshToken, {
        ...getCookieOptions(),
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    return new AppResponse(HTTP_STATUS.OK, "User logged in successfully", user, accessToken);
});

const getUser = catchAsync(async (req, res) => {
    const { id, email } = req.params;

    const isValid = authService.verifyRefresh(req.cookies.refreshToken);
    if (!isValid) {
        throw new AppError("Unauthorized access", HTTP_STATUS.UNAUTHORIZED);
    }

    const foundUser = await authService.getUser(id, email);
    if (!foundUser) {
        throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    const user = sanitizeUser(foundUser);
    return new AppResponse(HTTP_STATUS.OK, "User found successfully", user);
});

const getAllUser = catchAsync(async (req, res) => {
    const isValid = authService.verifyRefresh(req.cookies.refreshToken);
    if (!isValid) {
        throw new AppError("Unauthorized access", HTTP_STATUS.UNAUTHORIZED);
    }

    const users = await authService.getAllUser();
    const sanitizedUsers = users.map((user) => sanitizeUser(user));

    return new AppResponse(HTTP_STATUS.OK, "Users fetched successfully", sanitizedUsers);
});

const deleteUser = catchAsync(async (req, res) => {
    const isValid = authService.verifyRefresh(req.cookies.refreshToken);
    if (!isValid) {
        throw new AppError("Unauthorized access", HTTP_STATUS.UNAUTHORIZED);
    }

    const { id } = req.params;
    const deleted = await authService.deleteUser(id);

    if (!deleted) {
        throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }

    await redis.del(`refreshToken:${id}`);

    return new AppResponse(HTTP_STATUS.NO_CONTENT, "User deleted successfully");
});

// ---------------------- Logout User ----------------------
const logoutUser = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;
    if (refreshToken) {
        try {
            const decoded = authService.verifyRefresh(refreshToken);
            await redis.del(`refreshToken:${decoded.id}`);
        } catch (err) {
            // ignore invalid token
        }
    }

    res.clearCookie("refreshToken");
    return new AppResponse(HTTP_STATUS.OK, "User logged out successfully");
});

// ---------------------- Refresh Token Flow ----------------------
const refreshToken = catchAsync(async (req, res) => {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
        throw new AppError("Refresh token missing", HTTP_STATUS.UNAUTHORIZED);
    }

    const decoded = authService.verifyRefresh(refreshToken);
    const storedToken = await redis.get(`refreshToken:${decoded.id}`);

    if (!storedToken || storedToken !== refreshToken) {
        throw new AppError("Invalid or expired refresh token", HTTP_STATUS.UNAUTHORIZED);
    }

    const newAccessToken = authService.generateAccess(decoded.id);
    return res.status(HTTP_STATUS.OK).json({ accessToken: newAccessToken });
});

const refreshTokenHandler = catchAsync(async (req, res) => {
    const { userId, refreshToken } = req.body;

    if (!userId || !refreshToken) {
        throw new AppError("Missing required fields", HTTP_STATUS.BAD_REQUEST);
    }

    const storedToken = await redis.get(`refreshToken:${userId}`);
    if (!storedToken || storedToken !== refreshToken) {
        throw new AppError("Unauthorized access", HTTP_STATUS.UNAUTHORIZED);
    }

    await redis.del(`refreshToken:${userId}`);

    if (!userId) {
        throw new AppError("Invalid user object", HTTP_STATUS.INTERNAL_SERVER_ERROR);
    }

    const newTokens = await generateAuthTokens({ _id: userId });
    res.status(HTTP_STATUS.OK).json(newTokens);
});

export {
    signupUser,
    loginUser,
    getUser,
    getAllUser,
    deleteUser,
    refreshToken,
    refreshTokenHandler,
    logoutUser,
};
