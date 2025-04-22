// middlewares/requireLogin.js

exports.requireLogin = (req, res, next) => {
  if (req.session?.user?.id) {
    req.userId = req.session.user.id;
    req.username = req.session.user.username;
    req.role = req.session.user.role;
    return next();
  }

  return res.status(401).json({ message: "Unauthorized: กรุณาเข้าสู่ระบบก่อนใช้งาน" });
};
