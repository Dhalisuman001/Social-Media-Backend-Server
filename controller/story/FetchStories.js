const expressAsyncHandler = require("express-async-handler");
const Story = require("../../model/story/StoryModel");

const FetchStoriesCtrl = expressAsyncHandler(async (req, res) => {
  try {
    const stories = await Story.find();
    res.json(stories);
  } catch (error) {
    res.json(error);
  }
});

module.exports = FetchStoriesCtrl;