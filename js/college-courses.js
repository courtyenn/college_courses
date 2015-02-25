module.exports = (function(){
	var courseCatalog = [];
	var _ = require('../node_modules/underscore/underscore.js');


	function parseClasses(unparsedString){
		var courses = [];

		_.each(unparsedString, function(course){
			var colonlessString = course.split(':');
			courses.push({"class": colonlessString[0].trim().toLowerCase(), "prerequisite": colonlessString[1].trim().toLowerCase()});
		});

		return courses;
	}

//I could also assign indexes to classes, but I would need to keep track of which ones already have been entered.
// As long as classes do not have more than 1 prerequisite and are not repeated.
function recursiveCourses(courses){

	var recursiveCourses = [];

	for(var x = 0; x < courses.length; x++){
		var isCircular = false;
		if(hasPrerequisite(courses[x])){
			var hasMorePrerequisites = true;
			var findPrerequisite = courses[x].prerequisite;
				var listOfPrerequisites = []; // I store the class names and if any prerequisite matches up, it is circular logic, b/c there is only 1. 
				while(hasMorePrerequisites && !isCircular){
					var course = _.findWhere(courses, {"class": findPrerequisite});
					if(!hasPrerequisite(course))hasMorePrerequisites = false;
					else{
						findPrerequisite = course.prerequisite;
						if(listOfPrerequisites.indexOf(findPrerequisite) < 0){
							listOfPrerequisites.push(findPrerequisite);
						}
						else{
							for(var y = 0; y < listOfPrerequisites.length; y++){
								if(listOfPrerequisites[y] === findPrerequisite){
									isCircular = true;
									recursiveCourses.push(listOfPrerequisites[y]);
									break;
								}
							}
						}

					}
				}
			}
		}
		return recursiveCourses;
	}

	function containsCircularLogic(courses){
		var test = recursiveCourses(courses).length > 0 ? true : false;
		return test;
	}

	function hasPrerequisite(course){
		// console.log('================== hasPrerequisite() ==================');
		if(course === undefined || course.prerequisite === undefined) return false;
		
		// console.log(course["class"] + " ++++ " + course.prerequisite);
		return !(course.prerequisite.trim() === "");
	}

	return {
		"courseCatalog": this.courseCatalog,
		"parseClasses": function(classes){
			return parseClasses(classes);
		},
		"hasPrerequisite": function(test){
			return hasPrerequisite(test);
		},
		"containsCircularLogic": function(test){
			return containsCircularLogic(test);
		},
		"recursiveCourses": function(courses){
			return recursiveCourses(courses);
		}
	};

})();