import swal from 'sweetalert2'

class Utils {
    constructor() {
    }    

    // elementsFromPoint polyfill
    elementsFromPoint(x, y) {
        var parents = [];
        var parent = void 0;
        do {
            if (parent !== document.elementFromPoint(x, y)) {
                parent = document.elementFromPoint(x, y);
                parents.push(parent);
                parent.style.pointerEvents = 'none';
            } else {
                parent = false;
            }
        } while (parent);
        parents.forEach(function (parent) {
            return parent.style.pointerEvents = 'all';
        });
        return parents;
    }
    getDay(dayIdx) {
        switch(dayIdx) {
            case 0:
                return "Mon"
            case 1:
                return "Tue"
            case 2:
                return "Wed"
            case 3:
                return "Thu"
            case 4:
                return "Fri"
            default:
                break;
        }
    }

    intToTime(timeIdx) {
        timeIdx = timeIdx * 50 + 800
        if (timeIdx % 100) timeIdx -= 20
        let timeString = timeIdx.toString()
        const colonIdx = timeString.length - 2
        return timeString.substr(0, colonIdx) + ":" + timeString.substr(colonIdx)
    }


    timeToInt(stringTime) {
        stringTime = stringTime.replace(":", "");
        let intTime = parseInt(stringTime) - 800;
        if ((intTime % 50) !== 0) {
            intTime += 20;
        }
        return intTime / 50;
    }
    /**
     * Takes start and end time in string and returns an int representing the time
     * @param {*} stringTime "08:00"
     * @param {*} endTime "09:00"
     */
    stringTimeToInt(startTime, endTime) {
        let intSchedule = 0;
        for (var i = this.timeToInt(startTime); i < this.timeToInt(endTime); i++) {
            intSchedule |= (1 << i)
        }
        return intSchedule
    }

    // Validates time within correct range (8:00am ~ 10:00pm), 30 minute increments, start < end
    validateTimeRange(startTime, endTime) {
        let isValid = true
        let msg = ""
        let start = parseInt(startTime.replace(":", ""))
        let end = parseInt(endTime.replace(":", ""))
        if (start % 100) start += 20
        if (end % 100) end += 20

        const startInvalid = start < 800 || start > 2200
        const endInvalid = end < 800 || end > 2200
        const startNot30 = (start % 50) && 1
        const endNot30 = (end % 50) && 1
        if (startInvalid || endInvalid) {
            msg += "Time not in range (8:00am ~ 10:00pm)!<br/><br/>"
            isValid = false
        }
        if (startNot30 || endNot30) {
            msg += "Time should be 30 minute increments!<br/><br/>"
            isValid = false
        }
        if (start >= end) {
            msg += "Start time should be less than end time!<br/>"
            isValid = false
        }

        if (!isValid) {
            swal({
                title: "Invalid time",
                html: msg,
                type: 'error',
                timer: 2000,
                showConfirmButton: false
            })            
        }
        return isValid       
        
    }
}
const utils = new Utils()
export default utils
