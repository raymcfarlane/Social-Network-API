const { User } = require('../models');

module.exports = {
  // GET all users
  async getUsers(req, res) {
    try {
      const result = await User.find({});
      console.log("-----------All Users-----------:", result)
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json({ message: "All users not found." })
    }
  },

  // GET single user
  async getSingleUser(req, res) {
    try {
      const result = await User.findOne({ _id: req.params.userId })
      console.log("Single user:", result)
      res.status(200).json(result);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: `User ${req.params.id} was not found.` })
    }
  },

  // CREATE user
  async createUser(req, res) {
    try {
      const newUser = await User.create(req.body);
      console.log("New user created:",newUser);
      res.status(200).json(newUser)
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: " New user not created." })
    }
  },

  // UPDATE user
  async updateUser(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
      );
      console.log(`${result.username} was updated.`, result)
      res.status(200).json(result);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: `User ${req.params.id} was not found.` })
    }
  },

  // DELETE user
  async deleteUser(req, res) {
    try {
      const result = await User.findOneAndRemove({ _id: req.params.userId })
      console.log(`${req.params.userId} was deleted.`)
      res.status(200).json(result);
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: `User ${req.params.id} was not removed.` })
    }
  },

  // ADD Friend
  async addFriend(req, res) {
    try {
      const newFriend = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendsId } },
        { new: true }
      )
      console.log(`${req.params.friendsId} added as a friend to ${req.params.userId}`)
      res.status(200).json(newFriend)
    } catch (err) {
      console.log(err)
      res.status(500).json({ message: " Friend was not added." })
    }
  },
  // DELETE Friend
  async deleteFriend(req, res) {
    try {
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendsId } },
        { runValidators: true, new: true }
      );

      console.log(`${req.params.friendsId} removed as a friend from ${req.params.userId}`)
      res.status(200).json(result);

    } catch (err) {
      console.log(err)
      res.status(500).json({ message: "Friend was not removed." })
    }
  }
};