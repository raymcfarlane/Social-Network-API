const { Schema, model } = require('mongoose');
const { default: isEmail } = require('validator/lib/isEmail');


// Schema to create User model
const UserSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
      trimmed: true
    },

    email: {
      type: String,
      unique: true,
      required: true,
      validate: [isEmail, 'invalid email']
    },

    thoughts: [{ type: Schema.Types.ObjectId, ref: 'thoughts' }],

    friends: [{ type: Schema.Types.ObjectId, ref: 'user' }],

  },
  {
    toJSON: {
      virtuals: true,
      getters: true
    },
    id: false,
  }
);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length;
});

UserSchema.virtual('thoughtCount').get(function () {
  return this.thoughts.length;
});

const User = model('user', UserSchema);

module.exports = User;
