import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import userService from '../services/userService';

const handleGetUserInfo = async (req, res) => {

    let userId = req.params.userId;
    let decoded = jwt.verify(req.headers?.authorization?.split(' ')[1], process.env.ACCESS_TOKEN_SERCET_KEY); // Bearer *token*

    if (userId !== decoded?.userId) {
        console.log("Unauthorized", userId, decoded?.id);
        return res.status(401).send("Unauthorized token");
    }

    if (!userId) {
        console.log("Empty userId");
        return res.status(404).send("User not found");
    }


    let user = await userService.getUserInfoById(userId);

    if (!user) {
        console.log("User not found");
        return res.status(204).send("User not found");
    }

    return res.status(200).send(user);
}

export default {
    handleGetUserInfo
}