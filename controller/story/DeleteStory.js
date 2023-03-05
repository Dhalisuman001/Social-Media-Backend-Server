const expressAsyncHandler = require("express-async-handler");
const Story = require("../../model/story/StoryModel");
const validId = require("../../utils/isValid");

const DeleteStoryCtrl = expressAsyncHandler(async (req, res) => {

    const id = req.user._id;
    const StoryId = req.body.id;

    validId(StoryId);

    const story = await Story.findById(StoryId);

    if (!story) throw new Error("Story not found!");

    if (story.author.toString() === id.toString()) {
        try {
            const deleteStory = await Story.findByIdAndDelete(StoryId);
            res.json({ message: "Story is deleted", deletedStory: deleteStory });
        } catch (error) {
            res.json(error);
        }
    }

    else throw new Error("You can't delete anyone's story!");



});

module.exports = DeleteStoryCtrl;