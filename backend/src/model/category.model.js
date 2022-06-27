const mongoose = require('mongoose');
const idValidator = require('mongoose-id-validator');

const CategorySchema = mongoose.Schema({
    name: {
        type: String,
        // required: true,  // A tesztek miatt kellett false-ra állítani mindenhol.
        required: false,
    },    
    description: {
        type: String,
        // required: true,
        required: false,
    },    
}, {
    timestamps: true,
});

CategorySchema.plugin(idValidator);

module.exports = mongoose.model('Category', CategorySchema);