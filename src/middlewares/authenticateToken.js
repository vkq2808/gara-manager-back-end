
import jwt from 'jsonwebtoken'; //gọi jwt

const authenticateToken = (req, res, next) => {
    // Miễn xác thực cho các route cụ thể
    const openRoutes = ['/auth'];

    // Nếu là một trong các route miễn xác thực, bỏ qua middleware
    if (req.path.includes(openRoutes)) {
        return next();
    }

    try {
        // Kiểm tra token từ header Authorization hoặc từ cookie
        const token = req.headers['authorization'] || req?.cookies?.token;
        if (!token) {
            console.log("Token not found");
            return res.redirect('/login');
        }

        // Xác thực token
        jwt.verify(token, process.env.TOKEN_SERCET_KEY, (err, user) => {
            // Nếu token không hợp lệ, chuyển người dùng về trang login
            if (err) {
                return res.redirect('/login');
            }

            // Lưu thông tin người dùng vào request
            req.user = user;
            next();
        });
    }
    catch (error) {
        console.log(error);
    }



};

export default authenticateToken;