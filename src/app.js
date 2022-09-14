import express from "express";
import coursesRouter from "./routers/courses.router.js";
import usersRouter from "./routers/users.router.js";
import videosRouter from "./routers/videos.router.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

mongoose
	.connect(
		process.env.DATABASE_URL,

		{
			useNewUrlParser: true,

			useUnifiedTopology: true,
		}
	)

	.then(() => console.log("Connexion à MongoDB réussie !"))

	.catch(() => console.log("Connexion à MongoDB échouée !"));

const app = express();

app.use(express.json());

//CORS

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "*");

	res.setHeader(
		"Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
	);

	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, PUT, DELETE, PATCH, OPTIONS"
	);

	next();
});

// 	//app.use("/jojolearning/users", usersRouter);
// 	//app.use("/jojolearning/videos", videosRouter);
// 	//app.use("/jojolearning/courses", coursesRouter);

module.exports = app;
