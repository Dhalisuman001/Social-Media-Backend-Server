const expressAsyncHandler = require("express-async-handler")
const Story = require("../../model/story/StoryModel")
const validId = require("../../utils/isValid")

const FetchStoryCtrl = expressAsyncHandler(async(req, res) => {
    const id = req.params.id;

    validId(id)

    try {
        const story = await Story.findById(id)
        res.json(story)
    } catch (error) {
        res.json(error)
    }
})

module.exports = FetchStoryCtrl;