const expressAsyncHandler = require("express-async-handler");
const Story = require("../../model/story/StoryModel");
const validId = require("../../utils/isValid");

const StoryLikeCtrl = expressAsyncHandler(async (req, res) => {
  const id = req.user._id;
  const StoryId = req.body.id;

  validId(StoryId);

  const story = await Story.findById(StoryId);

  if (!story) throw new Error("Story does not exist!");

  const isLiked = story?.likedBy?.find((e) => e.toString() === id.toString());

  if (isLiked) {
    const story_data = await Story.findByIdAndUpdate(
      StoryId,
      {
        $pull: { likedBy: id },
        $inc: { likes: -1 },
      },
      {
        new: true,
      }
    );
    res.json(story_data);
  } else {
    //is not liked
    const story_data = await Story.findByIdAndUpdate(
      StoryId,
      {
        $push: { likedBy: id },
        $inc: { likes: 1 },
      },
      {
        new: true,
      }
    );
    res.json(story_data);
  }
});

module.exports = StoryLikeCtrl;
