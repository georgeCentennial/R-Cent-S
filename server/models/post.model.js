import mongoose from 'mongoose'
//import crypto from 'crypto'          20250318

const PostSchema = new mongoose.Schema({
userId: {
type: String,
trim: true,
required: 'UserId is required'
},  
content: {
type: String,
trim: true,
required: 'content is required'
},
created: {
type: Date,
default: Date.now
},
updated: {
type: Date,
default: Date.now
},
      /*
      hashed_password: {
         type: String,
         required: 'Password is required'
         },
         salt: String
       */
});
/*
PostSchema.virtual('password')
.set(function(password) {
this._password = password;      //make change(3)20250313
this.salt = this.makeSalt();    
this.hashed_password = this.encryptPassword(password);
//this.hashed_password = password;
})
.get(function() {
   return this._password;
   });
   PostSchema.path('hashed_password').validate(function(v) {
      if (this._password && this._password.length < 6) {
      this.invalidate('password', 'Password must be at least 6 characters.');
      }
      if (this.isNew && !this._password) {
      this.invalidate('password', 'Password is required');
      }
      }, null);   //make changes(19) 20250313
      PostSchema.methods = {      
         authenticate: function( plainText) {
         return this.encryptPassword(plainText) === this.hashed_password
         },
         encryptPassword: function(password) {
         if (!password) return ''
         try {
         return crypto
         .createHmac('sha1', this.salt)
         .update(password)
         .digest('hex')
         } catch (err) {
         return ''
         }
         },
         makeSalt: function() {
         return Math.round((new Date().valueOf() * Math.random())) + ''
         }
         }
*/
export default mongoose.model('Post', PostSchema);
