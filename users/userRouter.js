const express = 'express';

const router = express.Router();
router.post("/", validateUser, (req, res) => {
    res.status(201).json(req.user);
  });
  

router.post("/:id/posts", validatePost, validateUserId, (req, res) => {
    const post = req.post;
    console.log(post);
    Posts.insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(err => {
        res.status(500).json({ message: "POST ERROR" });
      });
  });

//Get
router.get('/', async (req, res) => {
    try {
        const posts = await posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message:"GET POST ERROR"
        })
    }
    });

//Get:ID
    router.get('/:id', (req, res) => {
        try {
            const post = await Posts.findById(req.params.id);
            if(post) {
                req.status(200).json(post);
            } else {
                res.status(404).json({message:"Post not found"});
                }
            } catch(error) {
                res.status(500).json({message:"GET POST ID ERROR"})
          }
        })

router.get('/:id/posts', (req, res) => {

});

//Delete
router.delete("/:id", validateUserId, (req, res) => {
    const userId = req.user.id;
    Users.remove(userId)
      .then(user => {
        res.status(200).json({ message: "USER DELETED" });
      })
      .catch(err => {
        res.status(500).json({ message: "COULD NOT DELETE" });
      });
  });
  
  //Put
router.put("/:id", validateUserId, (req, res) => {
    const userBody = req.body;
    const userId = req.user.id;
    console.log(userId);
  
    if (!userBody.name) {
      return res.status(400).json({ message: "ERROR ADD NAME" });
    }
  
    //Update
    Users.update(userId, userBody)
      .then(user => {
        if (user) {
          res.status(200).json({ message: "USER UPDATED" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "USER WASNT UPDATED" });
      });
  });
  

//custom middleware

function validateUserId(req, res, next) {
    const id = req.params.id;
    Users.getById(id)
      .then(user => {
        if (user) {
          req.user = user;
          next();
        } else {
          res.status(400).json({ message: "BAD USER ID" });
        }
      })
      .catch(err => {
        res.status(500).json({ message: "ID DOESNT EXIST" });
      });
  }
  

function validateUser(req, res, next) {
    const userBody = req.body;
    console.log(userBody);
  
    if (Object.keys(userBody).length === 0) {
      return res.status(400).json({ message: "NEED USER DATA" });
    } else if (!userBody.name) {
      return res.status(400).json({ message: "MISSING NAME" });
    } else {
      Users.insert(userBody)
        .then(user => {
          if (user) {
            req.user = user;
            next();
          }
        })
        .catch(err => {
          res
            .status(500)
            .json({ message: "USER ADDING ERROR" });
        });
    }
  }
  

function validatePost(req, res, next) {
    const postBody = { ...req.body, user_id: req.params.id };

    console.log("req.body", postBody);
  
    if (Object.entries(postBody).length === 0) {
      res.status(400).json({ message: "NEED POST DATA" });
    } else if (!postBody.text) {
      res.status(400).json({ message: "NEED BODY TEXT" });
    } else {
      Posts.insert(postBody).then(post => {
        if (post) {
          console.log(postBody);
          req.post = post;
          next();
        }
      });
    }
  }

module.exports = router;