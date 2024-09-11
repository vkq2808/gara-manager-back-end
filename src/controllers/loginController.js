const getLoginPage = (req, res) => {
    return res.send("Login Page");
}

const handleLogin = (req, res) => {
    return res.send("Handle Login");
}

const getRegisterPage = (req, res) => {

    return res.send("Register Page");
}

const handleRegister = (req, res) => {
    return res.send("Handle Register");
}

const getEnterEmailPage = (req, res) => {
    return res.send("Enter Email Page");
}

const handleEnterEmailForResetingPassword = (req, res) => {
    return res.send("Handle Enter Email For Reseting Password");
}

const getResetPasswordPage = (req, res) => {
    return res.send("Reset Password Page");
}

const handleResetPassword = (req, res) => {
    return res.send("Handle Reset Password");
}

export default {
    getLoginPage: getLoginPage,
    handleLogin: handleLogin,
    getRegisterPage: getRegisterPage,
    handleRegister: handleRegister,
    getEnterEmailPage: getEnterEmailPage,
    handleEnterEmailForResetingPassword: handleEnterEmailForResetingPassword,
    getResetPasswordPage: getResetPasswordPage,
    handleResetPassword: handleResetPassword
}