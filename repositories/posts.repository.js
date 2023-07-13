const { Posts, Users } = require("../models");

class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll({
      attributes: ["postId", "title", "likes", "createdAt", "updatedAt"],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
    });

    return posts;
  };

  findOnePost = async (postId) => {
    const posts = await Posts.findOne({
      attributes: [
        "postId",
        "title",
        "content",
        "likes",
        "createdAt",
        "updatedAt",
      ],
      include: [
        {
          model: Users,
          attributes: ["nickname"],
        },
      ],
      where: { postId },
    });

    return posts;
  };

  createPost = async (userId, title, content) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    const createPostData = await Posts.create({
      userId,
      title,
      content,
    });

    return createPostData;
  };
}

module.exports = PostRepository;
