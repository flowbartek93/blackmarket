const express = require('express');
const path = require('path');
const MongoClient = require('mongodb').MongoClient;




/* Database connection  */

async function main(newUser) {

    const uri = "mongodb+srv://bartek:qFaRliUrJ6ISD77V@cluster0.blizs.mongodb.net/<blackmarket>?retryWrites=true&w=majority";
    const client = new MongoClient(uri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    try {
        await client.connect();
        await showCollections(client, newUser)
    } catch (e) {
        console.log(e);
    }

}


async function showCollections(client, newUser) {

    client.db('blackmarket').collection('users').find().toArray((err, content) => {
        console.log(content);
    });

    client.db('blackmarket').collection('users').insertOne(newUser);


}

/* express functions */

const app = express();
app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('static'))

app.post('/register', (req, res) => {

    main(req.body).catch(console.error);
    res.end();
})




app.listen(process.env.PORT || 5000, () => {
    console.log('running...');

})