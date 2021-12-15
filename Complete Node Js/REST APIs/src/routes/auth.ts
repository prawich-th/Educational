import express from "express";
import { body } from "express-validator";
import User from "../models/user";
import * as authController from "../controllers/auth";

const router = express.Router();

router.put(
  "/signup",
  [
    body("email")
      .normalizeEmail()
      .isEmail()
      .withMessage("Please enter a valid email")
      .custom((value, { req }) => {
        return User.findOne({ email: value }).then((userDoc) => {
          if (userDoc) {
            return Promise.reject("Email address already existed");
          }
        });
      }),
    body("password").trim().isLength({ min: 5 }),
    body("name").trim().not().isEmpty(),
  ],
  authController.signup
);

router.post("/login", authController.login);

export default router;