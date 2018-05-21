import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { schedule } from '../actions/schedulerActions'

class CourseContainer extends Component {
  render() {
    return (
      <div className="course-container">
        
      </div>
    )
  }
}

CourseContainer.propTypes = {
    schedule: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    courses: state.course.courses
});

export default connect(mapStateToProps, { schedule })(CourseContainer)