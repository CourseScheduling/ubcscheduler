const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/ubcscheduler');

const SectionSchema = mongoose.Schema({
    "section": String,
    "activity": String,
    "term": String,
    "schedule": [Number],
    "instructors": [String]
})

const CourseSchema = mongoose.Schema({
    "code": {type: String, index: true},
    "t1": [[SectionSchema]],
    "t2": [[SectionSchema]],
    "activity_types": [String]
})

const CourselistSchema = mongoose.Schema({
    "uni": {type: String, index: true},
    "list": [[String]]
})

module.exports = {
    Course: mongoose.model('Course', CourseSchema),
    Courselist: mongoose.model('Courselist', CourselistSchema)
}