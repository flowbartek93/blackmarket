const express = require('express')
const path = require('path');

const app = express();



app.use(express.static('public/static'))

// app.get('/*', (req, res) => {

//     res.sendFile(path.resolve(__dirname, 'public', 'static', 'index.html'))

// })





app.listen(process.env.PORT || 5000, () => {
    console.log('running...');

})