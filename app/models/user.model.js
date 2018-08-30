const mongoose = require('mongoose'),
    bcrypt = require('bcrypt');

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
        require: true
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,
        trim: true,
        required: true
    },
    hash_password: {
        type: String,
        required: true
    },
    role_id: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Role'
    }
}, {
    timestamps: true
});

UserSchema.methods.comparePassword = function(password) {
    return bcrypt.compareSync(password, this.hash_password)
}

module.exports = mongoose.model('User', UserSchema);