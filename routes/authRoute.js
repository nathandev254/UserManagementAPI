import express from 'express'
import { Login} from '../controllers/authController.js'



const AuthRoute = express.Router()

AuthRoute.route('/login').post(Login)
// AuthRoute.route('/Register').post(Register)

export default AuthRoute