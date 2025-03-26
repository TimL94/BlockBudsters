const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// schema for creating a user model with email validation
const userSchema = new Schema(
    {
        email: {
            type: String, 
            required: true,
            unique: true,
            match: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: 'Invalid email format'
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        admin:{
            type: Boolean,
            required: true,
            default: false
        }
    }
);

userSchema.pre('save', async function (next) {
    if (this.isNew || this.isModified('password')) {
        const saltRounds = 12;
        this.password = await bcrypt.hash(this.password, saltRounds)
    }
    next();
});

userSchema.methods.isCorrectPassword = async function (password) {
    return bcrypt.compare(password, this.password)
};

const User = model('User', userSchema);

module.exports = User;