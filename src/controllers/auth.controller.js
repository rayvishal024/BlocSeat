import pool from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { registerSchema, loginSchema } from "../validators/auth.validator.js";

export const register = async (req, res) => {
     
     try {
        // validate feild
       const { error, value } = registerSchema.validate(req.body)
       
       // return error
       if (error) {
            return res.status(400).json({
                 success: false,
                 message: "Invalid input",
                 error : error
            })
       }
  
       const { name, email, password } = value;
       
       // hashed password
       const hashed = await bcrypt.hash(password, 10);
  
       // insert query
       await pool.query(
            "INSERT INTO users (name, email, password) VALUES ($1, $2, $3)",
            [name, email, hashed]
       );
  
       // return response
       res.status(200).json({
            success : true,
            message: "User registered"
       });
   } catch (error) {
        console.log(error.message);
          return res.status(500).json({ message: "Server error" });
   }
};

export const login = async (req, res) => {
     
try {
          // validate input
          const { error, value } = loginSchema.validate(req.body);
     
          // error
          if (error) {
               return res.status(400).json({
                    success: false,
                    message: "Invalid creditional",
                    error: error
               })
          }
     
          const {  email, password } = value;
     
          // find user with email
          const result = await pool.query(
               "SELECT * FROM users WHERE email = $1",
               [email]
          );
     
          // first user
          const user = result.rows[0];
     
          // user not found
          if (!user) return res.status(400).json({ error: "User not found" });
     
          // check password 
          const match = await bcrypt.compare(password, user.password);
     
          // invalid password
          if (!match) return res.status(400).json({ error: "Wrong password" });
     
          // generate token 
          const token = jwt.sign(
               { id: user.id, name: user.name },
               process.env.JWT_SECRET
          );
     
          res.status(200).json({
               success: true,
               message : "login success",
               token
          });
} catch (error) {
     console.log(error.message);
     return res.status(500).json({ message: "Server error" });
}
};