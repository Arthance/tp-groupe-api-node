import express from "express";
import cors from "cors";
import usersRouter from "./routers/users.router.js";
import coursesRouter from "./routers/courses.router.js";
// import videosRouter from "./videos.router.js";

const PORT = process.env.PORT || 3000;

export default function loading(app) {
	app.use(express.json());
	app.use(cors());
	app.use("/jojolearning/users", usersRouter);

	// app.use("/jojolearning/videos", videosRouter);
	app.use("/jojolearning/courses", coursesRouter);
	app.listen(PORT, () => {
		console.log(`Le serveur a demarré sur le port ${PORT}`);
	});
}
