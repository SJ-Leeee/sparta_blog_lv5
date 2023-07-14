const PostRepository = require('../repositories/posts.repository');

class PostService {
  postRepository = new PostRepository();

  findAllPost = async () => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    const allPost = await this.postRepository.findAllPost();

    // 호출한 Post들을 가장 최신 게시글 부터 정렬합니다.
    allPost.sort((a, b) => {
      return b.createdAt - a.createdAt;
    });
    return { code: 200, data: allPost };
  };
  findOnePost = async (postId) => {
    const onePost = await this.postRepository.findOnePost(postId);

    return {
      code: 200,
      data: onePost,
    };
  };

  createPost = async (userId, title, content) => {
    // 저장소(Repository)에게 데이터를 요청합니다.
    if (title === '' || content === '') {
      return { code: 400, message: 'title, content를 입력해주세요' };
    }
    const createPostData = await this.postRepository.createPost(
      userId,
      title,
      content
    );
    return { code: 200, message: '게시물이 생성되었습니다' };
  };

  modifyPost = async (postId, userId, title, content) => {
    if (title === '' || content === '') {
      return { code: 400, message: 'title, content를 입력해주세요' };
    }

    const existPost = await this.postRepository.findOnePost(postId);
    if (!existPost) {
      return { code: 404, message: '게시물이 존재하지 않습니다.' };
    }
    if (existPost.userId !== userId) {
      return { code: 401, message: '권한이 없습니다.' };
    }

    await this.postRepository.modifyPost(postId, title, content);
    return { code: 200, message: '게시물이 수정되었습니다.' };
  };

  deletePost = async (postId, userId) => {
    const existPost = await this.postRepository.findOnePost(postId);
    if (!existPost) {
      return { code: 404, message: '게시물이 존재하지 않습니다.' };
    }
    if (existPost.userId !== userId) {
      return { code: 401, message: '권한이 없습니다.' };
    }

    await this.postRepository.deletePost(postId);
    return { code: 200, message: '게시물이 삭제되었습니다.' };
  };

  likePost = async (postId, userId) => {
    const existPost = await this.postRepository.findOnePost(postId);
    const existPostLikes = await this.postRepository.findPostLikes(
      postId,
      userId
    );

    // return {
    //   code: 200,
    //   message: "여기까진 잘되요",
    //   data: likes,
    // };
    if (!existPost) {
      return { code: 404, message: '게시물이 존재하지 않습니다.' };
    }

    const likes = existPost.likes;

    if (!existPostLikes) {
      const likesCount = await this.postRepository.addPostLikes(
        postId,
        userId,
        likes
      );
      console.log(typeof postId);
      console.log(userId);

      return {
        code: 200,
        message: '좋아요가 추가 되었습니다.',
        data: likesCount,
      };
    } else {
      const likesCount = await this.postRepository.deletePostLikes(
        postId,
        userId,
        likes
      );

      return {
        code: 200,
        message: '좋아요가 해제 되었습니다.',
        data: likesCount,
      };
    }
  };
}

module.exports = PostService;
