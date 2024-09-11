import express from "express";
import loginController from "../controllers/loginController.js";

let authAPI = express.Router();

let authAPIRoute = (app) => {
    authAPI.get("/login", loginController.getLoginPage);
    authAPI.post("/login", loginController.handleLogin);
    authAPI.get("/register", loginController.getRegisterPage);
    authAPI.post("/register", loginController.handleRegister);
    authAPI.get("/reset-password", loginController.getEnterEmailPage);
    authAPI.post("/reset-password", loginController.handleEnterEmailForResetingPassword);
    authAPI.get("/reset-password/:token", loginController.getResetPasswordPage);
    authAPI.post("/reset-password/:token", loginController.handleResetPassword);

    return app.use("/auth", authAPI);
}

export default authAPIRoute;
