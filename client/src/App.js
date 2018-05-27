import React, { Component } from 'react';
import './css/variables.css';
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
import InstructionWrap from './components/InstructionWrap';

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
              <InstructionWrap 
                contentComponent={<Control />}
                instructionId="control"
                instructionType="Add Courses + Lock Sections"
                instruction="Search and add your courses. Lock/Unlock sections by clicking here or right-clicking on the calendar" 
              />
              <InstructionWrap 
                contentComponent={<BreakForm />}
                instructionId="breaks"
                instructionType="Breaks"
                instruction="Add breaks from the widget or by dragging on the calendar" />
              <InstructionWrap 
                contentComponent={<CreateCourseForm />}
                instructionId="customcourses"
                instructionType="Custom courses"
                instruction="Create a custom course here for Standard Timetables or courses not found" />
              <InstructionWrap 
                contentComponent={<Register />}
                instructionId="register"
                instructionType="Register"
                instruction="Follow each of the links and add them to your ssc!" />
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
