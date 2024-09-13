# About us

# Document
## Documentation
Updating...
## Install
To install and start a server, you can follow these steps:

1. Clone source code về : `git clone https://github.com/vkq2808/gara-manager-back-end.git`
2. Di chuyển đến thư mục chứa các tệp tin của máy chủ bằng cách sử dụng lệnh `cd`. Ví dụ, nếu các tệp tin máy chủ của bạn nằm trong `/đường/dẫn/đến/máy/chủ`, bạn sẽ chạy lệnh `cd /đường/dẫn/đến/máy/chủ`.
3. Sau khi bạn đã ở trong thư mục đúng, bạn có thể cài đặt các phụ thuộc cần thiết bằng cách chạy lệnh quản lý gói tương ứng. Ví dụ, nếu bạn đang sử dụng npm, bạn sẽ chạy lệnh `npm install`.
4. Tạo schema `gara_ute` (hoặc tên bất kì đại diện cho cơ sở dữ liệu của bạn). Sau đó chạy lệnh `npx sequelize db:migrate` để yêu cầu sequelize migrate database (tạo hoặc chỉnh sửa cơ sở dữ liệu), lưu ý, nếu trong cơ sở dữ liệu của bạn đang hiện có schema `gara_ute`, sẽ gây ra mất dữ liệu.
5. Tạo/chỉnh sửa file `.env` sao cho phù hợp với hệ thống của bạn, dựa trên file `.env-example`
6. Sau khi các phụ thuộc được cài đặt, bạn có thể khởi động máy chủ bằng cách chạy lệnh tương ứng. Lệnh này sẽ thay đổi tùy thuộc vào framework hoặc công nghệ máy chủ bạn đang sử dụng. Ví dụ, nếu bạn đang sử dụng Node.js với Express, bạn sẽ chạy lệnh `node server.js` hoặc `npm start`.



Make sure to check the documentation or README file of your specific server framework or technology for any additional installation or startup instructions.
