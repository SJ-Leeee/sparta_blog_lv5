const CommentService = require('../services/comments.service');

// Post의 컨트롤러(Controller)역할을 하는 클래스
class CommentController {
  commentService = new CommentService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getComment = async (req, res, next) => {
    const { postId } = req.params;
    const { code, data } = await this.commentService.findAllComment(postId);
    res.status(code).json({ data });
  };

  createComment = async (req, res, next) => {
    const { comment } = req.body;
    const { userId } = res.locals.user;
    const { postId } = req.params;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const { code, message } = await this.commentService.createComment(
      userId,
      postId,
      comment
    );

    res.status(code).json({ message });
  };

  modifyComment = async (req, res, next) => {
    const { comment } = req.body;
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;

    const { code, message } = await this.commentService.modifyComment(
      userId,
      postId,
      commentId,
      comment
    );
    res.status(code).json({ message });
  };

  deleteComment = async (req, res, next) => {
    const { userId } = res.locals.user;
    const { postId, commentId } = req.params;
    const { code, message } = await this.commentService.deleteComment(
      userId,
      postId,
      commentId
    );
    res.status(code).json({ message });
  };
}

module.exports = CommentController;
