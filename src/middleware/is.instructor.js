function isInstructor(req, res, next) {
  try {
    for (const role of req.user.type) {
      if (role === "teacher") {
        next();
      } else {
        throw new Error();
      }
    }
  } catch (error) {
    return res.status(403).send("Only teachers can do that !");
  }
}

export default isInstructor;
