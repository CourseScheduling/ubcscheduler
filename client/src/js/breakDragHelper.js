/**
 * Module to connect blocksections that have pointer-events set to none with calendarTable
 */
class BreakDragHelper {
    constructor() {
       this.foregroundElements = []
       
    }

    addForegroundElement(element) {
        console.log("Adding foreground element", element)
        this.foregroundElements.push(element)
        console.log(this.foregroundElements)
    }

    resetBlockSections() {
        console.log("resetBlockSections", this.foregroundElements)
        this.foregroundElements.forEach(element => {
            element.style.pointerEvents = 'auto'
        })
        this.foregroundElements = []
    }
}

export default new BreakDragHelper()