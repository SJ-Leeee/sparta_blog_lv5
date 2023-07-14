const { Users } = require('../models');

class UserRepository {
  createUser = async (nickname, password) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createUserData = await Users.create({
      nickname,
      password,
    });
    console.log(createUserData); // 삭제

    return createUserData;
  };

  existUser = async (nickname) => {
    const getUsersData = await Users.findOne({ where: { nickname } });
    return getUsersData;
  };

  getUsers = async () => {
    const getUsersData = await Users.findAll({
      attributes: ['userId', 'nickname', 'createdAt', 'updatedAt'],
    });
    return getUsersData;
  };
}

module.exports = UserRepository;
