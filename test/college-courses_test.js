var jquery = require('../bower_components/jquery/dist/jquery.min.js');
var collegeCourses = require('../js/college-courses.js');
var data = require('../data.json');
var _ = require('../node_modules/underscore/underscore.js');
var expect = require('chai').expect;

describe('collegeCourses', function () {

  it('should parse string', function () {
  	var courses = collegeCourses.parseClasses(data.unparsedData);

    expect(courses[0]).to.have.property('class');
    expect(courses[0]["class"]).to.equal(data.parsedData[0]["class"].toLowerCase());
    expect(courses[0]["prerequisite"]).to.equal(data.parsedData[0]["prerequisite"].toLowerCase());
    expect(courses[3]["prerequisite"]).to.equal(data.parsedData[3]["prerequisite"].toLowerCase());
  });

  it('should test for prerequisites', function(){
  	var hasPrerequisite = collegeCourses.hasPrerequisite(data.parsedData[6]);
  	expect(hasPrerequisite).to.equal(false);
  	hasPrerequisite = collegeCourses.hasPrerequisite(data.parsedData[0]);
  	expect(hasPrerequisite).to.equal(true);
  });

  it('should have no circular logic', function(){
  	var noCircularLogic = collegeCourses.containsCircularLogic(data.parsedData);
  	expect(noCircularLogic).to.equal(false);
  });

  it('should have a list of circular logic courses', function(){
  	var count = collegeCourses.recursiveCourses(data.circularData);
  	console.log(count.length);
  	expect(count.length).to.be.above(0);
  });

  // it('should have circular logic', function(){
  // 	var yesCircularLogic = collegeCourses.containsCircularLogic(data.circularData);
  // 	expect(yesCircularLogic).to.equal(true);
  // });

});
