const User = require("../models/User");
const jwt = require("jsonwebtoken");
module.exports = {
    login: async (req, res, next) => {
        const { email, password } = req.body;

        try{

            const user = await User.findOne({ email });
            if(!user) return res.status(400).json({ msg: 'Invalid Credentials' });

            const isMatch = await user.comparePassword(password);
            if(!isMatch) return res.status(400).json({ msg: 'Invalid Credentials' })

            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

            res.cookie('token', token, { httpOnly: true, secure: false, maxAge: 3600000 });

            res.redirect('/'); // Redirect to home page after successful login

        }catch (err){
            res.status(500).json({ msg: 'Internal Server error' });
            console.log(err)
        }

    }
}