const vision = require('@google-cloud/vision');
const client = new vision.ImageAnnotatorClient({keyFilename:"key.json"});
const fs = require('fs');

// returns file data that encoded base64.
const readFile = (path) => {
    let file = fs.readFileSync(path);
    return file.toString('base64');
};

// this function is deliver text to 'then' method.
const getTextFromImage = (path) => {
    let data = readFile(path);

    const request = {
        "image": {
            content: data
        }
    };
    
    return new Promise((resolve, reject) => {
        client.documentTextDetection(request).then((res) => {
            resolve(res[0].fullTextAnnotation.text);
        }).catch((err) => {
            reject(err);
        });
    });
};

module.exports = {
    "readFile": readFile,
    "getTextFromImage": getTextFromImage
};