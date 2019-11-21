// set up routing w/express
const express = require('express');
const router = express.Router();

// get the data model
const Upcoming = require('../models/upcoming');

// get function for index page
router.get('/', (req, res, next) => {
    Upcoming.find((err, upcoming) => {
        if(err) {
            console.log(err)
            res.end(err)
        }
        else{
            res.render('upcoming/index', {
                title: 'Assignments',
                upcoming: upcoming
            })
        }
    })
})