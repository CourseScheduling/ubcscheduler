import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './css/layout/layout.css';
import './css/search-tool.css';
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
              Add courses and schedule things
            </div>
            <div className="saved-schedules">
              Saved schedules:
            </div>
          </div>
          

          <div className="side-panel">
            <SearchTool />
            <CourseContainer />
            Add Breaks
            Lock Sections
            Create STT 
          </div>

          <div className="calendar">
            <div className="calendar__term-container">
              <div className="calendar__term">Term 1</div>
              <div className="calendar__term">Term 2</div>
            </div>
            <div className="calendar__container">
              <CalendarTable />
              <CalendarTable />
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
