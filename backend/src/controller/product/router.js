const express = require('express');
const Product = require('../../model/product.model');
const controller = require('../base/controller')(Product);

const router = express.Router();

// get
router.get('/', (req, res, next) => {
    // console.log('get works');
    return controller.findAll(req, res, next);
});

// get one
router.get('/:id', (req, res, next) => {
    console.log('getOne works');
    return controller.findOne(req, res, next);
});




module.exports = router;

/*
fetch('http://localhost:3000/product', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${temp1.accessToken}`
    },
}).then(r => r.json())
    .then( d => console.log(d) );
*/
