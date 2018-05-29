class ColorManager {
    constructor() {        
        this.COLORS = [
            "rgba(65, 91, 119, 0.7)",
            "rgba(42, 72, 105, 0.7)",            
            "rgb(66,67,133, 0.7)",
            "rgba(18, 29, 41, 0.7)",
            "rgba(59, 41, 107, 0.7)",
            "rgba(91, 42, 121, 0.7)",
            "rgb(115,64,163, 0.7)",
            "rgba(27, 107, 117, 0.7)",
            "rgba(210, 27, 27, 0.7)",
            "rgba(31, 130, 54, 0.7)",
            "rgba(39, 78, 48, 0.7)",
            "rgba(75, 169, 97, 0.7)",
            "rgba(232, 90, 90, 0.7)",
            "rgb(78,191,135, 0.7)",
            "rgb(227,109,186, 0.7)",
            "rgba(220, 126, 25, 0.7)"]
        // Maps courses to indices
        this.colorMap = {}
        // Indicates which colors are in use
        this.usedMap = new Array(this.COLORS.length).fill(false)
    }
    /**
     * Called when a new course is added to assign a color to a course
     * @param {String} course - CPSC 110
     */
    add(course) {

        if (this.colorMap[course]) return this.COLORS[this.colorMap[course]];
        // Find next available color
        let i = 0, count = 0
        while (this.usedMap[i]) {
            i = (i + 1) % this.COLORS.length
            //Sanity check to avoid locking
            count++
            if (count > this.COLORS.length) break
        }
        this.colorMap[course] = i
        this.usedMap[i] = true
        return this.COLORS[i]
    }
    /**
     * Called when a course is removed to free up color
     * @param {String} course - CPSC 110
     */
    remove(course) {
        const i = this.colorMap[course]
        this.usedMap[i] = false
        delete this.colorMap[course]
    }

    /**
     * Returns the color a course was assigned to
     * @param {String} course - CPSC 110 
     */
    get(course) {
        return this.COLORS[this.colorMap[course]]
    }

    getTemp() {
        return '#505050'
    }
}

export default new ColorManager()