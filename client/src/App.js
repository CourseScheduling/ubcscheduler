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
import './css/saved-schedules.css';
import './css/breakform.css';

import { Provider } from 'react-redux';


import CalendarContainer from './components/CalendarContainer';
import CalendarIndex from './components/CalendarIndex';
import CalendarTerms from './components/CalendarTerms';
import Control from './components/Control';
import BreakForm from './components/BreakForm';
import CreateCourseForm from './components/createCourseForm';

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
              <div className="saved-schedules__content">
                <div className="save__btn">
                  <i className="material-icons">favorite</i>
                  <span> Save Schedule</span>
                </div>
              </div>
            </div>
          </div>
          

          <div className="side-panel">
            <div className="side-panel__contents">
              <Control />
              <BreakForm />
              <CreateCourseForm />
              {/* Add Breaks
              Lock Sections
              Create STT  */}
            </div>
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
