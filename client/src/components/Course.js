import React, { Component } from 'react'
import classNames from 'classnames';

export default class Course extends Component {
    constructor(props) {
        super(props)
        this.state = {
            course: props.course,
            term: "t1"
        }
        this.sectionsByTermJSX = this.sectionsByTermJSX.bind(this)
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
                <div className="course__section"></div>
            </div>
        ));
    }

    render() {


        const courseClasses = classNames(
            'course',
            { 'course--active': true }
        );

        return (
            <div className={courseClasses}>
                <div className="course__code">{this.state.course.code}</div>
                <div className="course__term">
                    <div className="course__term__one">Term 1</div>
                    <div className="course__term__two">Term 2</div>
                </div>
                <div className="course__t1__container">
                    { this.sectionsByTermJSX("t1") }
                </div>
                <div className="course__t2__container">
                    Term 2 sections
                </div>
            </div>
        )
    }
}

