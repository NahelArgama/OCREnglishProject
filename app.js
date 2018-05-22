const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.get('/', (req, res) => {
    res.render('index');
});

app.listen(80, '0.0.0.0', function(){
    console.log('Server is active');
});