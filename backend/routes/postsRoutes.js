const router = require("express").Router();
const BlogPost = require("../models/BlogPost");
const authUser = require("../middleware/auth");

// POST ARTICLE
router.post("/", authUser, async (req, res) => {
  const { title, content, image } = req.body;
  try {
    const article = await BlogPost.create({
      title,
      content,
      image,
      creator: req.user._id,
    });
    req.user.articles.push(article._id);
    res.json(article);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

// GET ALL ARTICLES
router.get("/", async (req, res) => {
  try {
    const posts = await BlogPost.find();
    res.json(posts);
  } catch (err) {
    res.status(400).json(err.message);
  }
})

module.exports = router;