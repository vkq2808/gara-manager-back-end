import express from "express";
import loginController from "../controllers/loginController.js";

let authAPI = express.Router();

let authAPIRoute = (app) => {
    authAPI.post("/login", loginController.handleLogin);
    authAPI.post("/regist", loginController.handleRegister);
    authAPI.get("/verify-email/:token", loginController.handleVerifyEmail);
    authAPI.post("/reset-password", loginController.handleEnterEmailForResetingPassword);
    authAPI.post("/reset-password/:token", loginController.handleResetPassword);

    return app.use("/auth", authAPI);
}

export default authAPIRoute;
