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
}
const utils = new Utils()
export default utils