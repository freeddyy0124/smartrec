import express from "express";
import { currentUser } from "../middlewares/current-user";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();
const JWT_KEY = 'secret_key'
router.get("/api/users/currentuser", currentUser, async (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");

  // check if the email is in the database if not send null
  if (req.currentUser) {
    try {
      const user = await User.findOne({ email: req.currentUser.email });

      if (!user) {
        res.send({ currentUser: {} });
      } else {
        if(req.currentUser.verified !== user.verified || req.currentUser.hst !== user.hst){
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
        }
      
        res.send({ currentUser: {...req.currentUser, verified: user.verified} });
      }
    } catch (err) {
      // Handle any errors that might occur during the database query
      res.status(500).send({ error: "Internal Server Error" });
    }
  } else {
    res.send({ currentUser: {} });
  }
});

export { router as currentUserRouter };
