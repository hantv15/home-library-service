import { HttpStatus } from '@nestjs/common';

export default {
  // Global Error
  SQL_ERROR: {
    message: ['Lỗi truy vấn '],
  },

  // User Service
  VERIFY_PASSWORD: {
    message: [
      'Confirmation password is incorrect',
      'Mật khẩu xác nhật không đúng',
    ],
    statusCode: HttpStatus.FORBIDDEN,
  },
  NOT_FOUND_USER: {
    message: ['Not found login name', 'Tên đăng nhập không tồn tại'],
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  CONFLICT_USER: {
    message: ['Conflict login name', 'Tên đăng nhập đã tồn tại'],
    statusCode: HttpStatus.CONFLICT,
  },
  CREATE_USER_ERROR: {
    message: ['Create user failed', 'Tạo người dùng mới thất bại'],
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  FIND_LOGIN_NAME_ERROR: {
    message: ['Find login name failed', 'Tìm kiếm tên đăng nhập lỗi'],
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
  FIND_ALL_USERS: {
    message: [
      'Find all user failed',
      'Lỗi lấy danh sách người dùng từ máy chủ',
    ],
    statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
  },
};
