import jwt from "jsonwebtoken";

export const currentUserMiddleware = (req, res, next) => {
  const authHeader = req.get("Authorization");

  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(" ")[1];

  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_KEY);
    req.isAuth = true;
    req.userId = decodedToken.userId;
  } catch (error) {
    req.isAuth = false;
  }
  next();
};
