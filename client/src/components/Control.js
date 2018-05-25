import React, { Component } from 'react'
import SearchTool from './SearchTool';
import CourseContainer from './CourseContainer';

export default class Control extends Component {
    render() {
        return (
            <div className="control__container">
                <SearchTool />
                <div className="course-container-header">:: COURSES ::</div>
                <CourseContainer />
            </div>
        )
    }
}
