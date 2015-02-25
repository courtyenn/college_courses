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


	// Requires upper level classes to have a prerequisite of ""
	function orderPrerequisites(courses){
		var catalog = [];
		var prerequisite = "";
		var otherClasses = [];

		var startingClasses = _.where(courses, {"prerequisite": prerequisite});
		_.each(startingClasses, function(course){
			catalog.push(course["class"]);
		});
		// console.log("startingClasses: ");
		// console.log(catalog.toString());
		for(var x = 0; x < courses.length; x++){	
			var tempArray = [];
			if(catalog.length >= courses.length)break;
			_.each(startingClasses, function(course){
				var classList = _.where(courses, {"prerequisite": course["class"]});
				_.each(classList, function(oneClass){
					catalog.push(oneClass["class"]);
					tempArray.push(oneClass["class"]);
				});
			});
			startingClasses = _.filter(courses, function(course){
				return tempArray.indexOf(course["class"]) >= 0;
			});
			// console.log('NEW startingClasses');
			// console.log(startingClasses);
		}
		return catalog;
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
		},
		"orderPrerequisites": function(courses){
			return orderPrerequisites(courses);
		}
	};

})();