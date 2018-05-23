const COLORS = [
    "#5271FF",
    "#52A5FF",
    "#10bbff",
    "#7690AD",
    "#8052FF",
    "#C15EFF",
    "#7340A3",
    "#4EB2BF",
    "#FF4D4D",
    "#43AB5B",
    "#348547",
    "#5EDB7B",
    "#76AD83",
    "FF824D",
    "#4EBF87",
    "#424385",
    "#E36DBA",
    "#FFAC52"];

class ColorManager {
    constructor() {
        // Maps courses to indices
        this.colorMap = {}
        // Indicates which colors are in use
        this.usedMap = new Array(COLORS.length).fill(false)
        
    }
    /**
     * Called when a new course is added to assign a color to a course
     * @param {String} course - CPSC_110
     */
    add(course) {
        console.log("ColorManager adding course", this)

        if (this.colorMap[course]) return COLORS[this.colorMap[course]];
        // Find next available color
        let i = 0, count = 0
        while (this.usedMap[i]) {
            i = (i + 1) % COLORS.length
            //Sanity check to avoid locking
            count++
            if (count > COLORS.length) break
        }
        this.colorMap[course] = i
        this.usedMap[i] = true
        return COLORS[i]
    }
    /**
     * Called when a course is removed to free up color
     * @param {String} course - CPSC_110
     */
    remove(course) {
        const i = this.colorMap[course]
        this.usedMap[i] = false
        delete this.colorMap[course]
    }

    /**
     * Returns the color a course was assigned to
     * @param {String} course - CPSC_110 
     */
    get(course) {
        return COLORS[this.colorMap[course]]
    }
}

export default new ColorManager()