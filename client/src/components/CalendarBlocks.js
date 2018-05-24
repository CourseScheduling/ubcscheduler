import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import BlockSection from './BlockSection';


export default class CalendarBlocks extends Component {
    constructor(props) {
        super(props)
        this.state = {
            schedule: this.props.schedule
        }
    }
    
    isTempSectionTerm() {
        const sectionTerm = this.props.tempSection.term
        if (sectionTerm === '1') {
            return this.props.term === 't1'
        } else if (sectionTerm === '2') {
            return this.props.term === 't2'
        } else if (sectionTerm === '1-2') {
            return true
        } else {
            console.log("Incorrect term in section")
            return false
        }
    }

    render() {
        return (
            <div className="calendar__blocks">
                {   
                                      
                    [0,1,2,3,4].map(day => {
                        let tempSection;
                        console.log("Rendering calendar blocks")
                        console.log(this.props.tempSection)
                        if (this.props.tempSection.schedule && this.props.tempSection.schedule[day] && this.isTempSectionTerm()) {
                            tempSection =   (<BlockSection
                                                name={this.props.tempSection.course + " " + this.props.tempSection.section}
                                                schedule={this.props.tempSection.schedule[day]}
                                                temp={true}
                                            />)
                        }
                        return (
                            <div className="block__daycol" key={"block__daycol" + day}>
                                {
                                    this.props.schedule.map(section => {
                                        if (section.schedule[day] === 0) return
                                        return  (
                                            <BlockSection 
                                                key={section.course + section.section + day} 
                                                name={section.course + " " + section.section}
                                                schedule={section.schedule[day]}
                                            />
                                        )
                                    })
                                }
                                {tempSection}
                            </div>
                        )
                })}
            </div>
        )
    }
}
