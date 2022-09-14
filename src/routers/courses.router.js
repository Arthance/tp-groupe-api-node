import express from "express";
import Course from "../models/course.model.js";
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const coursesRouter = express.Router();

coursesRouter.post("/", async (req, res) => {
	const course = new Course(req.body);
	return console.log(course);
	//course.author = req.user._id;
	//await course.save();
	//return res.send(course);
});

export default coursesRouter;
