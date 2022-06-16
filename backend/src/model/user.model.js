const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

const UserSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        // index: {
        //     unique: true,
        // },
    },
    last_name: String,
    first_name: String,
    password: {
        type: String,
        required: true,
    },
    role: {
        type: Number,
        required: true
    },
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
}, {
    timestamps: true,
});

UserSchema.pre('save', function(next) {
    const user = this;
    if (!user.isModified('password')) {
        return next();
    }

    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
        if (err) {
            return next(err);
        }

        bcrypt.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err);
            }

            user.password = hash;
            next();
        });
    })
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) {
            return cb(err);
        }

        cb(null, isMatch);
    });
};

// UserSchema.plugin(idValidator);

module.exports = mongoose.model('User', UserSchema);
