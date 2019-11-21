// set up routing w/express
const express = require('express');
const router = express.Router();

// get the data model
const Upcoming = require('../models/assignment');

// get function for index page
router.get('/', (req, res) => {
    console.log("Ran the function")
    Assignments.find((err, assign) => {
        if(err) {
            console.log(err)
            res.end(err)
        }
        else{
            res.render('assignments/index', {
                title: 'Assignments',
                upcoming: assign
            })
        }
    })
})