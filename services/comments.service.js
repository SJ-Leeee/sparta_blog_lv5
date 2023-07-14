const CommentRepository = require('../repositories/comments.repository');

class CommentService {
  commentRepository = new CommentRepository();

  findAllComment = async (postId) => {
    const allComment = await this.commentRepository.findAllComment(postId);
    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allComment.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return { code: 200, data: allComment };
  };

  createComment = async (userId, postId, comment) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    if (comment == '') {
      return { code: 400, message: 'comment를 입력해주세요' };
    }
    try {
      await this.commentRepository.createComment(userId, postId, comment);
      return { code: 200, message: '댓글이 생성되었습니다' };
    } catch (error) {
      return { code: 400, message: error };
    }
  };

  modifyComment = async (userId, postId, commentId, comment) => {
    if (comment == '') {
      return { code: 400, message: 'comment를 입력해주세요' };
    }
    const exComment = await this.commentRepository.findOneComment(
      postId,
      commentId
    );
    if (!exComment) {
      return { code: 404, message: '데이터가 존재하지 않습니다.' };
    }
    if (exComment.userId !== userId) {
      return { code: 401, message: '권한이 없습니다.' };
    }
    try {
      await this.commentRepository.modifyComment(postId, commentId, comment);
      return { code: 200, message: '댓글이 수정되었습니다' };
    } catch (error) {
      return { code: 400, message: error };
    }
  };
  deleteComment = async (userId, postId, commentId) => {
    const exComment = await this.commentRepository.findOneComment(
      postId,
      commentId
    );
    if (!exComment) {
      return { code: 404, message: '데이터가 존재하지 않습니다.' };
    }
    if (exComment.userId !== userId) {
      return { code: 401, message: '권한이 없습니다.' };
    }
    try {
      await this.commentRepository.deleteComment(postId, commentId);
      return { code: 200, message: '댓글이 삭제되었습니다' };
    } catch (error) {
      return { code: 400, message: error };
    }
  };
}

module.exports = CommentService;
