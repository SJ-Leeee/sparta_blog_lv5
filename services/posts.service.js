const PostRepository = require("../repositories/posts.repository");

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
    const createPostData = await this.postRepository.createPost(
      userId,
      title,
      content
    );

    // 비즈니스 로직을 수행한 후 사용자에게 보여줄 데이터를 가공합니다.
    return { code: 200, message: "게시물이 생성되었습니다" };
  };
}

module.exports = PostService;
