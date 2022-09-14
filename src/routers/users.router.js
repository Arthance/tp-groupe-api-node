import express from "express";
import bcrypt from "bcrypt";
import _ from "lodash";
import User from "../models/user.model";
import dotenv from "dotenv";

dotenv.config();

const usersRouter = express.Router();

usersRouter.post("/signup", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    return res
      .status(400)
      .send(`Un utilisateur avec l'adresse email "${req.body.email}" existe déjà.`);
  }
  const newUser = new User(req.body);
  newUser.password = await bcrypt.hash(req.body.password, 10);

  await newUser.save();

  return res.status(201).send(_.pick(newUser, ["name", "surname", "email"]));
});

usersRouter.post("/login", async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(404).send(`Adresse email ou mot de passe incorrect.`);
  }

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(404).send(`Adresse email ou mot de passe incorrect.`);
  }

  const token = user.generateAuthToken();

  return res.send({
    access_token: token,
  });
});

usersRouter.post("/update", async (req, res) => {

});

usersRouter.post("/delete", async (req, res) => {

});

usersRouter.post("/becomeTeacher", async (req, res) => {

});


export default usersRouter;