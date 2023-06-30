import sql from "mssql";
import config from "../model/Configuration.js";
import bcrypt from "bcrypt";

export const CreateEmployee = async (req, res) => {
  const { username, password, email, firstname, lastname } = req.body;
  const hashedpassword = bcrypt.hashSync(password, 10);

  try {
    let connection = await sql.connect(config);
    const results = await connection
      .request()
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .query("SELECT * FROM users WHERE email= @email OR username= @username");
    const user = results.recordset[0];

    if (user) {
      res.status(201).json({ message: "employee Already exists" });
    } else {
      let pool = await sql.connect(config);
      await pool
        .request()
        .input("username", sql.VarChar, username)
        .input("hashedpassword", sql.VarChar, hashedpassword)
        .input("email", sql.VarChar, email)
        .input("firstname", sql.VarChar, firstname)
        .input("lastname", sql.VarChar, lastname)
        .query(
          "INSERT INTO users (username,password,email,firstname,lastname) VALUES (@username,@hashedpassword,@email,@firstname,@lastname)"
        );
      res.status(200).json({ message: "user created successfully" });
    }
  } catch (error) {
    res.status(201).json({ message: "failed to add employee" });
  } finally {
    sql.close();
  }
};

export const GetEmployees = async (req, res) => {
  try {
    let pool = await sql.connect(config);
    const employees = await pool.request().query("SELECT * FROM users");
    res.status(200).json({
      message: "employee accessed successfully",
      data: employees.recordset,
    });
  } catch (error) {
    res.status(404).json({ message: "server failure" });
  } finally {
    sql.close();
  }
};

export const GetEmployee = async (req, res) => {
  try {
    const {id} = req.params
    let pool = await sql.connect(config);
    const employee = await pool.request()
    .input('id', sql.Int, id)
    .query("SELECT * FROM users WHERE user_id = @id");
    res.status(200).json({
      message: "employee accessed successfully",
      data: employee.recordset,
    });
  } catch (error) {
    res.status(404).json({message:'failed to access employee'})
  }
  finally{
    sql.close()
  }
};

export const UpdateEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, email } = req.body;
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, id)
      .input("username", sql.VarChar, username)
      .input("email", sql.VarChar, email)
      .query(
        "UPDATE users SET username=@username,email=@email WHERE user_id = @id"
      );
    res.status(200).json({ message: "employee updated successffully" });
  } catch (error) {
    res.status(404).json({ message: "failed to update employee" });
  } finally {
    sql.connect(config);
  }
};

export const DeleteEmployee = async (req, res) => {
  try {
    const { id } = req.params;
    let pool = await sql.connect(config);
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM users WHERE user_id = @id");
    res.status(200).json({ message: "employee deleted successfully" });
  } catch (error) {
    res.status(404).json({ message: "failed to delete employee" });
  }
};
