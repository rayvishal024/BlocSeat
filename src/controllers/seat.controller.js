import pool from "../config/db.js";

export const getSeats = async (req, res) => {

     // find all seats detils
     const result = await pool.query("SELECT * FROM seats");

     // return response
     res.json(result.rows);
};

export const bookSeat = async (req, res) => {

     // seat book id
     const id = req.params.id;

     // user id
     const user = req.user;

     // connection pool for transection
     const conn = await pool.connect();

     try {
          // start transection
          await conn.query("BEGIN");

          // check seat status with forupdate
          const result = await conn.query(
               "SELECT * FROM seats WHERE id = $1 AND isbooked = 0 FOR UPDATE",
               [id]
          );

          // already book rollback transection
          if (result.rowCount === 0) {
               await conn.query("ROLLBACK");
               return res.json({ error: "Already booked" });
          }

          // book seat with user
          await conn.query(
               "UPDATE seats SET isbooked = 1, name = $2, user_id = $3 WHERE id = $1",
               [id, user.name, user.id]
          );

          // commit transection 
          await conn.query("COMMIT");

          // return response
          res.json({ message: "Booked successfully" });

     } catch (err) {

          // any error rollback
          await conn.query("ROLLBACK");
          res.status(500).json({ error: "Error booking" });

     } finally {
          // release connection 
          conn.release();
     }
};