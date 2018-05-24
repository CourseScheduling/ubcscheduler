const MAX_SCHEDULES = 1000

function filterLockedSections (sectionsByActivity, lockedSections) {
    for (let i = 0; i < sectionsByActivity.length; i++) {
        let lockedSection = sectionsByActivity[i].find(section => {
            return lockedSections.includes(section.course + " " + section.section)
        })
        if (lockedSection) sectionsByActivity[i] = [lockedSection]
    }
}

const schedule = function (courses, breaks, lockedSections) {
    console.log("scheduling")
    console.log(courses)

    const t1Courses = courses.filter(course => course.term == "t1")    
    const t2Courses = courses.filter(course => course.term == "t2")
    console.log("t1 courses", t1Courses)
    console.log("t2 courses", t2Courses)

    const t1SectionsByActivity = t1Courses.reduce((acc, course, i, courses) => acc.concat(course.t1), [])
    const t2SectionsbyActivity = t2Courses.reduce((acc, course, i, courses) => acc.concat(course.t2), [])
    console.log("t1SectionsByActivity", t1SectionsByActivity)
    console.log("t2SectionsbyActivity", t2SectionsbyActivity)
    const numT1Sections = t1SectionsByActivity.length
    const numT2Sections = t2SectionsbyActivity.length
    console.log("numT1Sections: ", numT1Sections);
    console.log("numT2Sections: ", numT2Sections);

    // Filter out lockedSections
    filterLockedSections (t1SectionsByActivity, lockedSections)
    filterLockedSections (t2SectionsbyActivity, lockedSections)
    console.log(t1SectionsByActivity, lockedSections)

    let t1Schedules = []
    let t2Schedules = []

    function recursiveSchedule (numSections, validSchedules, sectionsByActivity, m, t, w, r, f, count, acc) {
        if (count === numSections) {
            validSchedules.push(acc.slice())
            if (validSchedules.length === MAX_SCHEDULES) return false
            return true
        }
        

        for (let i = sectionsByActivity[count].length; i--;) {
            let time = sectionsByActivity[count][i].schedule
            if (!(time[0]&m || time[1]&t || time[2]&w || time[3]&r || time[4]&f)) {
                // No collision detected
                acc.push(sectionsByActivity[count][i])

                if (!recursiveSchedule(
                    numSections,
                    validSchedules,
                    sectionsByActivity,
                    time[0]|m, time[1]|t, time[2]|w, time[3]|r, time[4]|f,
                    count+1,
                    acc)) return false
                acc.pop()
            } 
        }
        return true
    }
    
    recursiveSchedule(numT1Sections, t1Schedules, t1SectionsByActivity, breaks.t1[0], breaks.t1[1], breaks.t1[2], breaks.t1[3], breaks.t1[4], 0, [])
    recursiveSchedule(numT2Sections, t2Schedules, t2SectionsbyActivity, breaks.t2[0], breaks.t2[1], breaks.t2[2], breaks.t2[3], breaks.t2[4], 0, [])

    console.log("Valid t1 schedules", t1Schedules)
    console.log("Valid t2 schedules", t2Schedules)
    return {
        "t1" : t1Schedules,
        "t2" : t2Schedules
    }
}

export default schedule;