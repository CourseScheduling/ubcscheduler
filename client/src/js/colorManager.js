class ColorManager {
    constructor() {        
        this.COLORS = [
            "rgb(82,113,255, 0.6)",
            "rgb(82,165,255, 0.6)",            
            "rgb(118,144,173, 0.6)",
            "rgb(128,82,255, 0.6)",
            "rgb(193,94,255, 0.6)",
            "rgb(115,64,163, 0.6)",
            "rgb(78,178,191,0.6)",
            "rgb(255,77,77,0.6)",
            "rgb(67,171,91, 0.6)",
            "rgb(52,133,71, 0.6)",
            "rgb(94,219,123,0.6)",
            "rgb(118,173,131,0.6)",
            "rgb(255,130,77, 0.6)",
            "rgb(78,191,135, 0.6)",
            "rgb(66,67,133, 0.6)",
            "rgb(227,109,186, 0.6)",
            "rgb(255,172,82, 0.6)"]
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