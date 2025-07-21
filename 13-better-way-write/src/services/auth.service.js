import User from "../models/user.model.js";
import AppError from "../utils/AppError.js";
import catchAsync from "../utils/catchAsync.js";
import {
  signAccessToken,
  signRefreshToken,
  verifyToken,
} from "../utils/jwt.js";
import HTTP_STATUS from "../constants/HttpStatus.js";

const registerUser = async (username, email, password) => {
  const userExists = await User.findOne({ username });
  if (userExists) {
    throw new AppError("User already exists", HTTP_STATUS.BAD_REQUEST);
  }
  const user = await User.create({ username, email, password });
  return user;
};

const loginUser = async (email, password) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new AppError("User not found", HTTP_STATUS.BAD_REQUEST);
  }
  const isPasswordCorrect = await user.isPasswordCorrect(password);
  if (!isPasswordCorrect) {
    throw new AppError("Incorrect password", HTTP_STATUS.BAD_REQUEST);
  }
  return user;
};

const getUser = async (id = "", email = "") => {
  if (id != "") {
    const user = await User.findById(id);
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }
  if (email != "") {
    const user = await User.findOne({ email });
    if (!user) {
      throw new AppError("User not found", HTTP_STATUS.NOT_FOUND);
    }
    return user;
  }
};

const getAllUser = async () => {
  const users = await User.find();
  return users;
};

const deleteUser = async (id) => {
  const user = await User.findByIdAndDelete(id);
  if (!user) {
    throw new AppError("User not found", HTTP_STATUS.BAD_REQUEST);
  }
  return true;
};

const generateAuthTokens = (id) => {
  const accessToken = signAccessToken(id);
  const refreshToken = signRefreshToken(id);
  return {
    accessToken,
    refreshToken,
  };
};

const verifyRefresh = (token) => {
  const decoded = verifyToken(token);
  return decoded;
};

const generateAccess = (id) => {
  return signAccessToken(id);
};

const authService = {
  registerUser,
  loginUser,
  getUser,
  getAllUser,
  deleteUser,
  generateAuthTokens,
  verifyRefresh,
};

export default authService;
