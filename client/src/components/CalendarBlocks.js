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
    render() {
        return (
            <div className="calendar__blocks">
                {   
                    [0,1,2,3,4].map(day => (
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
                    </div>
                ))}
            </div>
        )
    }
}
