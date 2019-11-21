var express = require('express');
var router = express.Router();
//
// /* GET home page. */
// router.get('/', function(req, res, next) {
//   res.render('index', { title: 'Upcoming' });
// });
// get the data model
const Assignments = require('../models/assignment.js');

// get function for index page
router.get('/', (req, res, next) => {
  console.log("Ran the function")
  Assignments.find((err, assign) => {
    if(err) {
      console.log(err)
      res.end(err)
    }
    else{
      res.render('index', {
        title: 'Assignments',
        upcoming: assign
      });
    }
  })
});

module.exports = router;
