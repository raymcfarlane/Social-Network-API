const { Thoughts, User } = require('../../models');

module.exports = {
    // GET all thoughts
    async getThoughts(req, res) {
        try {
            const result = await Thoughts.find({});
            console.log("-----------All Thoughts-----------:", result)
            res.status(200).json(result);
        } catch (err) {
            res.status(500).json({ message: "Something went wrong. All thoughts not found." })
        }
    },

    // GET single thought
    async getSingleThought(req, res) {
        try {
            const result = await Thoughts.findOne({ _id: req.params.thoughtId })
            console.log("Single thought:", result)
            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: `Something went wrong. Thought ${req.params.thoughtId} was not found.` })
        }
    },

    // CREATE thought
    async createThought(req, res) {
        try {
            const newThought = await Thoughts.create(req.body);

            const userPush = await User.findOneAndUpdate(
                { _id: req.body.userId },
                { $push: { thoughts: newThought._id } },
                { new: true }
            )
            console.log(`New thought created and added to ${req.body.userId}`, newThought);
            res.status(200).json(newThought)
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Something went wrong. New thought not created." })
        }
    },

    // UPDATE thought
    async updateThought(req, res) {
        try {
            const result = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $set: req.body },
                { runValidators: true, new: true }
            );
            console.log(`${req.params.thoughtId} updated.`, result)
            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: `Something went wrong. Thought ${req.params.thoughtId} was not found.` })
        }
    },
    // DELETE thought
    async deleteThought(req, res) {
        try {
            const result = await Thoughts.findOneAndRemove({ _id: req.params.thoughtId })
            console.log(`${req.params.thoughtId} deleted.`)
            res.status(200).json(result);
        } catch (err) {
            console.log(err)
            res.status(500).json({ message: `Something went wrong. Thought ${req.params.id} was not removed.` })
        }
    },

    // CREATE Reaction
    async createReaction(req, res) {
        try {
            const newReaction = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $push: { reactions: req.body } },
                { new: true }
            );

            console.log(`New reaction added to ${req.params.thoughtId}`,newReaction);
            res.status(200).json(newReaction)

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Something went wrong. New reaction not created." })
        }

    },

    // DELETE Reaction
    async deleteReaction(req, res) {
        try {
            const deleteReaction = await Thoughts.findOneAndUpdate(
                { _id: req.params.thoughtId },
                { $pull: { reactions: { _id: req.params.reactionsId } } },
                { runValidators: true, new: true }
            );

            console.log(`${req.params.thoughtId} deleted:`,deleteReaction);
            res.status(200).json(deleteReaction);

        } catch (err) {
            console.log(err)
            res.status(500).json({ message: "Something went wrong. New reaction not deleted." })
        }
    }
};