const UserService = require('../services/users.service');

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

  login = async (req, res, next) => {
    const { nickname, password, confirmpassword } = req.body; // 바디로 받고

    const { token, code, message } = await this.userService.login(
      // 3개의 값을 넘겨주고 token, code, message를 받는다
      nickname,
      password,
      confirmpassword
    );
    res.cookie('authorization', `Bearer ${token}`); // authorization 이름으로 발급해준 token 값을 쿠키에 넣어준다
    res.status(code).json({ message });
  };
}

module.exports = UsersController;
