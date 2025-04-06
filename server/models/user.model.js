// --- START OF FILE user.model.js ---

import mongoose from 'mongoose';
import crypto from 'crypto'; // Import crypto

const UserSchema = new mongoose.Schema({
  firstname: {
    type: String,
    trim: true,
    required: 'Firstname is required'
  },
  lastname: {
    type: String,
    trim: true,
    required: 'Lastname is required'
  },
  email: {
    type: String,
    trim: true,
    unique: 'Email already exists',
    match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    required: 'Email is required'
  },
  username: {
    type: String,
    trim: true,
    required: 'Username is required',
    unique: 'Username already exists',
    match: [/^[A-Za-z0-9_]+$/, 'Only letters, numbers, and underscores are allowed.']
  },
  // Remove the plain password field
  // password: {
  //   type: String,
  //   required: "Password is required"
  // },
  hashed_password: { // Store the hashed password
    type: String,
    required: "Password is required"
  },
  salt: String, // Store the salt
  created: {
    type: Date,
    default: Date.now
  },
  updated: Date
});

// Virtual field for password (doesn't get saved to DB)
UserSchema
  .virtual('password')
  .set(function(password) {
    this._password = password; // Temporary variable
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password);
  })
  .get(function() {
    return this._password;
  });

// Methods for the schema
UserSchema.methods = {
  // Authentication check
  authenticate: function(plainText) {
    return this.encryptPassword(plainText) === this.hashed_password;
  },
  // Password encryption
  encryptPassword: function(password) {
    if (!password) return '';
    try {
      return crypto
        .createHmac('sha256', this.salt) // Use sha256 HMAC
        .update(password)
        .digest('hex');
    } catch (err) {
      console.error("Password encryption failed:", err); // Log crypto errors
      return '';
    }
  },
  // Salt generation
  makeSalt: function() {
    return Math.round((new Date().valueOf() * Math.random())) + '';
  }
};

// Password validation
UserSchema.path('hashed_password').validate(function(v) {
  if (this._password && this._password.length < 6) {
    this.invalidate('password', 'Password must be at least 6 characters.');
  }
  if ((this.isNew || this.isModified('hashed_password')) && !this._password) {
    this.invalidate('password', 'Password is required');
  }
}, null);


export default mongoose.model('User', UserSchema);
// --- END OF FILE user.model.js ---