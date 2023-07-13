const UserRepository = require("../repositories/users.repository");

class PostService {
  userRepository = new UserRepository();

  createUser = async (nickname, password) => {
    const getUserData = await this.userRepository.existUser(nickname);
    if (getUserData == null) {
      await this.userRepository.createUser(nickname, password);
      // return { code: 200, message: `${this.nickname} 계정을 생성하였습니다.` }; 생각해보기
      return { code: 200, message: `계정을 생성하였습니다.` };
    } else {
      return { code: 409, message: "이미 존재하는 nickname 입니다." };
    }
  };

  getUser = async () => {
    const getUsers = await this.userRepository.getUsers();
    // console.log(getUsers); 이 때는 dataValues,_previousDataValues 등등 나오는데 response로 하면 데이터만 찍힌다..
    return { code: 200, data: getUsers };
  };
}

module.exports = PostService;
