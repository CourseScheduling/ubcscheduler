import React, { Component } from 'react';
// import logo from './logo.svg';
import './css/fonts.css';
import './css/base.css';
import './App.css';
import './css/layout.css';
import './css/header.css';
import './css/side-panel.css';
import './css/course-container.css';
import './css/search-tool.css';
import './css/common.css';

import { Provider } from 'react-redux';

import SearchTool from './components/SearchTool';
import CourseContainer from './components/CourseContainer';
import CalendarTable from './components/CalendarTable';

import store from './store';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <div className="header">
            <div className="logo">
              UBC Scheduler
            </div>
            <div className="instructions">
              <span>Guide: Add breaks by dragging on the calendar and lock sections by right clicking sections</span>
            </div>
            <div className="saved-schedules">
              <span>Saved schedules:</span>
            </div>
          </div>
          

          <div className="side-panel">
            <div className="control__container">
              <SearchTool />
              <div className="course-container-header">:: COURSES ::</div>
              <CourseContainer />
            </div>
            
            {/* Add Breaks
            Lock Sections
            Create STT  */}
          </div>

          <div className="calendar">
            <div className="calendar__term-container">
              <div className="calendar__term">Term 1</div>
              <div className="calendar__term">Term 2</div>
            </div>
            <div className="calendar__container">
              <CalendarTable term="t1"/>
              <CalendarTable term="t2"/>
            </div>
            <div className="calendar__index">
              <span>1</span>
              <span>/</span>
              <span>1</span>
            </div>
          </div>
        </div>        
      </Provider>
    );
  }
}

export default App;
