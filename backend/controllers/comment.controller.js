import Comment from '../models/comment.model.js';

export const addComment = async (req, res) => {
  const { postId } = req.params;
  const { content, parentComment } = req.body;

  if (!content) return res.status(400).json({ message: "Komentarz nie może być pusty" });

  try {
    const comment = await Comment.create({
      content,
      author: req.userId,
      post: postId,
      parentComment: parentComment || null
    });

    const populatedComment = await Comment.findById(comment._id)
      .populate('author', 'username');

    res.status(201).json(populatedComment);
  } catch (err) {
    res.status(500).json({ message: "Błąd serwera" });
  }
};

export const getComments = async (req, res) => {
  const { postId } = req.params;

  try {
    const comments = await Comment.find({ post: postId })
      .populate('author', 'username')
      .sort({ createdAt: 1 });

    const commentMap = {};
    comments.forEach(c => commentMap[c._id] = { ...c._doc, replies: [] });

    const rootComments = [];
    comments.forEach(c => {
      if (c.parentComment) {
        commentMap[c.parentComment]?.replies.push(commentMap[c._id]);
      } else {
        rootComments.push(commentMap[c._id]);
      }
    });

    res.json(rootComments);
  } catch (err) {
    res.status(500).json({ message: "Błąd serwera" });
  }
};
