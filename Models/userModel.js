const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const schema = mongoose.Schema;
const validator = require("validator");

const userSchema = new schema({
  email: {
    type: String,
    require: true,
    unique: true,
  },
  password: {
    type: String,
    require: true,
  },
});

// Static signup method

userSchema.statics.signup = async function (email, password) {
  //Validation
  if (!email || !password) {
    throw Error("All Fields must be filled");
  }
  if (!validator.isEmail(email)) {
    throw Error("Email is not valid");
  }
  if (!validator.isStrongPassword(password)) {
    throw Error("Password is not strong");
  }
  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("Email already exists");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = await this.create({ email, password: hash });
  return user;
};

//static login method

userSchema.statics.login = async function (email, password) {
  //Validation
  if (!email || !password) {
    throw Error("All Fields must be filled");
  }
  const user = await this.findOne({ email });

  if (!user) {
    throw Error("Incorrect Email");
  }
  const match = await bcrypt.compare(password, user.password);
  if (!match) {
    throw Error("Incorrect password");
  }
  return user;
};

module.exports = mongoose.model("user", userSchema);
