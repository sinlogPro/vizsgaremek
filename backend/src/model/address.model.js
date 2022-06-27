const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const AddressSchema = mongoose.Schema({
    // _id: {
    //     type: mongoose.Schema.Types.ObjectId
    // },
    // _id: Object, 
    country: String,
    zipcode: Number,
    city: String,
    state: String || null,
    streetName: String,
    streetNumber: String || Number,
});


// const CustomerSchema = mongoose.Schema({
//     name: {
//         type: String,
//         required: true,
//     },
//     email: {
//         type: String,
//         required: true,
//     },
//     phoneNumber: {
//         type: String,
//         required: true,
//     },
//     url: String,
//     address: AddressSchema
// }, {
//     timestamps: true,
// });

AddressSchema.plugin(idValidator);

module.exports = mongoose.model('Address', AddressSchema);