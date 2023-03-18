const multer = require("multer");
const path = require("path");

//Post
const multerDiskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../../public/images/post"));
  },
  filename: function (req, file, cb) {
    cb(
      null,

      (file.filename =
        file.fieldname + "-" + Date.now() + file.originalname.match(/\..*$/)[0])
    );
  },
});

//Post
const PostFilter = (req, file, cb) => {
  if (
    file.mimetype == "image/png" ||
    file.mimetype == "image/jpeg" ||
    file.mimetype == "image/jpg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
    const err = new Error("Only .jpg .jpeg .png images are supported!");
    err.name = "ExtensionError";
    return cb(err);
  }
};

// Post
const uploadPostPhoto = multer({
  storage: multerDiskStorage,
  fileFilter: PostFilter,
  limits: { fileSize: 1000000 },
}).array("image", 10);

// //images resizing for profile photo
// const PostPhotoResize = async (req, res, next) => {
//   ///if there is no file
//   if (!req.file) return next();
//   req.file.filename = `user-${Date.now()}-${req.file.originalname}`;
//   // console.log("resizing", req.file);
//   await sharp(req.file.buffer)
//     .resize(500, 500)
//     .toFormat("jpeg")
//     .jpeg({ quality: 90 })
//     .toFile(path.join(`public/images/post/${req.file.filename}`));
//   next();
// };

module.exports = uploadPostPhoto;
