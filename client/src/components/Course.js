import React, { Component } from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import ColorManager from '../js/colorManager'

import '../css/components/course.css';

import Section from './Section'

export default class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: props.course,
            color: ColorManager.add(props.course.code),
        }
        this.toggleCourse = this.toggleCourse.bind(this)
        this.removeCourse = this.removeCourse.bind(this)
        this.toggleCourseTerm = this.toggleCourseTerm.bind(this)
    }

    toggleCourse() {
        this.setState({ course: { ...this.state.course, active: (this.state.course.active ? false : true) } })
    }

    removeCourse(e) {
        ColorManager.remove(this.state.course.code)
        this.props.removeCourse(this.state.course.code);
        e.stopPropagation();
    }

    toggleCourseTerm = (term) => e => {
        if (this.state.course.term !== term) {
            this.props.toggleCourseTerm(this.state.course.code, term)
        }
        e.stopPropagation();
    }

    sectionsByTermJSX(term) {
        return this.state.course[term].map((sectionsByActivity, i) => (
            <div className="course__sections" key={this.state.course.code + "_sections_" + i}>
                <div className="course__sections__activity">{this.state.course.activity_types[term][i]}</div>
                {

                    sectionsByActivity.map(section => (
                        <Section
                            key={this.state.course.code + "_sections_" + section.section}
                            section={section}
                            addTemp={this.props.addTemp}
                            removeTemp={this.props.removeTemp}
                            toggleLock={this.props.toggleLock}
                        />
                    ))
                }
            </div>
        ));
    }

    render() {

        const courseClasses = classNames(
            'remove-btn-parent',
            'course',
            { 'course--active': this.state.course.active }
        );
        const courseStyle = {
            'backgroundColor': this.state.color
        }
        let courseExtra;
        if (this.state.course.active) {
            courseExtra = (
                <div className="course__extra">
                    <div className="course__term-container">
                        <div className={"course__button course__term course__term--one " + (this.state.course.term === "t1" ? "course__term--selected" : "")} onClick={this.toggleCourseTerm("t1")}>Term 1</div>
                        <div className={"course__button course__term course__term--two " + (this.state.course.term === "t2" ? "course__term--selected" : "")} onClick={this.toggleCourseTerm("t2")}>Term 2</div>
                    </div>
                    <div className={"course__container " + (this.state.course.term === "t1" ? "course__container--active" : "")}>
                        {this.sectionsByTermJSX("t1")}
                    </div>
                    <div className={"course__container " + (this.state.course.term === "t2" ? "course__container--active" : "")}>
                        {this.sectionsByTermJSX("t2")}
                    </div>
                </div>
            )
        }
        return (
            <div className={courseClasses} style={courseStyle} onClick={this.toggleCourse}>
                <div className="remove-btn" onClick={this.removeCourse}>
                    <i className="material-icons">&#xE5CD;</i>
                </div>
                <div className="course__code">{this.state.course.code}</div>
                {courseExtra}
            </div>
        )
    }
}

Course.getDerivedStateFromProps = (nextProps, prevState) => {
    return {
        ...prevState,
        course: nextProps.course
    }
}