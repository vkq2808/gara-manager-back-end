import userService from "../services/userService";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

import sendEmail from "../utils/sendEmail";

const handleLogin = async (req, res) => {
    let { email, password } = req.body;
    if (!email || !password) {
        console.log("Email and Password are required");
        return res.status(400).send("Email and Password are required");
    }

    let user = await userService.getUserInfoByEmail(email);

    if (user?.id) {
        let isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (isPasswordCorrect) {
            let accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.ACCESS_TOKEN_SERCET_KEY, { expiresIn: '1h' });
            let refreshToken = jwt.sign({ email: user.email, id: user.id }, process.env.REFRESH_TOKEN_SERCET_KEY, { expiresIn: '1d' });
            return res.json({ user, accessToken, refreshToken });
        } else {
            return res.status(401).send("Password is incorrect");
        }
    }
    return res.status(404).send("User not found");
}

const handleRegister = (req, res) => {

    let { email, password, firstName, lastName } = req.body;
    if (!email || !password) {
        console.log("Email and Password are required");
        return res.status(400).send("Email and Password are required");
    }

    let user = userService.getUserInfoByEmail(email);
    if (user.id) {
        console.log("User already exists");
        return res.status(409).send("User already exists");
    }

    const token = jwt.sign({ email, password, firstName, lastName }, process.env.REGISTER_SECRET_KEY, { expiresIn: '20m' });

    const registerLink = `${process.env.CLIENT_URL}/auth/verify-email/${token}`;

    const mailOptions = {
        from: process.env.SMTP_EMAIL || 'vkq0919309031@gmail.com',
        to: req.body.email,
        subject: 'Link verify email',
        html: `<a href="${registerLink}">Click here to verify email</a>`
    };

    sendEmail(mailOptions);

    return res.status(200).send(token);
}

const handleVerifyEmail = async (req, res) => {
    const token = req.params.token;
    console.log(token);
    if (!token) {
        return res.status(209).json({ msg: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.REGISTER_SECRET_KEY);
        if (decoded) {
            let user = await userService.getUserInfoByEmail(decoded.email);
            console.log(user);
            if (user?.id) {
                return res.status(209).json({ msg: "Email already verified" });
            }

            let newUser = await userService.createNewUser({
                email: decoded.email,
                password: decoded.password,
                firstName: decoded.firstName,
                lastName: decoded.lastName
            });
            return res.status(201).json({ msg: "Email verified successfully", user: newUser });
        }
    } catch (error) {
        console.log(error);
        return res.status(203).json({ msg: "Token is invalid or expired" });
    }
}

const handleEnterEmailForResetingPassword = (req, res) => {
    return res.send("Handle Enter Email For Reseting Password");
}


const handleResetPassword = (req, res) => {
    return res.send("Handle Reset Password");
}

export default {
    handleLogin: handleLogin,
    handleRegister: handleRegister,
    handleVerifyEmail: handleVerifyEmail,
    handleEnterEmailForResetingPassword: handleEnterEmailForResetingPassword,
    handleResetPassword: handleResetPassword
}