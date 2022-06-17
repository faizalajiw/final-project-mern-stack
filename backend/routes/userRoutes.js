const router = require("express").Router();
const User = require("../models/User");

// handle user creation
router.post("/", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    console.log(user);
    await user.generateAuthToken();
    res.status(201).json(user);
  } catch (err) {
    let msg;
    if (err.code === 11000) {
      msg = "Email sudah terdaftar";
    } else {
      msg = err.message;
    }
    res.status(400).json(msg);
  }
});

// Login user
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findByCredentials(email, password);
    await user.generateAuthToken();
    res.json(user);
  } catch (err) {
    res.status(400).json(err.message);
  }
});

module.exports = router;
