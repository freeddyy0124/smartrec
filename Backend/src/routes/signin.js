import express, { Request, Response } from "express";
import { body } from "express-validator";
import jwt from "jsonwebtoken";

import { Password } from "../services/password";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req, res) => {
    const { inputValue, password} = req.body;
    let existingUser = null;

    if (inputValue){
      existingUser = await User.findOne({
        $or: [
          { email: inputValue },
          { username: inputValue },
        ],
      });
    } 

    if (!existingUser) {
      res.status(400).send({ errors: [{ message: 'Invalid Credentials' }] });
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );
    if (!passwordsMatch) {
        res.status(400).send({ errors: [{ message: 'Invalid Credentials' }] });
    }

    const JWT_KEY = 'secret_key'

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        username: existingUser.username,
        hst: existingUser.hst,
        verified: existingUser.verified,
      },
        JWT_KEY
    );

    // Store it on session object
    req.session = {
      jwt: userJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
