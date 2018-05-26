import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';
import swal from 'sweetalert2'

import Utils from '../js/utils'
import { addCustomCourse } from '../actions/panelActions'

class CreateCourseForm extends Component {
    constructor(props) {
        super(props)

        this.state = {
            startTime: "08:00",
            endTime: "08:30",
            term: "t1",
            days: [false, false, false, false, false],
            renderedSections: { t1: [], t2: [] }
        
        }

        this.onStartChange = this.onStartChange.bind(this)
        this.onEndChange = this.onEndChange.bind(this)
        this.addSection = this.addSection.bind(this)
        this.toggleTerm = this.toggleTerm.bind(this)
        this.toggleDay = this.toggleDay.bind(this)
        this.addCustomCourse = this.addCustomCourse.bind(this)
    }
    toggleTerm = (term) => (e) => {
        if (this.state.term !== term) this.setState({ "term": term })
    }

    toggleDay = (dayIdx) => (e) => {
        let newDays = [...this.state.days]
        newDays[dayIdx] = !newDays[dayIdx]
        this.setState({ "days": newDays })
    }


    onStartChange(e) {
        this.setState({ "startTime": e.target.value })
    }
    onEndChange(e) {
        this.setState({ "endTime": e.target.value })
    }

    addSection(e) {
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

        let newRenderedSections = {...this.state.renderedSections}
        newRenderedSections[term].push({
            days: days,
            dayStr: dayStr,
            startTime: startTime,
            endTime: endTime
        })
        this.setState({ renderedSections: newRenderedSections})

    }

    getTermSection(code, term) {
        const schedule = this.state.renderedSections[term].reduce((acc, section, sectionIdx) => {
            let sectionTimeArr = Utils.getSectionTimeArr(section.days, section.startTime, section.endTime)
            console.log("sectiontimearr", sectionTimeArr)
            for (let i = 0; i < 5; i++) {
                acc[i] |= sectionTimeArr[i]
            }
            return acc
        }, [0,0,0,0,0])

        return {
            schedule: schedule,
            instructors: [],
            section: "",
            activity: "Custom",
            status: "Custom",
            term: term[1],
            course: code
        }
    }

    addCustomCourse(e) {
        const code = 'Custom 1'
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
        // this.props.addCustomCourse(course)
    }






    renderSectionsByTermJSX(term) {
        return this.state.renderedSections[term].map((renderedSection, i) => (
            <div className="breakform__break" key={"create-course-form__section" + this.state.term + i}>
                <span className="break__component">{renderedSection.dayStr}</span>
                <span className="break__component">{renderedSection.startTime}</span>
                <span className="break__component">to</span>
                <span className="break__component">{renderedSection.endTime}</span>
                <div className="break__remove-btn">
                    <i className="material-icons">&#xE5CD;</i>
                </div>
            </div>
        ));
    } 
    render() {
        return (
            <div className="tool__container tool__container--breakform">
                <div className="breakform__terms">
                    <div className={"btn btn--blue breakform__term " + (this.state.term === "t1" ? "btn--blue--selected" : "")} onClick={this.toggleTerm("t1")}>Term 1</div>
                    <div className={"btn btn--blue breakform__term " + (this.state.term === "t2" ? "btn--blue--selected" : "")} onClick={this.toggleTerm("t2")}>Term 2</div>
                </div>
                <div className="breakform__days">
                    <div className={"panel__btn breakform__day " + (this.state.days[0] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(0)}>Mon</div>
                    <div className={"panel__btn breakform__day " + (this.state.days[1] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(1)}>Tue</div>
                    <div className={"panel__btn breakform__day " + (this.state.days[2] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(2)}>Wed</div>
                    <div className={"panel__btn breakform__day " + (this.state.days[3] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(3)}>Thu</div>
                    <div className={"panel__btn breakform__day " + (this.state.days[4] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(4)}>Fri</div>
                </div>
                <div className="breakform__input-container">
                    <input  type="time" 
                            className="breakform__input" 
                            id="create-course-form__start-time" 
                            value={this.state.startTime} 
                            onChange={this.onStartChange} />
                    <span className="breakform__span">to</span>
                    <input  type="time"
                            className="breakform__input" 
                            id="create-course-form__end-time" 
                            value={this.state.endTime} 
                            onChange={this.onEndChange} />
                </div>
                <div className="btn btn-icon breakform__add-btn" onClick={this.addSection}>
                    <i className="material-icons">add</i>
                    <span>add time</span>
                </div>
                <div className="breakform__breaks-container">
                    <div className="panel__header panel__header--breakform">::Current Sections::</div>
                    <div className={"breakform__term-breaks " + (this.state.term === "t1" ? "breakform__term-breaks--selected" : "")}>
                        {this.renderSectionsByTermJSX("t1")}
                    </div>
                    <div className={"breakform__term-breaks " + (this.state.term === "t2" ? "breakform__term-breaks--selected" : "")}>
                        {this.renderSectionsByTermJSX("t2")}
                    </div>
                </div>        
                <div className="btn btn-icon breakform__add-btn create-course-form__add-btn" onClick={this.addCustomCourse}>
                    <i className="material-icons">done_outline</i>
                    <span>add stt</span>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {addCustomCourse})(CreateCourseForm)