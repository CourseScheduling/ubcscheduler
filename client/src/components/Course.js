import React, { Component } from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { removeCourse } from '../actions/panelActions';

class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: props.course,
            term: "t1"
        }
        this.sectionsByTermJSX = this.sectionsByTermJSX.bind(this)
        this.toggleCourse = this.toggleCourse.bind(this)
        this.removeCourse = this.removeCourse.bind(this)
    }

    sectionsByTermJSX(term) {
        return this.state.course[term].map((sectionsByActivity, i) => (
            <div className="course__sections" key={this.state.course.code + "_sections_" + i}>
                <div className="course__sections__activity">{this.state.course.activity_types[i]}</div>
                {

                    sectionsByActivity.map(section => (
                        <div 
                            className="course__section" 
                            key={this.state.course.code + "_sections_" + section.section}>
                            {section.section}
                        </div>
                    ))
                }
            </div>
        ));
    }

    toggleCourse() {
        console.log("Toggling")
        let isActive = this.state.course.active ? false : true;
        this.setState({ 
            "course": {...this.state.course, active:isActive}
        })   
    }

    removeCourse() {
        console.log("removing course")
        this.props.removeCourse(this.state.course.code);
        
    }
    render() {
        const courseClasses = classNames(
            'remove-btn-parent',
            'course',
            { 'course--active': this.state.course.active }
        );
        let courseExtra;
        if (this.state.course.active) {
            courseExtra = (
                <div className="course__extra">
                    <div className="course__term-container">
                        <div className="course__term course__term--one">Term 1</div>
                        <div className="course__term course__term--two">Term 2</div>
                    </div>
                    <div className="course__t1__container">
                        { this.sectionsByTermJSX("t1") }
                    </div>
                    <div className="course__t2__container">
                        { this.sectionsByTermJSX("t2") }
                    </div>
                </div>              
            )
        }
        return (
            <div className={courseClasses} onClick={this.toggleCourse}>
                <div className="remove-btn" onClick={this.removeCourse}>
                    <i className="material-icons">&#xE5CD;</i>
                </div>
                <div className="course__code">{this.state.course.code}</div>
                {courseExtra}
            </div>
        )
    }
}



export default connect(null, { removeCourse })(Course)