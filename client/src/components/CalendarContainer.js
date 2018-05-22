import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import CalendarTable from './CalendarTable';


class CalendarContainer extends Component {
    render() {
        return (
            <div className="calendar-container-wrapper">
                <div className="calendar-container">
                    <div className="arrow-container">
                        <div className="arrow arrow--left">
                            <i className="material-icons">&#xE5CB;</i>
                        </div>
                        <div className="arrow arrow--right">
                            <i className="material-icons">&#xE5CC;</i>
                        </div>
                    </div>
                    <CalendarTable term="t1" />
                    <CalendarTable term="t2" />
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(CalendarContainer)