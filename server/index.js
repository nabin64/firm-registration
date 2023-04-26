// server.js
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');



app.use(cors());

const port = 4000;

const connectToDb = async () => {
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/firm-registration');
        if (connection) {
            console.log('connected to mongo');
        }
    } catch (err) {
        console.log(err);
    }
};

connectToDb();

const userSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    mobileNo: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },

    password: {
        type: String,
        required: true,
    },
    userType: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
});

const User = mongoose.model('User', userSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/register', async (req, res) => {
    try {
        console.log(req.body)
        const { fullName, address, mobileNo, email, password, userType } = req.body;
        const newUser = new User({
            fullName,
            address,
            mobileNo,
            email,
            password,
            userType: userType || 'user',
        });
        await newUser.save();
        res.send({ message: 'User created successfully!' });
    } catch (err) {
        console.log(err);
        res.status(500).send({ message: 'Error creating user!' });
    }
});






app.listen(port, () => console.log(`Server listening on port ${port}`));
