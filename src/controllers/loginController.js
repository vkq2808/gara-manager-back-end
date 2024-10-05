import jwt from 'jsonwebtoken';
import bcrypt, { hash } from 'bcryptjs';
import userService from "../services/userService";

import sendEmail from "../utils/sendEmail";

const USER_ROLE = "USER";

const handleLogin = async (req, res) => {
    let { email, password } = req.body;

    console.log("Email: ", email);
    console.log("Password: ", password);

    if (!email || !password) {
        console.log("Email and Password are required");
        return res.status(208).send("Email and Password are required");
    }

    try {
        const userLogin = await userService.getUserInfoByEmail(email);

        if (userLogin) {
            let isPasswordCorrect = await bcrypt.compare(password, userLogin.password);
            if (isPasswordCorrect) {
                let accessToken = jwt.sign({ email: userLogin.email, id: userLogin.id }, process.env.ACCESS_TOKEN_SERCET_KEY, { expiresIn: '1h' });
                let refreshToken = jwt.sign({ email: userLogin.email, id: userLogin.id }, process.env.REFRESH_TOKEN_SERCET_KEY, { expiresIn: '1d' });
                return res.json({ msg: "Login success", user: userLogin, accessToken, refreshToken });
            } else {
                return res.status(207).send({ msg: "Email or Password is incorrect" });
            }
        } else {
            console.log("User not found");
            return res.status(207).send({ msg: "Email or Password is incorrect" });
        }
    } catch (err) {
        console.error('Có lỗi xảy ra:', err);
        return res.status(500).send("Internal Server Error");
    }
}


const handleRegister = async (req, res) => {

    let { email, password, firstName, lastName } = req.body;
    if (!email || !email) {
        console.log("Email and Password are required");
        return res.status(207).send({ msg: "Email và mật khẩu là bắt buộc" });
    }

    let checkUserExist = await userService.getUserInfoByEmail(email);
    if (checkUserExist) {
        console.log("User already exists");
        return res.status(207).send({ msg: "Email đã tồn tại" });
    } else {
        console.log('Email hợp lệ để đăng ký.');
    }

    const token = jwt.sign({ email, password, firstName: firstName.trim(), lastName: lastName.trim(), role: USER_ROLE }, process.env.REGISTER_SECRET_KEY, { expiresIn: '20m' });

    const registerLink = `${process.env.CLIENT_URL}/auth/verify-email/${token}`;

    const mailOptions = {
        from: process.env.SMTP_EMAIL || 'vkq0919309031@gmail.com',
        to: req.body.email,
        subject: 'Link verify email',
        html: `<a href="${registerLink}">Click here to verify email</a>`
    };

    sendEmail(mailOptions);

    return res.status(200).send({ msg: "Email sent to verify email" });
}

const handleVerifyEmail = async (req, res) => {
    const token = req.params.token;
    if (!token) {
        return res.status(209).json({ msg: "Token is required" });
    }

    try {
        const decoded = jwt.verify(token, process.env.REGISTER_SECRET_KEY);
        if (decoded) {
            let checkUserVerified = await userService.getUserInfoByEmail(decoded.email);
            if (checkUserVerified) {
                console.log("Email already verified");
                return res.status(209).json({ msg: "Email already verified" });
            }

            let hashPassword = await bcrypt.hash(decoded.password, process.env.SALT);

            let newUser = await userService.createNewUser({
                email: decoded.email,
                password: hashPassword,
                fistName: decoded.firstName,
                lastName: decoded.lastName,
                role: decoded.role
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