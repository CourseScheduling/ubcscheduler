const Model = require('./model')
const Course = Model.Course

function writeCourse(course) {
    return new Promise((resolve, reject) => {
        Course.update({code: course.code}, course, { upsert : true }, (err, newCourse) => {
            if (err) reject(err);
            resolve(course)
        })
    });
}

module.exports.writeCourse = writeCourse