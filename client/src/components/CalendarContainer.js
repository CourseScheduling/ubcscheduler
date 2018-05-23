import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import CalendarTable from './CalendarTable';
import CalendarBlocks from './CalendarBlocks';

class CalendarContainer extends Component {
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
                        <CalendarBlocks term="t1" />
                    </div>
                    <div className="calendarContainer">
                        <CalendarTable term="t2" />
                        <CalendarBlocks term="t2" />
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(CalendarContainer)