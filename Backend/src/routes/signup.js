import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { User } from "../models/user";

const Role = {
  buyer: 141206,
  seller: 141207,
  admin: 141208,
}

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("username")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("You must supply a valid username"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20 characters"),

  ],
  validateRequest,
  async (req, res) => {
    const { email, password, username} = req.body;

    let existingUser = await User.findOne({ email })

    if (existingUser) {
      res.status(400).send({ errors: [{ message: 'Email in use' }] });
    }

    existingUser = await User.findOne({ username })

    if (existingUser) {
        res.status(400).send({ errors: [{ message: 'Username in use' }] });
    }


    const user = User.build({ email, password, username, hst: Role.buyer, verified: false});
    await user.save();

    const JWT_KEY = 'secret_key'

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        username: user.username,
        hst: user.hst,
        verified: user.verified,
      },
        JWT_KEY
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(201).send(user);
  }
);

export { router as signupRouter };
