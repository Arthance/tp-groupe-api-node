function isInstructor(req, res, next) {
  if (req.user.type.find((role) => role === "teacher")) {
    next();
  } else {
    return res.status(403).send("Only teachers can do that !");
  }
}

export default isInstructor;
