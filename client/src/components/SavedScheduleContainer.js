import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import '../css/components/saved-schedule-container.css';


class SavedScheduleContainer extends Component {
  constructor(props) {
    super(props)

    this.state = {
    }

  }


  render() {
    return (
      <div className="saved-schedules__container">
        <div className="save__btn">
          <i className="material-icons">favorite</i>
          <span> Save Schedule</span>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(SavedScheduleContainer)