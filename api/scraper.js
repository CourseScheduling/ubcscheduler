const rp = require('request-promise')
const xml2js = require('xml2js')
const parser = new xml2js.Parser()
const cheerio = require('cheerio')

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
module.exports.scrapeCourse = function (course) {
    return new Promise((resolve, reject) => {
        let dept = course.split("_")[0]
        let courseCode = course.split("_")[1]
        const XML_URL = `https://courses.students.ubc.ca/cs/servlets/SRVCourseSchedule?sessyr=2018&sesscd=W&output=5&req=4&dept=${dept}&course=${courseCode}`

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


module.exports.scrapeCourselist = function () {
    return new Promise((resolve, reject) => {
        console.log("Scraping courselist")
        var courselist = {
            uni: "ubc",
            list: []
        }
        var subjects = []
        const SUBJ_URL = "https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&sessyr=2018&sesscd=W"
        rp(SUBJ_URL)
        .then(html => {
            //Collect all subjects
            let $ = cheerio.load(html)
            $("table#mainTable").find('tbody > tr').each((i, row) => {
                subj = $($(row).find('td')[0]).text().trim();
                if (!subj.includes('*')) subjects.push(subj)
            });
            console.log(subjects)
            //Collect all courses
            var count = subjects.length
            subjects.forEach(dept => {
                let DEPT_URL = SUBJ_URL + `&dept=${dept}&req=1`
                rp(DEPT_URL)
                .then(html => {
                    let $ = cheerio.load(html)
                    $("table#mainTable").find('tbody > tr').each((i, row) => {
                        tds = $(row).find('td')
                        code = $(tds[0]).text().trim()
                        title = $(tds[1]).text().trim()
                        //console.log(code + title)
                        courselist.list.push([code, title]);
                    });
                    count--
                    if (count === 0) resolve(courselist)
                })
            });
        })

        //resolve(courselist)
    });
}