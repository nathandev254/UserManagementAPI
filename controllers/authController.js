import sql from "mssql";
import config from "../model/Configuration.js";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";

export const Login = async (req, res) => {
  try {
    const { username, password } = req.body;
    let connection = await sql.connect(config);
    const results = await connection
      .request()
      .input("username", sql.VarChar, username)
      .query("SELECT * FROM users WHERE username = @username");
    const user = results.recordset[0];
    // console.log(user);
    if (!user) {
      res.json({ error: "username doesnt exists" });
    } else {
      if (!bcrypt.compareSync(password, user.password)) {
        res.json({ message: "wrong credentials" });
      }
      const token = JWT.sign(
        { username: user.username, email: user.email },
        "LOGIN123",
        { expiresIn: "1h" }
      );
      res.json({
        username: user.username,
        email: user.email,
        user_id: user.user_id,
        token: `JWT ${token}`
      });
    }
  } catch (error) {
    res.json(error);
  }
};
