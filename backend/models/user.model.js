const mongoose= require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 3
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
        trim: true
    }
},{
    collection: 'users'
});

const User = mongoose.model('User',userSchema);

module.exports = User;