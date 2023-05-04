const express = require('express')
const mongoose = require('mongoose');
const cors = require('cors')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;
const app = express()
const port = 4000
app.use(cors())
const JWT_SECRET = 'mysecret';


const connectToDb = async () => {
    try {
        const connection = await mongoose.connect('mongodb://127.0.0.1:27017/firm-registration');
        if (connection) {
            console.log('connected to mongodb');
        }
    } catch (err) {
        console.log(err);
    }
};

connectToDb();

const userSchema = new mongoose.Schema({
    fullName: String,
    address: String,
    phoneNumber: String,
    password: String,
    role: String,
});



const Users = mongoose.model('Users', userSchema);

console.log("connected to database")
app.use(express.json())


app.post('/register', async (req, res) => {

    const data = await Users.findOne({ phoneNumber: req.body.phoneNumber })

    if (data) {
        res.json({
            msg: "Already exist",
            success: false
        })
    } else {
        const hash = await bcrypt.hash(req.body.password, saltRounds)

        if (hash) {
            req.body.password = hash
            const data = await Users.create(req.body)
            if (data) {
                res.json({ msg: "Register success", success: true })
            }
        }
    }

})
app.post('/login', async (req, res) => {
    const data = await Users.findOne({ phoneNumber: req.body.phoneNumber })
    if (data) {
        const isMatched = bcrypt.compare(req.body.password, data.password)
        if (isMatched) {
            const token = jwt.sign({ id: data._id }, JWT_SECRET, { expiresIn: '1h' });
            res.json({ msg: "login success", success: true, token })

        } else {
            res.json({ msg: "login failed", success: false })
        }
    }

})



app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
