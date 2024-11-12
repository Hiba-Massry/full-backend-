const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// User Schema

const userSchema = new mongoose.Schema({
    // input feilds
    // user name
user_name: {type: String, required: true, unique: true, 
    match: /^[a-zA-Z0-9_]+$/,  // תבנית שמאפשרת רק אותיות, ספרות, וקו תחתון
    message: "User name can only contain letters, numbers, and underscores"
},
    // email
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w.-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/],
        message: "enter a valid email address "
    },
// password
    
password: {
    type: String,
    required: true,
    validate: {
        validator: function(value) {
            // special values
            return /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{6,}$/.test(value);
        },
        message: "Password must be at least 6 characters, contains an uppercase letter, a number, and a special character"
    }
}
})

// Pre-saved hook
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        // bcrypt hash to encrypt the original password to the database
        this.password = await bcrypt.hash(this.password, 8)
    }
    next()
});
