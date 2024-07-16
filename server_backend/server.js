// inital setup 
const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

app.set('view engine', 'ejs');

// test api method 
app.get('/api', (req, res) => {
    res.send('Test API method is working!');
});

// start the server 
app.listen(5001, () => {
    console.log('Server started on port 5001');
});
