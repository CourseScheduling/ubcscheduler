import React, { Component } from 'react'

export default class Section extends Component {
    constructor(props) {
        super(props)

        this.addTemp = this.addTemp.bind(this)
        this.removeTemp = this.removeTemp.bind(this)
        this.toggleLock = this.toggleLock.bind(this)
    }

    addTemp(e) {
        if (!this.props.section.active) this.props.addTemp(this.props.section)
    }
    removeTemp(e) {
        this.props.removeTemp()
    }
    toggleLock(e) {
        this.props.toggleLock(this.props.section.course + " " + this.props.section.section)
        e.stopPropagation()
    }
    render() {
        return (
            <div
                className={"course__button course__section " + (this.props.section.active ? "course__button--selected" : "")} 
                onMouseOver={this.addTemp}
                onMouseOut={this.removeTemp}
                onClick={this.toggleLock}
            >
                {this.props.section.section}
            </div>
        )
    }
}


