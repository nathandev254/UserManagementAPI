import express from "express";
import {Isloggedin} from '../middlewares/loginMiddleware.js'
import {
  CreateEmployee,
  GetEmployees,
  UpdateEmployee,
  DeleteEmployee,
  GetEmployee
} from "../controllers/EmployeeController.js";

const UserRoute = express.Router();

UserRoute.route("/").post(CreateEmployee).get(GetEmployees);
UserRoute.route("/:id").put(UpdateEmployee).delete(DeleteEmployee).get(GetEmployee);

export default UserRoute;
