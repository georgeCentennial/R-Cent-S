import mongoose from 'mongoose'


const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: 'FIRST NAME is required'
  },

  lastname: {
    type: String,
    trim: true,
    required: 'LAST NAME is required'
  },

  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'EMAIL is required'
  },

  username: {
    type: String,
    trim: true,
    unique: 'Username already exists',
    required: 'USERNAME is required',
    match: [/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'],
  },

  password: {
    type: String,
    required: "Password is required"
  },

  created: {
    type: Date,
    default: Date.now
  },

  updated: {
    type: Date,
    default: Date.now
  }

})

UserSchema.methods = {
    authenticate: function(plainText) {
      return this.password === plainText;
    }
  };
  

export default mongoose.model('User', UserSchema)
