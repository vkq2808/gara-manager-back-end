// Import các module cần thiết
const express = require('express');
const bodyParser = require('body-parser');

// Khởi tạo ứng dụng Express
const app = express();

// Cấu hình các middleware
app.use(bodyParser.json());  // Để xử lý dữ liệu JSON
app.use(bodyParser.urlencoded({ extended: true }));  // Để xử lý dữ liệu từ form

// Định nghĩa route cơ bản
app.get('/', (req, res) => {
    res.send('Hello, World!');  // Trả về nội dung đơn giản khi truy cập vào route "/"
});

// Định nghĩa một route khác
app.get('/api', (req, res) => {
    res.json({ message: 'Welcome to the API!' });  // Trả về JSON khi truy cập vào route "/api"
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
