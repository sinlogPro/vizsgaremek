const User = require('../../model/user.model');
const jwt = require('jsonwebtoken');

module.exports = async (req, res, next) => {        
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    
    if (!user) {
        return res.sendStatus(401);
    }

    const valid = user.verifyPasswordSync(password)

    if (valid) {
        const accessToken = jwt.sign({
            _id: user._id,
            username: user.username,
            role: user.role,
        },  process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY,
        });
        res.json({ 
            success: true, 
            accessToken, 
            user: {...user._doc, password: ''},
        });
    } else {
        return res.sendStatus(401);
    }
  
};
