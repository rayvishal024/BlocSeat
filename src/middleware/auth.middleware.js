import jwt from "jsonwebtoken";

const isLoggedIn = (req, res, next) => {

     // token from auth header
     const token = req.headers.authorization?.split(" ")[1];

     // undefined token
     if (!token) return res.status(401).json({ error: "Unauthorized" });

     try {
          // decode token
          const decoded = jwt.verify(token, process.env.JWT_SECRET);

          // add user object in request
          req.user = decoded;
          next();
     } catch {
          res.status(401).json({ error: "Invalid token" });
     }
};

export default isLoggedIn;