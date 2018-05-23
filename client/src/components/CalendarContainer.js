import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import CalendarTable from './CalendarTable';
import CalendarBlocks from './CalendarBlocks';

class CalendarContainer extends Component {
    constructor(props) {
        super(props)

        this.state = {
            schedules: {t1: [[]], t2: [[]]},
            index: {t1: 0, t2: 0}
        }
    }
    render() {
        return (
            <div className="calendarsContainer-wrapper">
                <div className="calendarsContainer">
                    <div className="arrow-container">
                        <div className="arrow arrow--left">
                            <i className="material-icons">&#xE5CB;</i>
                        </div>
                        <div className="arrow arrow--right">
                            <i className="material-icons">&#xE5CC;</i>
                        </div>
                    </div>
                    <div className="calendarContainer">
                        <CalendarTable term="t1" />
                        <CalendarBlocks 
                            term="t1"
                            schedule={this.state.schedules.t1[this.state.index.t1]}
                        />
                    </div>
                    <div className="calendarContainer">
                        <CalendarTable term="t2" />
                        <CalendarBlocks 
                            term="t2" 
                            schedule={this.state.schedules.t2[this.state.index.t2]}
                        />
                    </div>
                </div>
            </div>
        )
    }
}

CalendarContainer.getDerivedStateFromProps = (nextProps, prevState) => {
    console.log("Calendarcontainer.getDerivedStateFromProps", nextProps)
    return {
        schedules: nextProps.schedules,
        index: nextProps.index
    }
}

const mapStateToProps = state => ({
    schedules: state.scheduler.schedules,
    index: state.scheduler.index
});

export default connect(mapStateToProps, {})(CalendarContainer)