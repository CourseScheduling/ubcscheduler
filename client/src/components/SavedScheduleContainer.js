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
      <div className="tool__container tool__container--breakform">

      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(SavedScheduleContainer)