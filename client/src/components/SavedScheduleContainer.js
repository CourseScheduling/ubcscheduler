import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/components/saved-schedule-container.css';
import { saveSchedule, loadSchedule } from '../actions/saveActions'

import SavedSchedule from './SavedSchedule'

class SavedScheduleContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
      saves: []
    }
    this.save = this.save.bind(this)
  }


  load() {
    
  }

  save(e) {
    // Save courses from courseReducer
    // Save index, term, breaks, lockedSections, customNumber from ScheduleReducer
    this.props.saveSchedule()
  }

  render() {
    return (
      <div className="saved-schedules__container">
        <div className="save__btn" onClick={this.save}>
          <i className="material-icons">favorite</i>
          <span> Save Schedule</span>
        </div>
        <div className="saves__container">
          {
            this.state.saves.map(save => (
              <SavedSchedule save={save} key={"save"+save.id}/>
            ))
          }
        </div>
      </div>
    )
  }
}

SavedScheduleContainer.getDerivedStateFromProps = (nextProps, prevState) => {
  return {
      saves: nextProps.saves
  }
}

const mapStateToProps = state => ({
  saves: state.save.saves
});

export default connect(mapStateToProps, {saveSchedule, loadSchedule})(SavedScheduleContainer)