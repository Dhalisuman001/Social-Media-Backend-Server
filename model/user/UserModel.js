const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Please enter your first name"],
    }, // String is shorthand for {type: String}
    lastName: {
      type: String,
      required: [true, "Please enter your last name"],
    },
    profilePhoto: {
      type: String,
      default:
        "https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes.png",
    },

    location: {
      city: String,
      pin: String,
      country: String,
    },

    relationshipStatus: {
      type: String,
      enum: ["married", "single", "others"],
    },
    employmentStatus: {
      type: String,
      enum: ["student", "employed", "unemployed"],
    },

    bio: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Please enter email"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter email"],
    },
    postCount: {
      type: Number,
      default: 0,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationToken: String,
    verificationTokenExpire: Date,

    viewedBy: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
        },
      ],
    },

    followers: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    },
    following: {
      type: [{ type: mongoose.Types.ObjectId, ref: "User" }],
    },
    passwordChangedAt: Date,
    forgotPasswordToken: String,
    forgotPasswordTokenExpire: Date,
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamp: true,
  }
);

const User = mongoose.model("User", UserSchema);
module.exports = User;
