const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const randomstring = require('randomstring');
const path = require('path');
const ocrApi = require('./ocr_api');

const translate = require('./translate');

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(fileUpload());

app.get('/', (req, res) => {
    res.render('index');
});

app.post('/upload', (req, res) => {
    if (!req.files || !req.files['choose'])
        return res.status(400).send('No files were uploaded.');
    
    // create the filename
    let image = req.files.choose;
    let imgDir = "img"; // directory name
    let imgName = randomstring.generate({
        length: 10,
        charset: 'numeric'
    }); // create the random string
    let imgPath = path.join(imgDir, imgName + path.extname(image.name));

    // create a file
    image.mv(imgPath, (err) => {
        if (err)
            return res.status(500).send(err);

        ocrApi.getTextFromImage(imgPath).then((text) => {
            translate.translate(text).then((str) => {
                res.send(text + str);
            }).catch((err) => {
                console.error('ERROR:', err);
                res.send('failed to detect.');
            });

            ``
        }).catch((err) => {
            console.error('ERROR:', err);
            res.send('failed to detect.');
        });
    });

    
});

app.listen(80, '0.0.0.0', function(){
    console.log('Server is active');
});