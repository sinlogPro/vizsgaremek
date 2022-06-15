const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    price: {
        type: Number,
        required: true,
    },
    active: {
        type: Boolean,
        required: true,
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', ProductSchema);
