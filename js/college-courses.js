/* Test if classes have spaces or have ""


*/
var _ = require('../node_modules/underscore/underscore.js');
module.exports = (function(){
	var courseCatalog = [];

	// $('#registration').submit(function(e){
	// 	var courseList = $('#courses').val();
	// 	parseClasses(courseList);
	// 	e.preventDefault();
	// 	return false;	
	// });

	function parseClasses(unparsedString){
		var courses = [];

		_.each(unparsedString, function(course){
		var colonlessString = course.split(':');
		courses.push({"class": colonlessString[0].trim(), "prerequisite": colonlessString[1].trim()});
		});

		return courses;
	}

	return {
		"courseCatalog": this.courseCatalog,
		"parseClasses": function(classes){
			return parseClasses(classes);
		}
	};

})();