const Post = require("../model/Post");
const User = require("../model/User");
const Comment = require("../model/Comment");

const getAllPosts = async (req, res) => {
  const posts = await Post.find();
  if (!posts) return res.status(204).json({ message: "No posts found" });
  return res.json(posts);
};

const getAllUserPosts = async (req, res) => {
  //use only user id
  const userId = req.userId;
  try {
    const posts = await Post.find({ userId });
    console.log("posts", posts);
    if (!posts) {
      return res.status(204);
    }
    return res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return res.status(500).json({ error: "Failed to fetch posts" });
  }
};

const createPost = async (req, res) => {
  const userId = req.userId;
  const { description, image } = req.body;
  try {
    const newPost = new Post({
      userId,
      description,
      image,
    });
    console.log(newPost);
    const savedPost = await newPost.save();
    console.log(savedPost);
    return res.status(200).json(savedPost);
  } catch (error) {
    console.error("Error creating post:", error);
    return res.status(500).json({ error: "Failed to create post" });
  }
};

const updatePost = async (req, res) => {
  const { postId, description, image } = req.body;
  const userId = req.userId;
  try {
    const updateData = {
      description,
      image,
    };
    const updatedPost = await Post.findOneAndUpdate(
      { _id: postId, userId },
      { $set: updateData },
      { new: true }
    );
    if (updatedPost) {
      return res.status(200).json(updatedPost);
    } else {
      return res.status(404).json({ message: `No post matches ID ${postId}` });
    }
  } catch (error) {
    console.error("Error occurred while updating post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

const deletePost = async (req, res) => {
  if (!req?.body?.postId) {
    return res.status(400).json({ message: "Post Id required" });
  }
  try {
    const postId = req.body.postId;
    const deletedPost = await Promise.all(
      Post.findOneAndUpdate(
        { _id: postId },
        { $set: { isDeleted: true } },
        { new: true }
      ),
      Comment.updateMany({ postId }, { $set: { isDeleted: true } })
    );
    console.log(deletedPost);
    if (deletePost[0] && deletePost[1]) {
      return res.status(200).json({ message: "Post already deleted" });
    }
  } catch (error) {
    console.error("Error occurred while deleting post:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  getAllPosts,
  getAllUserPosts,
  createPost,
  updatePost,
  deletePost,
};
