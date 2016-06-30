
var express = require('express'),
	app = express();


app.use('/static', express.static('static', {maxAge: '1h'}));


app.get('/', function(req, res){
	res.sendFile(__dirname + '/index.html');
});

app.listen(process.env.PORT || 80);