const { User, validate, validatelogin } = require('../model/user');
const dotenv = require('dotenv');
const bcrypt = require("bcrypt");
const Todo =require('../model/Todo');
dotenv.config();

const customAuthHeader = 'x-auth-token';

module.exports.userSign = async (req, res) => {

    try {
    
        const { error } = validate(req.body);

        if (error) {
            return res.status(400).send({ message: error.details[0].message });
        }
        const user = await User.findOne({ email: req.body.email });
        if (user)
            return res.status(409).send({ message: "User with given email already exist" });
        const salt = await bcrypt.genSalt(Number(process.env.SALT));
        const hashPassword = await bcrypt.hash(req.body.password, salt);
        await new User({ ...req.body, password: hashPassword }).save();
        res.status(201).send({ message: "User created successfully" })
    } catch (error) {
        res.status(500).send({ message: "internal Server error" })
    }
};
module.exports.login = async (req, resp) => {
    try {
        const res = validatelogin(req.body);
        if (res.error) {
            let error = res.error;
            return resp.status(400).send({ message: error.details[0].message });
        }
        const user = await User.findOne({ email: req.body.email });
        // console.log(user);
        if (!user)
            return resp.status(401).send({ message: "invalid Email or password" });
        const validPassword = await bcrypt.compare(
            req.body.password, user.password
        );
        if (!validPassword)
            return resp.status(401).send({ message: "invalid Email or password" });
        const token = user.generateAuthToken();
       // console.log(token)
        resp.header('x-auth-token', token).send({ data: token, message: "Login successfully" });
    } catch (error) {
        console.log(error)
        resp.status(500).send({ message: "internal Server Error" })
    }
};

