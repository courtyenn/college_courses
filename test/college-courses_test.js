'use strict';


var jquery = require('../bower_components/jquery/dist/jquery.min.js');
var collegeCourses = require('../js/college-courses.js');
var data = require('../data.json');
var _ = require('../node_modules/underscore/underscore.js');
var expect = require('chai').expect;

describe('collegeCourses', function () {

  it('should parse string', function () {
  	var courses = collegeCourses.parseClasses(data.unparsedData);
  	console.log(courses);
  	// console.log(data);
    // collegeCourses.parseClasses(data.unparsedData);
    expect(courses[0]).to.have.property('class');
    expect(courses[0]["class"]).to.equal(data.parsedData[0]["class"]);
    expect(courses[0]["prerequisite"]).to.equal(data.parsedData[0]["prerequisite"]);
    expect(courses[3]["prerequisite"]).to.equal(data.parsedData[3]["prerequisite"]);
  });

});
