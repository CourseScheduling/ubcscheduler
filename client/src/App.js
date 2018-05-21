import React, { Component } from 'react';
// import logo from './logo.svg';
import './App.css';
import './css/layout/layout.css';
import './css/search-tool.css';
import { Provider } from 'react-redux';

import SearchTool from './components/SearchTool';
import CourseContainer from './components/CourseContainer';

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
            Calendar
          </div>
        </div>        
      </Provider>
    );
  }
}

export default App;
