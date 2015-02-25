/*
 * college_courses
 * user/repo
 *
 * Copyright (c) 2015
 * Licensed under the MIT license.
 */
 var prompt = require('prompt');
 'use strict';

 module.exports = function() {
 	
 	function onErr(err) {
 		console.log(err);
 		return 1;
 	};
 	prompt.get(['username', 'email'], function (err, result) {
 		if (err) { return onErr(err); }
 		console.log('Command-line input received:');
 		console.log('  Username: ' + result.username);
 		console.log('  Email: ' + result.email);
 	});


 	return prompt.start();
 };
