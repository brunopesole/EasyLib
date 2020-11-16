const express = require('express');
const router = express.Router();
const Student = require('./models/student'); // get our mongoose model
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens


// ---------------------------------------------------------
// route to authenticate and get a new token
// ---------------------------------------------------------
router.post('/authentications', async function(req, res) {

	// find the user
	let user = await Student.findOne({
		email: req.body.email
	}).exec;
	
	// user not found
	if (!user) {
		res.json({ success: false, message: 'Authentication failed. User not found.' });
	}
	
	// check if password matches
	if (user.password != req.body.password) {
		res.json({ success: false, message: 'Authentication failed. Wrong password.' });
	}
	
	// if user is found and password is right create a token
	var payload = {
		email: user.email
		// other data encrypted in the token	
	}
	var options = {
		expiresIn: 86400 // expires in 24 hours
	}
	var token = jwt.sign(payload, app.get('superSecret'), options);

	res.json({
		success: true,
		message: 'Enjoy your token!',
		token: token
	});

});



module.exports = router;