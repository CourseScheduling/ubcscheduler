     
/**
 * Renames Waitinglist to Lecture
 * @param {Object} section
 * ex) {
 *      "section": sectionObj.$.key,
 *      "activity": sectionObj.$.activity,
 *      "term": "",
 *      "schedule": [0,0,0,0,0],
 *      "instructors": [] 
 * }
 */

function filterWaitingList(section) {
    if (section.activity == "Waiting List") {
        section.activity = "Lecture"
    }
    return section
}

/**
 * Applying parsing rules after scraping
 * @param {Object} courseObj 
 * ex) {
 *      "code": course,
 *      "t1": [],
 *      "t2": [],
 *      "activity_types": []
 *  }
 */
function applyAll(courseObj) {
    return courseObj
}

module.exports = {
    applyAll: applyAll,
    filterWaitingList: filterWaitingList
}