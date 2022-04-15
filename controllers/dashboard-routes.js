const router = require("express").Router();
const { Post, User, Comment } = require("../models");

router.get("/", (req, res) => {
  console.log(req.session);
    Post.findAll({
        where: { 
          user_id: req.session.user_id
      },
    order: [["created_at", "DESC"]],
    attributes: ["id", "title", "contents", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      //sterilize object using .get() Sequelize method
      const posts = dbPostData.map((post) => post.get({ plain: true }));
      res.render("dashboard", { posts, loggedIn: true });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

router.get("/post/:id", (req, res) => {
  Post.findOne({
    where: { id: req.params.id },
    attributes: ["id", "title", "contents", "created_at"],
    include: [
      {
        model: Comment,
        attributes: ["id", "comment_text", "post_id", "user_id", "created_at"],
        include: {
          model: User,
          attributes: ["username"],
        },
      },
      {
        model: User,
        attributes: ["username"],
      },
    ],
  })
    .then((dbPostData) => {
      if (!dbPostData) {
        res.status(404).json({ message: "Post not found." });
        return;
      }
      // serialize the data
      const post = dbPostData.get({ plain: true });

      //pass if the user is logged in
      res.render("post", { post, loggedIn: req.session.loggedIn });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
});

module.exports = router;
