const rp = require('request-promise')
const xml2js = require('xml2js')
const parser = new xml2js.Parser();


//Converts from format HH:MM to ith 30 minute block from 8:00
function timeToInt(time) {
    time = time.replace(":", "");
    intTime = parseInt(time) - 800;
    if ((intTime % 50) !== 0) {
      intTime += 20;
    }
    return intTime/50;
}

/**
 * Returns an integer representing the schedule by 1-bits in 30-minute intervals
 * @param {int} currSchedule - accumulator
 * @param {String} startTime -12:30
 * @param {String} endTime - 2:00
 */
function scheduleToInt(currSchedule, startTime, endTime) {
    for (var i = timeToInt(startTime); i < timeToInt(endTime); i++) {
        currSchedule |= (1 << i)
    }
    return currSchedule
}

/*
Helper that takes xml2js sectionObj and returns parsed json section
*/
//TODO:: Instructors
function parseSection(sectionObj) {
    var section = {
        "section": sectionObj.$.key,
        "activity": sectionObj.$.activity,
        "term": "",
        "schedule": [0,0,0,0,0],
        "instructors": [] 
    }
    let teachingunit = sectionObj.teachingunits[0].teachingunit[0]
    section.term = teachingunit.$.termcd
    let meetings = teachingunit.meetings[0].meeting
    const Days = {"Mon": 0, "Tue": 1, "Wed": 2, "Thu": 3, "Fri": 4}
    meetings.forEach(meeting => {
        dayIdx = Days[meeting.$.day]
        section.schedule[dayIdx] = scheduleToInt(section.schedule[dayIdx], meeting.$.starttime, meeting.$.endtime)
    });
    return section
}

/*
Scrapes course from UBC
Writes to database
resolve scraped course
*/
function scrapeCourse(course) {
    return new Promise((resolve, reject) => {
        const XML_URL = "https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?sessyr=2018&sesscd=W&output=5&req=4&dept=CPSC&course=221";
        var courseObj = {
            "code": course,
            "sections": []
        }

        rp(XML_URL)
        .then(xml => {
            parser.parseString(xml, (err, result) => {
                result.sections.section.forEach(sectionObj => {
                    courseObj.sections.push(parseSection(sectionObj))
                })
            })
            resolve(courseObj)
        })
    });
    
}


module.exports.scrapeCourse = scrapeCourse