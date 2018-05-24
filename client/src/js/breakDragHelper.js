/**
 * Module to connect blocksections that have pointer-events set to none with calendarTable
 */
class BreakDragHelper {
    constructor() {
       this.foregroundElements = []
       this.mousedown = false
    }

    setMousedown(mousedown) {
        this.mousedown = mousedown
    }
    getMousedown() {
        return this.mousedown
    }

    addForegroundElement(element) {
        console.log("Adding foreground element", element)
        this.foregroundElements.push(element)
        console.log(this.foregroundElements)
    }

    resetBlockSections() {
        if (this.mousedown) {
            console.log("resetBlockSections", this.foregroundElements)
            this.foregroundElements.forEach(element => {
                element.style.pointerEvents = 'auto'
            })
            this.foregroundElements = []
            this.mousedown = false
        }

    }
}

export default new BreakDragHelper()