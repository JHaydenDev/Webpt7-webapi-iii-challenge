const express = 'express';

const router = express.Router();

router.post('/', (req, res) => {

});

router.post('/:id/posts', (req, res) => {

});

//Get
router.get('/', async (req, res) => {
    try {
        const posts = await posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({
            message:"Error retrieving posts."
        })
    }
    });

    router.get('/:id', (req, res) => {
        try {
            const post = await Posts.findById(req.params.id);
            if(post) {
                req.status(200).json(post);
            } else {
                res.status(404).json({message:"Post not found"});
                }
            } catch(error) {
                res.status(500).json({message:"Error retrieving post"})
          }
        })

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
