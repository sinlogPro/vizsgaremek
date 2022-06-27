const express = require("express");
const Customer = require('../../model/customer.model');
const Address = require('../../model/address.model');
const controller = require('../base/controller')(Customer);

const router = express.Router();


// read
router.get('/', async (req, res, next) => {
  const list = await Customer.find({})
    
  // belső objektum kiszervezése
  // for (const person of list) {
  //   // const address = person.address;
  //   const newData = {...person.address._doc}
  //   delete newData._id
  //   const newEntity = new Address(newData)
  //   await newEntity.save();
  // }; 



  // idegen kulcsok csatolása
  // const listAddress = await Address.find({})
  // for (let i=0; i<list.length; i++) {
  //     const person = list[i];
  //     const newCustomer = await {...person._doc, address: listAddress[i]._id };
  //     await Customer.findByIdAndUpdate(person._id, newCustomer, {new: true}); 
  // }
  
  return res.json({"node": "work"});
});


module.exports = router;
