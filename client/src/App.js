import React, { Component } from 'react';
import './css/fonts.css';
import './css/App.css';
import './css/layout.css';
import './css/header.css';
import './css/side-panel.css';
import './css/common.css'

import { Provider } from 'react-redux';

import CalendarContainer from './components/CalendarContainer';
import CalendarIndex from './components/CalendarIndex';
import CalendarTerms from './components/CalendarTerms';
import Control from './components/Control';
import BreakForm from './components/BreakForm';
import CreateCourseForm from './components/CreateCourseForm';
import Register from './components/Register';
import SavedScheduleContainer from './components/SavedScheduleContainer';

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
              <SavedScheduleContainer />
            </div>
          </div>
          

          <div className="side-panel">
            <div className="side-panel__contents">
              <Control />
              <BreakForm />
              <CreateCourseForm />
              <Register />
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
