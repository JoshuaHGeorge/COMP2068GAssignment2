// set up routing w/express
const express = require('express');
const router = express.Router();

// get the data model
const Assignments = require('../models/assignment.js');

// get function for index page
router.get('/', (req, res, next) => {
    console.log("Ran the function")
    // get the info from the database
    Assignments.find((err, assign) => {
        if(err) {
            console.log(err)
            res.end(err)
        }
        else{
            res.render('assignments/index', {
                title: 'Assignments', // set title
                upcoming: assign // send the list of info from the database
            });
        }
    })
});

router.get('/add', (req, res) => {
    res.render('assignments/add')
})

/* POST orders/add form submission */
router.post('/add', (req, res) => {
    // save a new order on mongoose or catch trying
    Order.create({
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
            res.redirect('/orders')
        }
    })
})