import express from "express";
import Course from "../models/course.model.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import auth from "../middleware/auth.js";

dotenv.config();

const coursesRouter = express.Router();

//afficher tous les cours
coursesRouter.get("/", async (_, res) => {
	const courses = await Course.find();
	return res.send(courses);
});

//créer un cours
coursesRouter.post("/", auth, async (req, res) => {
	const course = new Course(req.body);
	course.author = req.user._id;
	await course.save();
	return res.send(course);
});

// /!\ Vérifier si l'authentifié est l'auteur du cours
coursesRouter.patch("/:id", auth, async (req, res) => {
	if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
		return res.sendStatus(404);
	}
	const course = await Course.findById(req.params.id);
	if (!course) {
		return res
			.status(404)
			.send(`Le cours avec l'id ${req.params.id} n'existe pas`);
	}

	for (let attribut in req.body) {
		course[attribut] = req.body[attribut];
	}

	await course.save();
	return res.send(course);
});

export default coursesRouter;
