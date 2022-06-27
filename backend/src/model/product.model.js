const mongoose = require('mongoose');

const ProductSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        // unique: true,
    },
    category:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: false,
    },
    description: {
        type: String,
        // required: true,
        required: false,
    },
    price: {
        type: Number,
        // required: true,
        required: false,
    },
    amount: {
        type: Number,
        // required: true,
        required: false,
    },    
    active: {
        type: Boolean,
        // required: true,
        required: false,
    },
    registrated: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: false,
    },
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customer',
        required: false,
    }
}, {
    timestamps: true,
});

module.exports = mongoose.model('Product', ProductSchema);
