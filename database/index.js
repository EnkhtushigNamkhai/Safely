var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/safely');

var db = mongoose.connection;


db.on('error', function() {
  console.log('mongoose connection error');
});

db.once('open', function() {
  console.log('mongoose connected successfully');
});

var contactsSchema = mongoose.Schema({
  uid: String,
  phoneNumber: String,
  name: String
});

var Contact = mongoose.model('contacts', contactsSchema);


var save = function(data, callback) {
	// { name: ,
 //  phoneNumber: '',
 //  uid: '' }
  console.log(data.name, data.phoneNumber, data.uid);
  var instance = new Contact({uid: data.uid, phoneNumber: data.phoneNumber, name: data.name});
  instance.save(function(err) {
    if (err) {
      callback(err, null);
    } else {
    	callback(null, 'success');
    }
  });
}

var getAll = function(uid, callback) {
  Contact.find({uid: uid}).exec(function (err, response) {
    if (err) {
      callback(err, null);
    } else {
      callback(null, response)
    }
  });

};

module.exports.getAll = getAll;
module.exports.save = save;



