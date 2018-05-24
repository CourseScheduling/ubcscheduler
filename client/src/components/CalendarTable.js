import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

class CalendarTable extends Component {
    constructor(props) {
        super(props)
        this.state = {
            breaks: [0,0,0,0,0],

        }
        this.toggleBreak = this.toggleBreak.bind(this)
    }

    toggleBreak(e) {
        console.log("toggling break", e.target)
        this.props.updateBreaks([1,1,1,1,1], this.props.term)
        function updateBreaks () {

        }
        switch (e.type) {
            case 'mousedown':
            case 'mouseover':
            default:
                break;
        }
    }

    render() {
        const hours =   [' 8:00', ' 8:30', ' 9:00', ' 9:30', '10:00', '10:30', '11:00', '11:30', '12:00',
                         '12:30',' 1:00', ' 1:30', ' 2:00', ' 2:30', ' 3:00', ' 3:30', ' 4:00', ' 4:30', 
                         ' 5:00', ' 5:30', ' 6:00', ' 6:30', ' 7:00', ' 7:30', ' 8:00', ' 8:30',  ' 9:00', '9:30']
        return (
            <div className="calendar__table-container">
                <table className="calendar__table">
                    <tbody>
                        <tr className="calendar__row calendar__row--days">
                            <td className="calendar__block calendar__block--time"></td>
                            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map(day => (
                                <td className="calendar__block calendar__block--day" key={"block--day_" + this.props.term + day}>{day}</td>
                            ))}
                        </tr>
                        {hours.map((hour, hourIdx) => {
                            let calendarBlockTime;
                            if (hour.substr(-2) == '00') calendarBlockTime = <td className="calendar__block calendar__block--time" rowSpan="2">{hour}</td>
                            return (
                                <tr className="calendar_row" key={"calendar__row_" + this.props.term + hourIdx}>
                                    {calendarBlockTime}
                                    {[0, 1, 2, 3, 4].map(dayIdx => (
                                        <td key={"block_" + this.props.term + dayIdx + hourIdx}
                                            className={"calendar__block " + ((this.state.breaks[dayIdx] >> hourIdx & 1) ? "calendar__block--break" : "")} 
                                            data-day={dayIdx} 
                                            data-time={hourIdx}
                                            onMouseDown={this.toggleBreak}
                                            onMouseOver={this.toggleBreak} ></td>
                                    ))}
                                </tr>
                            )
                        })}                        
                    </tbody>
                </table>
            </div>
        )
    }
}
CalendarTable.getDerivedStateFromProps = (nextProps, prevState)=>  {
    console.log("CalendarTable.getDerivedStateFromProps", nextProps)
    return {
        ...prevState,
        breaks: nextProps.breaks
    }
}

export default CalendarTable