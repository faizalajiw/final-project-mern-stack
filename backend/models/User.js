const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema({
  email: {
    type: "string",
    lowercase: true,
    unique: true,
    required: [true, "Email tidak boleh kosong"],
    match: [/\S+@\S+\.\S+/, "Alamat email tidak benar"],
    index: true
  },

  password: {
    type: "string",
    required: [true, "Password tidak boleh kosong"],
  },

  tokens: [],

  articles: [],
});

// hashing password
UserSchema.pre("save", function (next) {
  const user = this;
  if (!user.isModified("password")) return next();
  // jika password diubah atau sudah pernah dibuat sebelumnya
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) return next(err);
      user.password = hash;
      next();
    });
  });
});

// generate token untuk user
UserSchema.methods.generateAuthToken = async function () {
  const user = this;
  console.log('user is', user);
  const token = jwt.sign({ _id: user._id.toString() }, 'appSecret');
  console.log(token);
  user.tokens = user.tokens.concat({ token });
  await user.save();
  return;
};

// mencari user berdasarkan email
UserSchema.statics.findByCredentials = async function (email, password) {
    const user = await User.findOne({ email });
    if (!user) throw new Error("Email atau Password salah");
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Email atau Password salah");
    // jika email dan password benar
    return user;
};

// menyembunyikan informasi user
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();
    delete userObject.password;
    delete userObject.tokens;
    delete userObject.articles;
    return userObject;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
