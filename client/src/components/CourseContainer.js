import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { removeCourse, toggleCourseTerm, toggleCourse, addTemp, removeTemp } from '../actions/panelActions';
import { toggleLock } from '../actions/scheduleActions';
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
                <Course 
                    key={course.code + " element"} 
                    course={course} 
                    toggleCourseTerm={this.props.toggleCourseTerm}
                    removeCourse={this.props.removeCourse}
                    toggleCourse={this.props.toggleCourse}
                    addTemp={this.props.addTemp}
                    removeTemp={this.props.removeTemp}
                    toggleLock={this.props.toggleLock}
                />
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
    removeCourse: PropTypes.func.isRequired,
    toggleCourseTerm: PropTypes.func.isRequired
}

CourseContainer.getDerivedStateFromProps = (nextProps, prevState)=>  {
    console.log("CourseContainer.getDerivedStateFromProps", nextProps.courses)
    return {
        courses: nextProps.courses
    }
}

const mapStateToProps = state => ({
    courses: state.course.courses
});

export default connect(mapStateToProps, { removeCourse, toggleCourseTerm, toggleCourse, addTemp, removeTemp, toggleLock })(CourseContainer)