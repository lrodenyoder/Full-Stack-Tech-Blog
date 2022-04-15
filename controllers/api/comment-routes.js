const router = require("express").Router();
const { Comment } = require("../../models");

router.get('/', (req, res) => {
    Comment.findAll()
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.error(err);
            res.status(400).json(err);
        });
});

router.post('/', (req, res) => {
  //check if the user is logged in before allowing a comment to be made
  if (req.session) {
    Comment.create({
        comment_text: req.body.comment_text,
        post_id: req.body.post_id,
        //take user id from session instead of body
        user_id: req.session.user_id,
    })
        .then((dbCommentData) => res.json(dbCommentData))
        .catch((err) => {
            console.log(err);
            res.status(400).json(err);
        });
  }
});

router.delete("/:id", (req, res) => {
  Comment.destroy({
    where: { id: req.params.id },
  })
    .then((dbCommentData) => {
      if (!dbCommentData) {
        res.status(404).send({ message: "Comment not found" });
        return;
      }
      res.json(dbCommentData);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
