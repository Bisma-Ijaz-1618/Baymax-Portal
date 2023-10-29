const Post = require("../model/Post");
const User = require("../model/User");
const Comment = require("../model/Comment");

const getAllComments = async (req, res) => {
  const comments = await Comment.find();
  if (!comments) return res.status(204).json({ message: "No comments found" });
  return res.json(comments);
};
//use the same format for response
const getAllPostComments = async (req, res) => {
  //use only user id
  const postId = req.body.postId;
  try {
    const comments = await Comment.find({ postId, isDeleted: false });
    console.log("comments", comments);
    if (!comments) {
      return res.sendStatus(204);
    }
    return res.json(comments);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return res.status(500).json({ error: "Failed to fetch comments" });
  }
};

const addCommentToPost = async (req, res) => {
  const userId = req.userId;
  const { postId, text } = req.body;
  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    const newComment = new Comment({ postId, userId, text, isDeleted: false });
    const savedComment = await newComment.save();
    console.log(savedComment);
    return res.json(savedComment);
  } catch (error) {
    console.error("Error adding comment to post:", error);
    return res.status(500).json({ error: "Failed to add comment to post" });
  }
};

const deleteAllUserComments = async (req, res) => {
  const userId = req.userId;
  try {
    const commentsByUser = await Comment.find({
      userId,
      isDeleted: false,
    });

    if (commentsByUser.length === 0) {
      console.log("No comments found for the specified user.");
      return res
        .status(204)
        .json({ message: "No comments found for the specified user." });
    }

    // Update 'isDeleted' to true for all comments made by the user.
    const deletedComments = await Comment.updateMany(
      { userId, isDeleted: false },
      { $set: { isDeleted: true } }
    );

    return res.status(200).json({ message: `Comments Deleted!` });
  } catch (error) {
    console.error("Error deleting comments:", error.message);
    return res.sendstatus(500);
  }
};

const deleteAllPostComments = async (req, res) => {
  const postId = req.body.postId;
  if (!postId) {
    return res.status(400).json({ message: `postId missing in body` });
  }
  try {
    const commentsByUser = await Comment.find({
      postId,
      isDeleted: false,
    });

    if (commentsByUser.length === 0) {
      console.log("No comments found for the specified post.");
      return res
        .status(204)
        .json({ message: "No comments found for the specified post." });
    }

    // Update 'isDeleted' to true for all comments made by the user.
    const deletedComments = await Comment.updateMany(
      { postId, isDeleted: false },
      { $set: { isDeleted: true } }
    );
    return res.status(200).json({
      message: `Comments of the given post are Deleted!`,
    });
  } catch (error) {
    console.error("Error deleting comments:", error.message);
    return res.sendstatus(500);
  }
};

const deleteOneUserComment = async (req, res) => {
  const userId = req.userId;
  const commentId = req.body.commentId;
  try {
    const commentsByUser = await Comment.find({
      _id: commentId,
      userId,
      isDeleted: false,
    });

    if (commentsByUser.length === 0) {
      console.log("No comment found.");
      return res.status(204).json({ message: "No comment fuond" });
    }

    // Update 'isDeleted' to true for all comments made by the user.
    const deletedComments = await Comment.findOneAndUpdate(
      { _id: commentId, userId, isDeleted: false },
      { $set: { isDeleted: true } }
    );
    return res.status(200).json({ message: `Comment Deleted!` });
  } catch (error) {
    console.error("Error updating comments:", error.message);
    return res.sendstatus(500);
  }
};
// Call the function to update all comments made by the particular user.

module.exports = {
  addCommentToPost,
  getAllPostComments,
  getAllComments,
  deleteAllPostComments,
  deleteAllUserComments,
  deleteOneUserComment,
};
