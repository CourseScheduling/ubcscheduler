import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import swal from 'sweetalert2'

import '../css/components/create-course-form.css';

import TimeWidget from './TimeWidget'
import CustomCourse from './CustomCourse'

import Utils from '../js/utils'
import { addCustomCourse } from '../actions/panelActions'
import { addTemp, removeTemp } from '../actions/panelActions';

class CreateCourseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startTime: "08:00",
            endTime: "08:30",
            term: "t1",
            days: [false, false, false, false, false],
            renderedSections: { t1: [], t2: [] },
            course: {
                code: 'Custom 1',
                t1: [[]],
                t2: [[]],
                activity_types: {t1: ['A1'], t2: ['A1']}, 
                active: true,
                term: "t1"
            },
            customNumber: 1,
            currentActivity: 1,
            currentSection: 1
        }

        this.onStartChange = this.onStartChange.bind(this)
        this.onEndChange = this.onEndChange.bind(this)
        this.addSection = this.addSection.bind(this)
        this.addTime = this.addTime.bind(this)
        this.addActivity = this.addActivity.bind(this)
        this.toggleTerm = this.toggleTerm.bind(this)
        this.toggleDay = this.toggleDay.bind(this)
        this.addCustomCourse = this.addCustomCourse.bind(this)
        this.toggleCourseTerm = this.toggleCourseTerm.bind(this)
        this.resetCourse = this.resetCourse.bind(this)
        this.removeSection = this.removeSection.bind(this)
    }
    toggleTerm = (term) => (e) => {
        if (this.state.term !== term) this.setState({ "term": term, "course": {...this.state.course, term: term}})
        e.stopPropagation()
    }    
    toggleCourseTerm(term) {
        if (this.state.course.term === term) return;
        let newCourse = {...this.state.course}
        newCourse.term = term
        this.setState({
            course: newCourse,
            term: term
        })
    }
    toggleDay = (dayIdx) => (e) => {
        let newDays = [...this.state.days]
        newDays[dayIdx] = !newDays[dayIdx]
        this.setState({ "days": newDays })
        e.stopPropagation()
    }


    onStartChange(e) {
        this.setState({ "startTime": e.target.value })
    }
    onEndChange(e) {
        this.setState({ "endTime": e.target.value })
    }

    addTime(e) {
        const term = this.state.term
        const startTime = document.getElementById("create-course-form__start-time").value
        const endTime = document.getElementById("create-course-form__end-time").value
        if (!Utils.validateTimeRange(startTime, endTime)) return
        const days = [...this.state.days]
        // If all days are false, return
        if (days.every((day, i) => {
            return day === false
        })) {
            swal({
                title: "No day selected",
                type: 'warning',
                timer: 2000,
                showConfirmButton: false
            })
            return
        }


        const dayStr = days.reduce((acc, curVal, i) => {
            if (curVal) {
                return acc + Utils.getDay(i)[0]
            } else {
                return acc
            }
        }, "")

        let newRenderedSections = { ...this.state.renderedSections }
        newRenderedSections[term].push({
            days: days,
            dayStr: dayStr,
            startTime: startTime,
            endTime: endTime
        })
        this.setState({ renderedSections: newRenderedSections })
        e.stopPropagation()
    }

    addSection(e) {
        const term = this.state.term
        const idx = this.state.course.activity_types[term].length - 1
        let section = this.getTermSection()
        // TODO:: swal message
        if (section.schedule.every(day => day === 0)) return
        let newCourse = {...this.state.course}
        newCourse[term][idx].push(section)
        this.setState({
            course: newCourse
        })
        e.stopPropagation()
    }

    addActivity(e) {        
        let newCourse = {...this.state.course}
        
        let newActivityNum = this.state.currentActivity + 1
        let newActivity = 'A' + newActivityNum
        
        newCourse.t1.push([])
        newCourse.t2.push([])
        newCourse.activity_types.t1.push(newActivity)
        newCourse.activity_types.t2.push(newActivity)

        this.setState({
            course: newCourse,
            currentActivity: newActivityNum
        })
        e.stopPropagation()
    }

    // Given current times, gets a section for a term
    getTermSection() {
        let code = this.state.course.code
        let term = this.state.term
        let activitys = this.state.course.activity_types[term]
        let activity = activitys[activitys.length - 1]
        let currentSection = 'A' + this.state.currentActivity + this.state.currentSection
        this.state.currentSection += 1

        const schedule = this.state.renderedSections[term].reduce((acc, section, sectionIdx) => {
            let sectionTimeArr = Utils.getSectionTimeArr(section.days, section.startTime, section.endTime)
            for (let i = 0; i < 5; i++) {
                acc[i] |= sectionTimeArr[i]
            }
            return acc
        }, [0, 0, 0, 0, 0])
        this.setState({
            renderedSections: { t1: [], t2: [] },
            days: [false, false, false, false, false]
        })
        return {
            schedule: schedule,
            instructors: [],
            section: currentSection,
            activity: activity,
            status: "Custom",
            term: term[1],
            course: code,
            active: false
        }
    }

    //TODO:: Change activity types
    addCustomCourse(e) {
        if (!(this.state.renderedSections.t1.length + this.state.renderedSections.t2.length)) return;
        const code = 'Custom ' + this.state.customNumber
        const customSectionT1 = this.getTermSection(code, "t1")
        const customSectionT2 = this.getTermSection(code, "t2")
        let course = {
            code: code,
            activity_types: ['Custom'],
            t1: [[customSectionT1]],
            t2: [[customSectionT2]],
            active: true,
            term: "t1"
        }
        console.log("Custom course: ", course)
        this.setState({
            renderedSections: { t1: [], t2: [] },
            days: [false, false, false, false, false]
        })
        this.props.addCustomCourse(course)
        e.stopPropagation()
    }


    resetCourse(e) {
        let newCourse = {
            code: 'Custom 1',
            t1: [[]],
            t2: [[]],
            activity_types: {t1: ['A1'], t2: ['A1']}, 
            active: true,
            term: "t1"
        }
        this.setState({
            course: newCourse,
            currentActivity: 1,
            currentSection: 1
        })
    }

    removeSection= (section) => (e) => {
        let newCourse = {...this.state.course}
        newCourse[this.state.term] = this.state.course[this.state.term].map(courseSections => {
            return courseSections.filter(s => s !== section)
        })
        
        this.setState({
            course: newCourse
        })
    }

    renderSectionsByTermJSX(term) {
        return this.state.renderedSections[term].map((renderedSection, i) => (
            <div className="panel__data" key={"create-course-form__section" + this.state.term + i}>
                <span className="panel__data__component">{renderedSection.dayStr}</span>
                <span className="panel__data__component">{renderedSection.startTime}</span>
                <span className="panel__data__component">to</span>
                <span className="panel__data__component">{renderedSection.endTime}</span>
                <div className="panel__data__remove-btn">
                    <i className="material-icons">&#xE5CD;</i>
                </div>
            </div>
        ));
    }
    render() {
        return (
            <div className="tool__container tool__container--create-course-form">
                <TimeWidget term={this.state.term}
                            days={this.state.days}
                            startTime={this.state.startTime}
                            endTime={this.state.endTime}
                            toggleTerm={this.toggleTerm}
                            toggleDay={this.toggleDay}
                            onStartChange={this.onStartChange}
                            onEndChange={this.onEndChange}
                            addTime={this.addTime}
                            startTimeInputId="create-course-form__start-time"
                            endTimeInputId="create-course-form__end-time"/>

                <div className="side-panel__data-container">
                    <div className="panel__header panel__header--create-course-form">::Course::</div>
                    <CustomCourse   course={this.state.course}
                                    toggleCourseTerm={this.toggleCourseTerm}
                                    addTemp={this.props.addTemp}
                                    removeTemp={this.props.removeTemp}
                                    resetCourse={this.resetCourse}
                                    removeSection={this.removeSection}/>

                    <div className="panel__header panel__header--create-course-form">::Current Times::</div>
                    <div className={"panel__data-container " + (this.state.term === "t1" ? "panel__data-container--selected" : "")}>
                        {this.renderSectionsByTermJSX("t1")}
                    </div>
                    <div className={"panel__data-container " + (this.state.term === "t2" ? "panel__data-container--selected" : "")}>
                        {this.renderSectionsByTermJSX("t2")}
                    </div>
                </div>
                <div className="btn-container">
                    <div className="btn btn-icon btn--blue time-widget__add-btn" onClick={this.addSection}>
                        <i className="material-icons">add</i>
                        <span>section</span>
                    </div>
                    <div className="btn btn-icon btn--blue time-widget__add-btn" onClick={this.addActivity}>
                        <i className="material-icons">add</i>
                        <span>activity</span>
                    </div>
                </div>
                <div className="btn btn-icon btn--blue time-widget__add-btn create-course-form__add-btn" onClick={this.addCustomCourse}>
                    <i className="material-icons">done_outline</i>
                    <span>add stt</span>
                </div>
            </div>
        )
    }
}

CreateCourseForm.getDerivedStateFromProps = (nextProps, prevState) => {
    let newCourse = {...prevState.course}
    newCourse.code = "Custom " + nextProps.customNumber
    return {
        ...prevState,
        course: newCourse,
        customNumber: nextProps.customNumber
    }
}


const mapStateToProps = state => ({
    customNumber: state.scheduler.customNumber
});

export default connect(mapStateToProps, { addCustomCourse, addTemp, removeTemp })(CreateCourseForm)