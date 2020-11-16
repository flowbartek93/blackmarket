const express = require('express');
const path = require('path');



const app = express();


app.use(express.json())
app.use(express.urlencoded({
    extended: true
}))
app.use(express.static('static'))

app.post('/register', (req, res) => {

    console.log('ok');
    console.log(req.body);

    res.end();

})




app.listen(process.env.PORT || 5000, () => {
    console.log('running...');

})