// require the mongoose
const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema( {
    course: {
        type: String,
        required: 'Name is Required'
    },
    work: {
        type: String,
        required: 'Name is Required'
    },
    link: {
        type: String
    },
    due: {
        type: Date
    }
})

// make the data model pubic
module.exports = mongoose.model('Assignment', assignmentSchema);