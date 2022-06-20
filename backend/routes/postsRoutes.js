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
    await req.user.save();
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
});

// GET MY ARTICLES
router.get("/me", authUser, async (req, res) => {
  try {
    const user = req.user;
    user.populate("articles").then(({ articles }) => {
      res.json(articles)})
  } catch (err) {
    res.status(404).json(err.message);
  }
});

// GET ONE ARTICLE BY ID
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const article = await BlogPost.findById(id);
    article.populate("creator").then((result) => {
      console.log(result);
      res.json(result);
    });
  } catch (err) {
    res.status(400).json("Not found");
  }
});

// DELETE ARTICLE
router.delete("/:id", authUser, async (req, res) => {
  const { id } = req.params;
  try {
    const article = await BlogPost.findById(id);
    if (article.creator.toString() === req.user._id.toString()) {
      await article.remove();
      res.status(200).send()
    } else {
      res.status(401).json("Tidak mempunyai hak akses")
    }
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// UPDATE ARTICLE
router.patch("/:id", authUser, async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const article = await BlogPost.findByIdAndUpdate(id, { title, content });
    res.status(200).send();
  } catch (err) {
    res.status(400).send(err.message);
  }
})

module.exports = router;
