const PostService = require("../services/posts.service");

// Post의 컨트롤러(Controller)역할을 하는 클래스
class PostsController {
  postService = new PostService(); // Post 서비스를 클래스를 컨트롤러 클래스의 멤버 변수로 할당합니다.

  getPosts = async (req, res, next) => {
    // 서비스 계층에 구현된 findAllPost 로직을 실행합니다.
    const { code, data } = await this.postService.findAllPost();
    res.status(code).json({ data });
  };

  getPostDetails = async (req, res, next) => {
    const { postId } = req.params;
    const { code, data } = await this.postService.findOnePost(postId);

    res.status(code).json({ data });
  };

  createPost = async (req, res, next) => {
    const { title, content } = req.body;
    const { userId } = res.locals.user;

    // 서비스 계층에 구현된 createPost 로직을 실행합니다.
    const { code, message } = await this.postService.createPost(
      userId,
      title,
      content
    );

    res.status(code).json({ message });
  };
}

module.exports = PostsController;
