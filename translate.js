const translate = (str) => {
    const request = require('request');
    var client_id = 'rs0g0nmsqj3dsGLJznt0';
    var client_secret = 'QspLTRZuZW';
    var api_url = 'https://openapi.naver.com/v1/papago/n2mt';

    var options = {
        url: api_url,
        form: {'source':'en', 'target':'ko', 'text':str},
        headers: {'X-Naver-Client-Id':client_id, 'X-Naver-Client-Secret': client_secret}
     };

    

    return new Promise((resolve, reject) => {
        request.post(options, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                resolve(body);
            } else {
                reject(error);
            }
          });
    });
};

module.exports = {
    "translate": translate
};