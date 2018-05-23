import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { schedule } from '../actions/schedulerActions'

import Course from './Course.js'

class CourseContainer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            courses: []
        }
    }
    render() {
        const courseElements = this.state.courses.map((course, i) => {
            return (
                <Course i={i} key={course.code + " element"}/>
            )
        });

        return (
            <div className="course-container">
                {courseElements}
            </div>
        )
    }
}

CourseContainer.propTypes = {
    schedule: PropTypes.func.isRequired
}

CourseContainer.getDerivedStateFromProps = (nextProps, prevState)=>  {
    return {
        courses: nextProps.courses
    }
}

const mapStateToProps = state => ({
    courses: state.course.courses
});

export default connect(mapStateToProps, { schedule })(CourseContainer)