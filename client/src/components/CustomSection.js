import React, { Component } from 'react'

import '../css/components/section.css';


export default class CustomSection extends Component {
    constructor(props) {
        super(props)

        this.addTemp = this.addTemp.bind(this)
        this.removeTemp = this.removeTemp.bind(this)
    }

    addTemp(e) {
        if (!this.props.section.active) this.props.addTemp(this.props.section)
    }
    removeTemp(e) {
        this.props.removeTemp()
    }

    render() {
        return (
            <div
                className="course__button course__section" 
                onMouseOver={this.addTemp}
                onMouseOut={this.removeTemp}
            >
                {this.props.section.section}
            </div>
        )
    }
}


