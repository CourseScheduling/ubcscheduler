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
import './css/calendar.css';
import './css/calendar-block.css';


import { Provider } from 'react-redux';

import SearchTool from './components/SearchTool';
import CourseContainer from './components/CourseContainer';
import CalendarContainer from './components/CalendarContainer';
import CalendarIndex from './components/CalendarIndex';
import CalendarTerms from './components/CalendarTerms';

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
            <CalendarTerms />

            <CalendarContainer />
            
            <CalendarIndex />

          </div>
        </div>        
      </Provider>
    );
  }
}

export default App;
