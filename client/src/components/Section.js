import React, { Component } from 'react'

export default class Section extends Component {
    constructor(props) {
        super(props)

        this.addTemp = this.addTemp.bind(this)
        this.removeTemp = this.removeTemp.bind(this)
    }

    addTemp(e) {
        console.log("Hovering section")
        if (!this.props.section.active) this.props.addTemp(this.props.section)
    }
    removeTemp(e) {
        console.log("removing temp")
        this.props.removeTemp()
    }
    render() {
        return (
            <div
                className={"course__button course__section " + (this.props.section.active ? "course__button--selected" : "")} 
                onMouseOver={this.addTemp}
                onMouseOut={this.removeTemp}>
                {this.props.section.section}
            </div>
        )
    }
}


