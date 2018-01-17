var express = require('express');
var bodyParser = require('body-parser');
var db = require('../database/index.js');
var config = require('../config.js');

const accountSid = config.ACCOUNT_SID;
const authToken = config.AUTH_TOKEN;

const client = require('twilio')(accountSid, authToken);

var app = express();
var urlencodedParser = bodyParser.urlencoded({extended: false});


app.use(express.static(__dirname + '/../client/dist'));
app.use(bodyParser.json());

app.listen(3000, function() {
  console.log('listening on port 3000!');
});


app.post('/saveNumber', function(req, res) {
	//save the number into the databse
	console.log('going to save number now', req.body);
	db.save(req.body, function(err, result) {
		if (err) {
			console.log('error in saving contact info');
		} else {
			console.log('successful save of contact info');
			res.send();
		}
	});

});

app.get('/getSaved', function(req, res) {
	//return all the saved numbers associated with UID
	// console.log(req.query.uid);

	db.getAll(req.query.uid, function(err, result) {
		if (err) {
			console.log('error in getting saved data');
		} else {
			// console.log('found this: ', result);
			res.send(result);
		}
	});
});

app.post('/sendMessage', function(req, res) {
	console.log('sent message: ',
	 req.body.message, req.body.numbers, req.body.email);

	for (var i = 0; i < req.body.numbers.length; i++) {
		client.messages.create(
		  {
		    to: req.body.numbers[i],
		    from: config.TWILIO_PHONE,
		    body: `${req.body.email}: ${req.body.message}`
		  }, 
		  (err, message) => {
		    console.log(err);
		  }
		);
	}
	res.send();
	
	// { message: 'hi',
 //  numbers: [ '9167000049', '34567890' ],
 //  email: 'testing5@gmail.com' }
});


