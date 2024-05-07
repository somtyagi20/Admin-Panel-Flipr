import { Router } from "express";
import { upload } from "../Middlewares/multer.js";
import { verifyJWT } from "../Middlewares/auth.js";
import { validate } from "../Middlewares/validation.js";
import { body } from "express-validator";

const router = Router();

//Auth routes
import {
  register,
  login,
  uploadProfilePic,
  logOutUser,
  refreshAccessToken,
} from "../Controllers/authController.js";

router
  .route("/register")
  .post(
    body("email").trim().notEmpty().withMessage("Email is required"),
    body("email").isEmail().withMessage("Invalid email format"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
    body("name").trim().notEmpty().withMessage("Name is required"),
    validate,
    register
  );
router.route("/login").post(login);
router
  .route("/uploadProfilePic")
  .post(verifyJWT, upload.single("profile_pic"), uploadProfilePic);
router.route("/logout").post(verifyJWT, logOutUser);
router.route("/refreshAccessToken").post(refreshAccessToken);

//Customer routes
import {
  createCustomer,
  getCustomers,
  getCustomer,
  updateCustomer,
  deleteCustomer,
} from "../Controllers/customerController.js";

router.route("/createCustomer").post(verifyJWT, createCustomer);
router.route("/getCustomers").get(verifyJWT, getCustomers);
router.route("/getCustomer").get(verifyJWT, getCustomer);
router.route("/updateCustomer").post(verifyJWT, updateCustomer);
router.route("/deleteCustomer").delete(verifyJWT, deleteCustomer);

export default router;
