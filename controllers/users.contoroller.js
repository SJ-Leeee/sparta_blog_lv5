const UserService = require("../services/users.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class UsersController {
  userService = new UserService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getUser = async (req, res, next) => {
    const { code, data } = await this.userService.getUser();

    res.status(code).json({ data });
  };

  createUser = async (req, res, next) => {
    const { nickname, password } = req.body;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const { code, message } = await this.userService.createUser(
      nickname,
      password
    );

    res.status(code).json({ message });
  };
}

module.exports = UsersController;
