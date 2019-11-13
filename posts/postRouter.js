const express = require("express");

const Posts = require("./postDb");

const router = express.Router();

//GET
router.get("/", (req, res) => {
  Posts.get().then(post => {
    res.status(200).json(post);
  });
});

//GET ID
router.get("/:id", validatePostId, (req, res) => {
  res.status(200).json(req.post);
});

//DELETE
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  Posts.remove(id)
    .then(post => {
      res.status(200).json({ message: "POST DELETED" });
    })
    .catch(err => res.status(500).json({ message: "COULDNT REMOVE POST" }));
});

//PUT
router.put("/:id", validatePostId, (req, res) => {
  if (!req.post.text) {
    return res.status(400).json({ message: "ADD TEXT" });
  } else if (!req.post) {
    return res.status(400).json({ message: "ID DOESNT EXIST" });
  } else {
    Posts.update(req.params.id, { ...req.body, user_id: req.post.user_id })
      .then(post => {
        res.status(200).json(post);
      })
      .catch(err => {
        res.status(500).json({ message: "POST NOT UPDATED" });
      });
  }
});

// custom middleware
function validatePostId(req, res, next) {
  const id = req.params.id;
  Posts.getById(id)
    .then(post => {
      if (post) {
        console.log("post", post);
        req.post = post;
        next();
      } else {
        res.status(400).json({ message: "BAD ID" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "ID DOESNT EXIST" });
    });
}

module.exports = router;
