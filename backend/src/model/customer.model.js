const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

// const AddressSchema = mongoose.Schema({
//     country: String,
//     zipcode: Number,
//     city: String,
//     state: String || null,
//     streetName: String,
//     streetNumber: String || Number,
// });


const CustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: false,
    },
    phoneNumber: {
        type: String,
        required: false,
    },
    url: String,
    address: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Address',
        required: false,
    },
    // address: AddressSchema,
    // address : String
}, {
    timestamps: true,
});

CustomerSchema.plugin(idValidator);

module.exports = mongoose.model('Customer', CustomerSchema);