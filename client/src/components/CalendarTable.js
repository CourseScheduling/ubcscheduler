import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

class CalendarTable extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        const hours = [' 8:00', ' 9:00', '10:00', '11:00', '12:00', ' 1:00', ' 2:00', ' 3:00', ' 4:00', ' 5:00', ' 6:00', ' 7:00', ' 8:00', ' 9:00']
        return (
            <div className="calendar__table-container">
                <table className="calendar__table">
                    <tbody>
                        <tr className="calendar__row calendar__row--days">
                            <td className="calendar__block calendar__block--time"></td>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                <td className="calendar__block calendar__block--day">{day}</td>
                            ))}
                        </tr>
                        {hours.map((hour, hourIdx) => (
                            <React.Fragment>
                                <tr className="calendar_row">
                                    <td className="calendar__block calendar__block--time" rowspan="2">{hour}</td>
                                    {[0, 1, 2, 3, 4].map(dayIdx => (
                                        <td className="calendar__block" data-day={dayIdx} data-time={hourIdx}></td>
                                    ))}
                                </tr>
                                <tr className="calendar_row">
                                    {[0, 1, 2, 3, 4].map(dayIdx => (
                                        <td className="calendar__block" data-day={dayIdx} data-time={hourIdx}></td>
                                    ))}
                                </tr>
                            </React.Fragment>
                        ))}                        
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    
});

export default connect(mapStateToProps, {})(CalendarTable)