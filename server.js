const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;

let _db;


async function dbConnect() {
    const uri = "mongodb+srv://bartek:qFaRliUrJ6ISD77V@cluster0.blizs.mongodb.net/<blackmarket>?retryWrites=true&w=majority";
    const client = await new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    await client.connect();
    _db = client;
}

/* Insert user in database */
async function registerUser(newUser) {
    await dbConnect();
    await _db.db('blackmarket').collection('users').insertOne(newUser);
}

/* Check if user exists */
async function checkUser(userData) {
    await dbConnect();
    var content = await _db.db('blackmarket').collection('users').find().toArray();

    const foundUser = await content.find(singleuser => singleuser.login === userData.login && singleuser.password === userData.password)

    if (foundUser) {
        return true;
    } else if (!foundUser) {
        return false;
    }


}


/* express functions */



const app = express();

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))

app.use(express.static('static'))

/* User Registration */

app.post('/register', (req, res) => {
    registerUser(req.body).catch(console.error);
    res.end();
})

/* User login */

app.post('/login', async (req, res) => {


    let userExists = await checkUser(req.body).catch(console.error)
    if (userExists === true) {
        res.json(userExists)
    } else if (userExists === false) {
        res.json(userExists)
    }

    res.end();
})


app.listen(process.env.PORT || 5000, () => {
    console.log('running...');

})