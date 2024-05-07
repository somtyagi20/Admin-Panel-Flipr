import { validationResult } from "express-validator";
import asyncHandler from "../Utils/asyncHandler.js";
import ApiError from "../Utils/apiError.js";

export const validate = asyncHandler(async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res
      .status(400)
      .json({ success: false, message: errors.array()[0].msg });
  }
  next();
});
