import express from "express";
import { json } from "body-parser";
const expressSession = require("cookie-session");

import { currentUserRouter } from "./routes/currentUser";
import { signinRouter } from "./routes/signin";
import { signoutRouter } from "./routes/signout";
import { signupRouter } from "./routes/signup";

const app = express();
app.set("trust proxy", true);
app.use(json());

app.use(
    expressSession({
        signed: false,
        secure: false,
    })
    );

app.use(currentUserRouter);
app.use(signinRouter);
app.use(signoutRouter);
app.use(signupRouter);

app.all("*", async (req, res) => {
    res.status(404).send({ message: "Not Found" });
}
);

export { app };