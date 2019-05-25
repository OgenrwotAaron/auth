const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_I=10;
const jwt=require('jsonwebtoken')

const userSchema = mongoose.Schema({
    email:{
        type:String,
        required: true,
        unique:true,
        trim:true
    },
    password:{
        type:String,
        required:true,
        minLenght: 6
    },
    token:{
        type:String
    }
})

userSchema.pre('save',function(next){
    var user = this;

    if(user.isModified('password')){
       bcrypt.genSalt(SALT_I, function(err, salt) {
         if (err) return next(err);
         bcrypt.hash(user.password, salt, function(err, hash) {
           if (err) return next(err);
           user.password = hash;
           next();
         });
       }); 
    }else{
        next();
    }
})

userSchema.methods.comparePassword=function(candidatePassword,cb){
    bcrypt.compare(candidatePassword,this.password,(err,same)=>{
        if(err) throw cb(err);
        cb(null,same);
    })
}

userSchema.methods.generateToken=function(cb){
    var user=this
    var token=jwt.sign(user._id.toHexString(),'supersecret')

    user.token=token
    user.save((err,user)=>{
        if(err) return cb(err);
        cb(null,user)
    })
}

userSchema.statics.findByToken=function(token,cb){
    const user=this;

    jwt.verify(token,'supersecret',function(err,decode){
        user.findOne({'_id':decode,'token':token},function(err,user){
            if(err) return cb(err);
            cb(null,user)
        })
    })
}

const User = mongoose.model('User',userSchema)

module.exports = { User };