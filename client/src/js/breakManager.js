class BreakManager {
    constructor() {
       this.state = {
            rescheduleTimeout: null,
            addBreak: false,
            mousedown: false,
            mouseupInit: false,
            foregroundElements: []
       }
    }
    toggleBreak(e, calendarTable) {
        
        // set this.state.breaks[dataDay] at the correct bit to this.state.addBreak
        function updateBreaks (dataDay, dataTime) {
            console.log("updating state break")            
            let mask = 1 << dataTime
            let newBreaks = [...calendarTable.state.breaks]
            if (this.state.addBreak) newBreaks[dataDay] |= mask
            else newBreaks[dataDay] &= ~mask
            // setState to rerender
            calendarTable.setState({ breaks: newBreaks }) 
        }

        if (!this.state.mouseupInit) {
            // If mouseup after mousedown, schedule action to update breaks in the future
            const onmouseupHandler = (e) => {
                if (this.state.mousedown == true) this.state.rescheduleTimeout = setTimeout(calendarTable.fireUpdateBreaks, 1000);
                this.state.mousedown = false                  
            }
            document.addEventListener('mouseup', onmouseupHandler.bind(this))
            this.state.mouseupInit = true
        }

        const dataDay = parseInt(e.target.attributes["data-day"].value)
        const dataTime = parseInt(e.target.attributes["data-time"].value)    
        switch (e.type) {
            case 'mousedown':
                // Only trigger when left click
                if (e.button === 0) {
                    clearTimeout(this.state.rescheduleTimeout);                            
                    const breakWhereClicked = calendarTable.state.breaks[dataDay] >> dataTime & 1
                    this.state.addBreak = !breakWhereClicked
                    this.state.mousedown = true
                    updateBreaks.call(this, dataDay, dataTime) 
                }
                break;
            case 'mouseover':
                if (this.state.mousedown) updateBreaks.call(this, dataDay, dataTime)
            default:
                break;
        }
    }
}
const breakManager = new BreakManager()
export default breakManager