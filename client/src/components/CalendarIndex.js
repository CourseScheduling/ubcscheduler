import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CalendarIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position: 1,
            numSchedules: 1
        }
    }
    render() {
        return (
            <div className="calendar__index">
                <span>{this.state.position}</span>
                <span>/</span>
                <span>{this.state.numSchedules}</span>
            </div>
        )
    }
}
CalendarIndex.getDerivedStateFromProps = (nextProps, prevState) => {
    console.log("Calendarcontainer.getDerivedStateFromProps", nextProps)
    return {
        position: nextProps.position,
        numSchedules: nextProps.numSchedules
    }
}

const mapStateToProps = state => ({
    position: state.scheduler.index[state.scheduler.term] + 1,
    numSchedules: state.scheduler.schedules[state.scheduler.term].length
});

export default connect(mapStateToProps, {})(CalendarIndex)