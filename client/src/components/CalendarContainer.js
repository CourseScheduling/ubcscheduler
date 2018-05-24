import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import CalendarTable from './CalendarTable';
import CalendarBlocks from './CalendarBlocks';

import { jumpTo, updateActiveSections, updateBreaks } from '../actions/calendarActions';
import { toggleLock } from '../actions/scheduleActions';

class CalendarContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            schedules: {t1: [[]], t2: [[]]},
            index: {t1: 0, t2: 0},
            term: "t1",
            breaks: [],
            lockedSections: [],
            tempSection: {}
        }

        this.displayPrev = this.displayPrev.bind(this)
        this.displayNext = this.displayNext.bind(this)
    }
    displayPrev(e) {
        const numSchedules = this.state.schedules[this.state.term].length
        let newIdx = (this.state.index[this.state.term] - 1) % numSchedules
        if (newIdx === -1) newIdx = numSchedules - 1
        this.props.jumpTo(newIdx)
    }
    displayNext(e) {
        const numSchedules = this.state.schedules[this.state.term].length
        let newIdx = (this.state.index[this.state.term] + 1) % numSchedules
        this.props.jumpTo(newIdx)
    }

    render() {
        return (
            <div className="calendarsContainer-wrapper">
                <div className="calendarsContainer">
                    <div className="arrow-container">
                        <div className="arrow arrow--left" onClick={this.displayPrev}>
                            <i className="material-icons">&#xE5CB;</i>
                        </div>
                        <div className="arrow arrow--right" onClick={this.displayNext}>
                            <i className="material-icons">&#xE5CC;</i>
                        </div>
                    </div>
                    <div className="calendarContainer">
                        <CalendarTable 
                            term="t1" 
                            updateBreaks={this.props.updateBreaks}
                            breaks={this.props.breaks.t1}/>
                        <CalendarBlocks 
                            term="t1"
                            schedule={this.state.schedules.t1[this.state.index.t1]}
                            tempSection={this.state.tempSection}
                            toggleLock={this.props.toggleLock}
                            lockedSections={this.state.lockedSections}                          
                        />
                    </div>
                    <div className="calendarContainer">
                        <CalendarTable 
                            term="t2" 
                            updateBreaks={this.props.updateBreaks}
                            breaks={this.props.breaks.t2}/>
                        <CalendarBlocks 
                            term="t2" 
                            schedule={this.state.schedules.t2[this.state.index.t2]}
                            tempSection={this.state.tempSection}
                            toggleLock={this.props.toggleLock}
                            lockedSections={this.state.lockedSections}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

CalendarContainer.getDerivedStateFromProps = (nextProps, prevState) => {
    console.log("Calendarcontainer.getDerivedStateFromProps", nextProps)
    // Set previously rendered sections.active to false    
    // Set new rendered sections.active to true
    const prevT1Index = prevState.index.t1
    const prevT2Index = prevState.index.t2
    const prevT1Schedule = prevState.schedules.t1[prevT1Index]
    const prevT2Schedule = prevState.schedules.t2[prevT2Index]
    const prevSections = [...prevT1Schedule, ...prevT2Schedule]

    const nextT1Index = nextProps.index.t1
    const nextT2Index = nextProps.index.t2
    const nextT1Schedule = nextProps.schedules.t1[nextT1Index]
    const nextT2Schedule = nextProps.schedules.t2[nextT2Index]
    const nextSections = [...nextT1Schedule, ...nextT2Schedule]

    nextProps.updateActiveSections(prevSections, nextSections)

    return {
        schedules: nextProps.schedules,
        index: nextProps.index,
        term: nextProps.term,
        breaks: nextProps.breaks,
        lockedSections: nextProps.lockedSections,
        tempSection: nextProps.tempSection
    }
}

const mapStateToProps = state => ({
    schedules: state.scheduler.schedules,
    index: state.scheduler.index,
    term: state.scheduler.term,    
    breaks: state.scheduler.breaks,
    lockedSections: state.scheduler.lockedSections,
    tempSection: state.course.tempSection,

});

export default connect(mapStateToProps, { jumpTo, updateActiveSections, updateBreaks, toggleLock })(CalendarContainer)