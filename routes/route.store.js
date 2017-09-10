let url = require('url');  
let dataFn = require('./datafn.js');

function sendDataFn(req, res, filename) {
    let query = url.parse(req.url, true).query,
        name = query.name || '',
        readFileName = '',
        sendData = {
            errno: 0,
            msg: 'ok',
            data: {}
        };

    readFileName = filename;

    dataFn.readFileData(name + readFileName).then((data) => {
        sendData.data = data;
        res.send(JSON.stringify(sendData));
    }, (msg) => {
        sendData.errno = -1;
        sendData.msg = '没有数据';
        res.send(JSON.stringify(sendData));
    })
}

exports.index = (req, res) => {
    res.render('index');
}

exports.ticket = (req, res) => {
    sendDataFn(req, res, 'ticket.json', false);
}
