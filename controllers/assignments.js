// set up routing w/express
const express = require('express');
const router = express.Router();

// get the data model
const Assignment = require('../models/assignment.js');

// use the npm for logging in
const passport = require('passport')

// get function for index page
router.get('/', loggedIn, (req, res, next) => {
    console.log("Ran the function")
    // get the info from the database
    Assignment.find((err, assignments) => {
        if(err) {
            console.log(err)
            res.end(err)
        }
        else{
            res.render('assignments/index', {
                title: 'Assignments', // set title
                user: req.user,
                upcoming: assignments // send the list of info from the database
            });
        }
    })
});

// check whether the user is logged in
function loggedIn(req,res,next){
    // send the user to the login page if they are not logged in
    if (req.isAuthenticated()){
        return next()
    }
    else{
        res.redirect('/login')
    }
}

// load the page for adding new assignments
router.get('/add', loggedIn, (req, res) => {
    res.render('assignments/add')
})
// load the page for editing old assignments
router.get('/edit', loggedIn, (req, res) => {
    res.render('assignments/edit')
})

/* POST orders/add form submission */
router.post('/add', loggedIn, (req, res) => {
    // add a new assignment to the database
    Assignment.create({
        course: req.body.course,
        work: req.body.work,
        link: req.body.link,
        due: req.body.due
    }, (err, order) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/assignments')
        }
    })
})

router.get('/delete/:_id', loggedIn, (req, res) => {
    // take out the assignment as specified by its id
    Assignment.remove({ _id: req.params._id }, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/assignments')
        }
    })
})


// what happens when you hit the submit button on the edit page
router.post('/edit/:_id', loggedIn, (req, res) => {
    // get the id for the task
    var _id = req.params._id

    // make a new assignment to replace the old one with
   var holder = new Assignment({
        _id: _id,
        name: req.body.course,
        priority: req.body.work,
        due: req.body.due,
        link: req.body.link
    })

    // put the new assignment where the old one was
    Assignment.updateOne({ _id: _id }, holder, (err) => {
        if (err) {
            console.log(err)
            res.end(err)
        }
        else {
            res.redirect('/assignments')
        }
    })
})

// set the controller to be publically accessible
module.exports = router