const UserRepository = require('../repositories/users.repository');
const jwt = require('jsonwebtoken');

class UserService {
  userRepository = new UserRepository();

  createUser = async (nickname, password) => {
    const getUserData = await this.userRepository.existUser(nickname);
    if (getUserData == null) {
      await this.userRepository.createUser(nickname, password);
      // return { code: 200, message: `${this.nickname} 계정을 생성하였습니다.` }; 생각해보기
      return { code: 200, message: `계정을 생성하였습니다.` };
    } else {
      return { code: 409, message: '이미 존재하는 nickname 입니다.' };
    }
  };

  getUser = async () => {
    const getUsers = await this.userRepository.getUsers();
    // console.log(getUsers); 이 때는 dataValues,_previousDataValues 등등 나오는데 response로 하면 데이터만 찍힌다..
    return { code: 200, data: getUsers };
  };

  login = async (nickname, password, confirmpassword) => {
    if (password !== confirmpassword) {
      return { code: 400, message: '비밀번호와 확인비밀번호가 다릅니다.' };
    }
    const checkUser = await this.userRepository.existUser(nickname);
    if (!checkUser) {
      return { code: 404, message: '사용자가 존재하지 않습니다.' };
    }

    if (checkUser.password !== password) {
      return { code: 401, message: '비밀번호가 틀렸습니다' };
    }

    const token = jwt.sign(
      {
        userId: checkUser.userId,
      },
      'customized_secret_key'
    );

    return { token, code: 200, message: '로그인 성공하였습니다.' };
  };
}

module.exports = UserService;
