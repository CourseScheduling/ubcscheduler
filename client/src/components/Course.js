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
            waitlists: {t1: [], t2: []},
            isFilteringWaitingList: {t1: false, t2: false}
        }
        this.toggleCourse = this.toggleCourse.bind(this)
        this.removeCourse = this.removeCourse.bind(this)
        this.toggleCourseTerm = this.toggleCourseTerm.bind(this)
        this.filterWaitingList = this.filterWaitingList.bind(this)
    }

    filterWaitingList(e) {
        const term = this.state.course.term
        const lectureIdx = this.state.course.activity_types[term].indexOf('Lecture')
        if (this.state.isFilteringWaitingList[term]) {
            this.state.course[term][lectureIdx] = this.state.course[term][lectureIdx].concat(this.state.waitlists[term])
            this.state.waitlists[term] = []
            this.state.isFilteringWaitingList[term] = false
        } else {
            this.state.waitlists[term] = this.state.course[term][lectureIdx].filter(section => section.activity === 'Waiting List')
            this.state.course[term][lectureIdx] = this.state.course[term][lectureIdx].filter(section => section.activity !== 'Waiting List')
            this.state.isFilteringWaitingList[term] = true
        }
        console.log(this.state.course)
        e.stopPropagation()
        this.props.filterWaitingList(this.state.course)        
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
                    <div className={"course__button course__waitlist-filter " + (this.state.isFilteringWaitingList[this.state.course.term] ? "course__button--selected" : "")}
                         onClick={this.filterWaitingList}>
                         {(this.state.isFilteringWaitingList[this.state.course.term] ? "Unfilter Waitlist" : "Filter Waitlist")}
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