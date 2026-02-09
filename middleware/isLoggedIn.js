module.exports = function (req, res, next) {
  if (!req.session.studentId) {
    return res.redirect("/student/login");
  }
  next();
};
