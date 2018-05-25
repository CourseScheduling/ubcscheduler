import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { jumpTo } from '../actions/calendarActions';

class CalendarIndex extends Component {
    constructor(props) {
        super(props)
        this.state = {
            position: 1,
            numSchedules: 1
        }
        this.displayPrev = this.displayPrev.bind(this)
        this.displayNext = this.displayNext.bind(this)
    }

    displayPrev(e) {
        const numSchedules = this.state.numSchedules
        let newIdx = (this.state.position - 2) % numSchedules
        if (newIdx === -1) newIdx = numSchedules - 1
        this.props.jumpTo(newIdx)
    }
    displayNext(e) {
        const numSchedules = this.state.numSchedules
        let newIdx = this.state.position % numSchedules
        this.props.jumpTo(newIdx)
    }

    render() {
        return (
            <div className="calendar__index-container">
                <div className="arrow-container">
                    <div className="arrow arrow--left" onClick={this.displayPrev}>
                        <i className="material-icons">&#xE5CB;</i>
                    </div>
                    <div className="calendar__index">
                        <span>{this.state.position}</span>
                        <span className="index__break">/</span>
                        <span>{this.state.numSchedules}</span>
                    </div>
                    <div className="arrow arrow--right" onClick={this.displayNext}>
                        <i className="material-icons">&#xE5CC;</i>
                    </div>
                </div>

            </div>
        )
    }
}
CalendarIndex.getDerivedStateFromProps = (nextProps, prevState) => {
    return {
        position: nextProps.position,
        numSchedules: nextProps.numSchedules
    }
}

const mapStateToProps = state => ({
    position: state.scheduler.index[state.scheduler.term] + 1,
    numSchedules: state.scheduler.schedules[state.scheduler.term].length
});

export default connect(mapStateToProps, {jumpTo})(CalendarIndex)