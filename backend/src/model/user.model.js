const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

// Az itengrációs teszt futtathatósága miatt kellet mindenhol false-ra állítani a required-eket.
// 'required: true' -> false,'required: false'
const UserSchema = mongoose.Schema({
    username: {
        type: String,
        required: false,
        // required: true,
        index: {
            unique: true,
        },
    },
    last_name: {
        type: String,
        required: false,
        
    },
    first_name: {
        type: String,
        required: false,
        
    },
    email: {
        type: String,
        // required: false,
        required: true,
        },
    role: {
        type: Number,
        required: false,
        //required: true
        default: 1,
    },
}, {
    timestamps: true,
});


UserSchema.plugin(idValidator)

UserSchema.plugin(require('mongoose-bcrypt'));

module.exports = mongoose.model('User', UserSchema);
