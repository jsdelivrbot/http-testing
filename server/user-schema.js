var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    SALT_WORK_FACTOR = 10,
    MAX_LOGIN_ATTEMPTS = 5,
    LOCK_TIME = 2*60*60*1000;

var UserSchema = new Schema({
  username: {type: String, required: true, index:{ unique: true }} ,
  password: { type: String, required: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  data: { type: Object, ref: 'Data' },
  loginAttempts: { type: Number, required: true, default: 0 },
  lockUntil: { type: Number } //timestamp when possible to ignore login attempts
});

UserSchema.virtual('isLocked').get(function(){
  //check for future lookUntil timestamp
  return !!(this.lockUntil && this.lockUntil > Date.now());
});

// UserSchema.pre('save', function(next){
//   var user = this;
//
//   //only hash the password if it had been modified
//   if(!user.isModified('password')) return next();
//   // generate a salt
//   bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt){
//     if (err) return next(err);
//       //hash the password using our new salt
//       bcrypt.hash(user.password, salt, function(err, hash){
//           if(err) return next(err);
//
//           //override cleartext pasword with the hashed one
//           user.password = hash;
//           next();
//       });
//   });
// });

UserSchema.method('comparePassword' ,function(candidatePassword, cb){
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
    if (err) return cb(err);
    cb(null, isMatch)
  });
});

UserSchema.method('incLoginAttempts', function(cb){
  //if a previous lock expired restart count at 1
  if (this.lockUntil && this.lockUntil < Date.now()){
    return this.update({
      $set: { loginAttempts: 1 },
      $unset:{ lockUntil: 1 }
    }, cb);
  }
  //otherwise increment login attempts
  var updates = { $inc: { loginAttempts: 1 } };
  //lock account if we reached maximum number of attempts amd isn't already locked
  if( this.loginAttempts + 1 > MAX_LOGIN_ATTEMPTS && !this.isLocked){
    updates.$set = { lockUntil: Date.now() + LOCK_TIME };
  }
  return this.update(updates, cb);
});

var reasons = UserSchema.statics.failedLogin = {
  NOT_FOUND : 0,
  PASSWORD_INCORRECT : 1,
  MAX_ATTEMPTS : 2
};

UserSchema.static('getAuthenticated', function(username, password, cb){
  //pull user from db
  this.findOne({ username: username }, function(err, user){
    if(err) return cb(err);
    //verify user exists
    if(!user){
      return cb(null, null, reasons.NOT_FOUND);
    }
    // check if account is already locked
    if(user.isLocked){
      return user.incLoginAttempts(function(err){
        if(err) return err;
        return cb( null, null, reasons.MAX_ATTEMPTS );
      });
    }
    //test for corrrect password
    user.comparePassword(password, function(err, isMatch){
      if(err) return err;
      // if password is matching
      if(isMatch){
        if(!user.loginAttempts && !user.lockUntil) return cb(null, user);
      //reset attempts and lock info
      var updates = { $set: { loginAttempts: 0 }, $unset: { lockUntil: 1 } };
      return user.update(updates, function(err){
        if (err) return cb(err);
        return cb(null, user);
      });
      }
      // password incorrect do incrament login before responding
      user.incLoginAttempts(function(err){
        if(err) return cb(err);
        return cb(null, null, reasons.PASSWORD_INCORRECT);
      });

    });

  });
});

module.exports = mongoose.model('User', UserSchema);
