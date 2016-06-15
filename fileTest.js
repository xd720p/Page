var Parser = require('node-dbf');

var parser = new Parser('./download/GRP46.dbf');

parser.on('start', function(p) {
    console.log('dBase file parsing has started');
});
parser.on('header', function(h) {
    console.log('dBase file header has been parsed');
});

parser.on('record', function(record) {
    console.log('Name: '+ record.STNUMB + ' ' + record.NAME + ' ' + record.IM + ' '+ record.OT); // Name: John Smith
});
parser.parse();