const express = require("express");
const router = express.Router();
const postController = require("../../controllers/postController");
const commentController = require("../../controllers/commentController");

const ROLES_LIST = require("../../config/roles_list");
const verifyRoles = require("../../middleware/verifyRoles");

router.use(verifyRoles(ROLES_LIST.User));

router.route("/all").get(postController.getAllPosts);
router.route("/userPosts").get(postController.getAllUserPosts);
router.route("/newpost").post(postController.createPost);
router.route("/update").put(postController.updatePost);
router.route("/delete").delete(postController.deletePost);
router.route("/addComment").put(commentController.addCommentToPost);
router.route("/allComments").get(commentController.getAllComments);
router.route("/postComments").get(commentController.getAllPostComments);
router
  .route("/deleteAllUserComments")
  .delete(commentController.deleteAllUserComments);
router
  .route("/deleteAllPostComments")
  .delete(commentController.deleteAllPostComments);
router
  .route("/deleteOneUserComment")
  .delete(commentController.deleteOneUserComment);
//router.route("/deleteOneUserComment").delete(commentController.deleteComment);

module.exports = router;
