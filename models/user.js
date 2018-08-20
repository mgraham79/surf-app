const mongoose = require("mongoose");
const validators = require("mongoose-validators");
const uniqueValidator = require("mongoose-unique-validator");
const Schema = mongoose.Schema;

const userSchema = new Schema({
 
  // username: {
  //   type: String,
  //   trim: true,
  //   required: "Username is Required",
  //   unique: true
  // },

  firstName: {
    type: String,
    trim: true,
    required: "First name is Required",
  },

  lastName: {
    type: String,
    trim: true,
    required: "Last name is Required",
  },

  middleInitial: {
    type: String,
    trim: true,
    validate: [
      function(input) {
        return input.length <= 1;
      },
      "Enter only One letter for middle initial."
    ]
  },
  
  password: {
    type: String,
    trim: true,
    required: "Password is Required",
    unique: true
  },

  email: {
    type: String,
    trim: true,
    validate: validators.isEmail()
  },

  picURL: {
    type: String,
    trim: true,
    validate: validators.isURL()
  },

  location: [{
    lat: {
      type: String
    }, 
    lng: {
      type: String
    }
  }],

  exp: {
    type: String,
    trim: true,
  },

  rating: {
    type: Number
  },

  board: {
    type: String,
    trim: true,
  },

  available: {
    type: Boolean,
    default: false
  },

  bio: {
    type: String,
    trim: true,
  },

  favBeaches: {
    type: String,
    trim: true,
  },

  reserved: {
    type: Boolean,
    default: false
  },

  instructor: {
    type: Boolean,
    default: false
  },

});

const User = mongoose.model("User", userSchema);

module.exports = User;
