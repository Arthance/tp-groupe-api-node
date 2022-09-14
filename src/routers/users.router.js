import express from "express";
import bcrypt from "bcrypt";
import _ from "lodash";
import User from "../models/user.model.js";
import dotenv from "dotenv";
import auth from "../middleware/auth.js";


dotenv.config();

const usersRouter = express.Router();

// CREATION D'UN UTILISATEUR
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

  return res.status(201).send(_.pick(newUser, ["firstname", "lastname", "email"]));
});

// CONNEXION D'UN UTILISATEUR
usersRouter.post("/signin", async (req, res) => {
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

// MISE A JOUR DES INFORMATIONS
usersRouter.patch("/update", auth, async (req, res) => {
    const user = await User.findOne({ _id: req.user._id });

    for (let attribut in req.body) {
        user[attribut] = req.body[attribut];
      }
      await user.save();
      return res.send(user);
});

// SUPPRIMER SON PROPRE COMPTE
usersRouter.delete("/delete", auth, async (req, res) => {

    await User.deleteOne({ _id: req.user._id });
    return res.send("Utilisateur supprimé avec succès");

});

// DEVENIR DE TYPE ENSEIGNANT
usersRouter.patch("/updateType", auth, async (req, res) => {

    for (const role of req.user.type) {
        if(role === "teacher") {
            return res.send("L'utilisateur est déjà professeur");
        }
    }
    const user = await User.findOne({ _id: req.user._id });
    user.type.push("teacher");
    await user.save();
    return res.send("L'utilisateur est devenu enseignant.");
});


export default usersRouter;