import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import '../css/components/register.css';


class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {
      sectionNameObjs: { t1: [], t2: [] }
    }
  }

  renderSectionLinksByTerm(term) {
    return this.state.sectionNameObjs[term].map(sectionNameObj => (
      <div className="register__section" key={"register__section" + sectionNameObj.dept + sectionNameObj.code + sectionNameObj.section}>
        <div className="section__indicator">
          <i className="material-icons">check_circle_outline</i>
        </div>
        <a className="section__link"
          href={`https://courses.students.ubc.ca/cs/main?pname=subjarea&tname=subjareas&req=5&sessyr=2018&sesscd=W&dept=${sectionNameObj.dept}&course=${sectionNameObj.code}&section=${sectionNameObj.section}`}
          target="_blank">
          {`${sectionNameObj.dept} ${sectionNameObj.code} ${sectionNameObj.section}`}
        </a>
      </div>
    ))
  }

  render() {
    return (
      <div className="tool__container tool__container--register">
        <div className="panel__header panel__header--register">::Term 1::</div>
        <div className="register__section-container">
          { this.renderSectionLinksByTerm("t1") }
        </div>
        <div className="panel__header panel__header--register">::Term 2::</div>
        <div className="register__section-container">
          { this.renderSectionLinksByTerm("t2") }
        </div>
      </div>
    )
  }
}

function mapScheduleToSectionNameObj(schedule) {
  return schedule.map(section => {
    let splitCourseName = section.course.split(" ")
    return {
      dept: splitCourseName[0],
      code: splitCourseName[1],
      section: section.section
    }
  })  
}
Register.getDerivedStateFromProps = (nextProps, prevState) => {
  return {
    sectionNameObjs: {
      t1: mapScheduleToSectionNameObj(nextProps.t1Schedule),
      t2: mapScheduleToSectionNameObj(nextProps.t2Schedule)
    }
  }
}


const mapStateToProps = state => ({
  t1Schedule: state.scheduler.schedules.t1[state.scheduler.index.t1],
  t2Schedule: state.scheduler.schedules.t2[state.scheduler.index.t2]
});

export default connect(mapStateToProps, {})(Register)