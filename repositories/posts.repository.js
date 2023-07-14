const { Posts, Users, PostLikes } = require('../models');

class PostRepository {
  findAllPost = async () => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const posts = await Posts.findAll({
      attributes: ['postId', 'title', 'likes', 'createdAt', 'updatedAt'],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
    });

    return posts;
  };

  findOnePost = async (postId) => {
    const posts = await Posts.findOne({
      // 속성을 여기서 해야하나 서비스에서 해야하나..
      attributes: [
        'postId',
        'userId',
        'title',
        'content',
        'likes',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
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

  modifyPost = async (postId, title, content) => {
    const modifyPostData = await Posts.update(
      { title, content },
      {
        where: { postId },
      }
    );
    return modifyPostData;
  };

  deletePost = async (postId) => {
    await Posts.destroy({ where: { postId } });

    return;
  };

  findPostLikes = async (postId, userId) => {
    const postLikesData = await PostLikes.findOne({
      where: { postId, userId },
    });

    return postLikesData;
  };

  addPostLikes = async (postId, userId, likes) => {
    await PostLikes.create({
      userId,
      postId,
    });

    const likeCount = await Posts.update(
      { likes: likes + 1 },
      {
        where: { postId },
      }
    );

    return likeCount.likes;
  };
  deletePostLikes = async (postId, userId, likes) => {
    await PostLikes.destroy({
      where: {
        postId,
        userId,
      },
    });

    const likeCount = await Posts.update(
      { likes: likes - 1 },
      {
        where: { postId },
      }
    );
    return likeCount.likes;
  };
}

module.exports = PostRepository;
