const { Posts, Comments, Users } = require('../models');

class CommentRepository {
  findAllComment = async (postId) => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const comments = await Comments.findAll({
      attributes: [
        'commentId',
        'userId',
        'postId',
        'comment',
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

    return comments;
  };

  findOneComment = async (postId, commentId) => {
    // ORM인 Sequelize에서 Posts 모델의 findAll 메소드를 사용해 데이터를 요청합니다.
    const comments = await Comments.findOne({
      attributes: [
        'commentId',
        'userId',
        'postId',
        'comment',
        'createdAt',
        'updatedAt',
      ],
      include: [
        {
          model: Users,
          attributes: ['nickname'],
        },
      ],
      where: { postId, commentId },
    });

    return comments;
  };

  createComment = async (userId, postId, comment) => {
    // ORM인 Sequelize에서 Posts 모델의 create 메소드를 사용해 데이터를 요청합니다.
    await Comments.create({
      userId,
      postId,
      comment,
    });

    return;
  };
  modifyComment = async (postId, commentId, comment) => {
    await Comments.update({ comment }, { where: { commentId, postId } });

    return;
  };
  deleteComment = async (postId, commentId) => {
    await Comments.destroy({ where: { postId, commentId } });
    return;
  };
}

module.exports = CommentRepository;
