const express = require('express');
const User = require('../../model/user.model');
const jwt = require('jsonwebtoken');

const router = express.Router();

// post
router.post('/', async (req, res, next) => {
        
    // const newUser = new User({
    //     email: 'test@test.hu',
    //     last_name: 'Elek',
    //     first_name: 'Test',
    //     password: 'test',
    //     username: 'test3',
    //     role: 5, 
    // });

    // try {
    //     await newUser.save();
    // } catch(e) {
    //     res.statusCode = 401;
    //     return res.json({error: 'Database Error!'});
    // }

    // return res.json({message: 'user created'});


    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    // console.log(user);
    // console.log(process.env.JWT_SIGN_KEY);

    if (!user) {
        return res.sendStatus(401);
    }

    user.comparePassword(password, function(err, isMatch) {
        if (err) {
            return res.sendStatus(403);
        }

        const accessToken = jwt.sign({
            _id: user._id,
            username: user.username,
            role: user.role,
        },  process.env.JWT_SIGN_KEY, {
            expiresIn: '1h',
        });

        console.log(isMatch);
        if (isMatch){
            res.json({ 
                success: true, 
                accessToken, 
                user: {...user._doc, password: ''},
            });
        } else {
            res.json({succes: false})
        }

    });
});

module.exports = router;

/*

fetch('http://localhost:3000/login', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: '{"username": "test3", "password": "test"}',
}).then(r => r.json())
    .then( d => console.log(d) );

*/