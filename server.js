const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;
const expressHandlebars = require('express-handlebars');
const router = express.Router();
const {
    resourceUsage
} = require('process');
const {
    json
} = require('body-parser');

let _db;





/* express functions */



const app = express();
app.use(express.static(__dirname + '/static'))

app.engine('handlebars', expressHandlebars({
    defaultLayout: 'weapons',
}))
app.set('view engine', 'handlebars')

app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))






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

app.get('/weapons/:id', (req, res) => {
    console.log('req');
    console.log(req.url);

    let type = req.params.id;
    res.render(type, function (err, html) {

        res.json(html);



    })


})



app.listen(process.env.PORT || 5000, () => {
    console.log('running...');

})