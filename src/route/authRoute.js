import express from "express";
import loginController from "../controllers/loginController.js";
import userController from "../controllers/userController.js";

let authAPI = express.Router();

let authAPIRoute = (app) => {
    authAPI.post("/login", loginController.handleLogin);
    authAPI.post("/regist", loginController.handleRegister);
    authAPI.get("/verify-email/:token", loginController.handleVerifyEmail);
    authAPI.post("/reset-password", loginController.handleEnterEmailForResetingPassword);
    authAPI.post("/reset-password/:token", loginController.handleResetPassword);
    authAPI.get("/get-user-info", userController.handleGetUserInfo);
    authAPI.get("/get-user-info/:userId", userController.handleGetUserInfo);

    return app.use("/auth", authAPI);
}

export default authAPIRoute;
