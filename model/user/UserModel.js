const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const getOTP = require("../../utils/OtpGenerator");
const crypto = require("crypto");
const validator = require("validator");

const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "First name is required"],
    }, // String is shorthand for {type: String}
    lastName: {
      type: String,
      required: [true, "Last name required"],
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

    dob: {
      type: Date,
    },

    email: {
      type: String,
      trim: true,
      validate: validator.isEmail,
      required: [true, "Email is required"],
      unique: [true, "Email already exists"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    postCount: {
      type: Number,
      default: 0,
    },
    storyCount: {
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
    emailVerificationOTP: String,
    emailVerificationOTPExpire: Date,

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
    changePasswordOTP: String,
    forgotPasswordTokenExpire: Date,
    active: {
      type: Boolean,
      default: true,
    },
    deactivationTimeExpire: Date,
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

// to populate post from user model
UserSchema.virtual("Post", {
  ref: "Post",
  foreignField: "author",
  localField: "_id",
});

// to populate followers for each user
UserSchema.virtual("Followers", {
  ref: "User",
  foreignField: "_id",
  localField: "followers",
})

// to populate following of each user
UserSchema.virtual("Following", {
  ref: "User",
  foreignField: "_id",
  localField: "following",
})

// encrypt password before save --Hooks
UserSchema.pre("save", async function (next) {
  // Only run this function if password was moddified (not on other update functions)
  if (!this.isModified("password")) return next();
  // Hash password with strength of 10
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

//match password
UserSchema.methods.CheckPassword = async function (user__input__password) {
  return await bcrypt.compare(user__input__password, this.password);
};

// get password otp
UserSchema.methods.getPasswordResetOTP = async function () {
  const OTP = getOTP();
  this.changePasswordOTP = crypto
    .createHash("sha256")
    .update(OTP)
    .digest("hex");
  this.forgotPasswordTokenExpire = Date.now() + 5 * 60 * 1000;

  // this.changePasswordOTP = crypto.createHash("sha256").update();
  return OTP;
};

// get Email Verification
UserSchema.methods.getEmailVerificationOTP = async function () {
  const OTP = getOTP();
  this.emailVerificationOTP = crypto
    .createHash("sha256")
    .update(OTP)
    .digest("hex");
  this.emailVerificationOTPExpire = Date.now() + 5 * 60 * 1000;

  return OTP;
};

const User = mongoose.model("User", UserSchema);
module.exports = User;
