const expressAsyncHandler = require("express-async-handler");
const Story = require("../../model/story/StoryModel");
const User = require("../../model/user/UserModel");
const fs = require("fs");
const validId = require("../../utils/isValid");
const cloudinaryUploadImg = require("../../utils/Cloudinary");

const StoryCreateCtrl = expressAsyncHandler(async (req, res) => {
    const id = req.user._id;
    validId(id);
    const localpath = `public/images/story/${req?.file?.filename}`;

    const uploadStory = await cloudinaryUploadImg(localpath);

    try {
        const story = await Story.create({
            ...req.body,
            image: uploadStory?.url,
            author: id,
        });

        //update Story count
        await User.findByIdAndUpdate(
            id,
            {
                $inc: { storyCount: 1 },
            },
            {
                new: true,
            }
        );

        // remove uploaded images
        if (uploadStory) {
            fs.unlinkSync(localpath);
        }

        res.json(story);
    }
    catch (err) {
        console.log(err);
    }
});

module.exports = StoryCreateCtrl;
