import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import Utils from '../js/utils';
import { updateBreaks } from '../actions/calendarActions'


class BreakForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startTime: "08:00",
      endTime: "08:30",
      term: "t1",
      days: [false, false, false, false, false],
      renderedBreaks: { t1: [], t2: [] },
      breaks: { t1: [0, 0, 0, 0, 0], t2: [0, 0, 0, 0, 0] }
    }

    this.onStartChange = this.onStartChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
    this.toggleDay = this.toggleDay.bind(this)
    this.toggleTerm = this.toggleTerm.bind(this)
    this.addBreak = this.addBreak.bind(this)
    this.removeBreak = this.removeBreak.bind(this)
  }

  onStartChange(e) {
    this.setState({ "startTime": e.target.value })
  }
  onEndChange(e) {
    this.setState({ "endTime": e.target.value })
  }

  toggleDay = (dayIdx) => (e) => {
    let newDays = [...this.state.days]
    newDays[dayIdx] = !newDays[dayIdx]
    this.setState({ "days": newDays })
  }

  toggleTerm = (term) => (e) => {
    if (this.state.term !== term) this.setState({ "term": term })
  }

  addBreak(e) {
    const term = this.state.term
    const startTime = document.getElementById("breakform__start-time").value
    const endTime = document.getElementById("breakform__end-time").value
    const breakTime = Utils.stringTimeToInt(startTime, endTime)

    const days = this.state.days

    let newBreakArr = this.state.breaks[term].map((dayBreak, i) => {
      if (days[i]) {
        return dayBreak | breakTime
      } else {
        return dayBreak
      }
    })
    this.props.updateBreaks(newBreakArr, term)
  }

  removeBreak = (renderedBreak) => (e) => {
    const term = this.state.term
    const breakTimeToRemove = Utils.stringTimeToInt(renderedBreak.startTime, renderedBreak.endTime)
    let newBreakArr = [...this.state.breaks[term]]
    newBreakArr[renderedBreak.dayIdx] &= ~breakTimeToRemove
    this.props.updateBreaks(newBreakArr, term)
  }

  renderedBreaksByTermJSX(term) {
    return this.state.renderedBreaks[term].map((renderedBreak, i) => (
      <div className="breakform__break" key={"breakform__break"+this.state.term+i}>
        <span className="break__component">{renderedBreak.day}</span>
        <span className="break__component">{renderedBreak.startTime}</span>
        <span className="break__component">to</span>
        <span className="break__component">{renderedBreak.endTime}</span>
        <div className="break__remove-btn" onClick={this.removeBreak(renderedBreak)}>
          <i className="material-icons">&#xE5CD;</i>
        </div>
      </div>
    ));
  }

  render() {
    return (
      <div className="tool__container tool__container--breakform">
        <div className="breakform__terms">
          <div className={"btn btn--blue breakform__term " + (this.state.term === "t1" ? "btn--blue--selected" : "")} onClick={this.toggleTerm("t1")}>Term 1</div>
          <div className={"btn btn--blue breakform__term " + (this.state.term === "t2" ? "btn--blue--selected" : "")} onClick={this.toggleTerm("t2")}>Term 2</div>
        </div>
        <div className="breakform__days">
          <div className={"panel__btn breakform__day " + (this.state.days[0] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(0)}>Mon</div>
          <div className={"panel__btn breakform__day " + (this.state.days[1] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(1)}>Tue</div>
          <div className={"panel__btn breakform__day " + (this.state.days[2] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(2)}>Wed</div>
          <div className={"panel__btn breakform__day " + (this.state.days[3] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(3)}>Thu</div>
          <div className={"panel__btn breakform__day " + (this.state.days[4] ? "breakform__btn--selected" : "")} onClick={this.toggleDay(4)}>Fri</div>
        </div>
        <div className="breakform__input-container">
          <input type="time" className="breakform__input" id="breakform__start-time" value={this.state.startTime} onChange={this.onStartChange} />
          <span className="breakform__span">to</span>
          <input type="time" className="breakform__input" id="breakform__end-time" value={this.state.endTime} onChange={this.onEndChange} />
        </div>
        <div className="btn btn-icon breakform__add-btn" onClick={this.addBreak}>
          <i className="material-icons">add</i>
          <span>add break</span>
        </div>
        <div className="breakform__breaks-container">
          <div className="panel__header panel__header--breakform">::Current Breaks::</div>
          <div className={"breakform__term-breaks " + (this.state.term === "t1" ? "breakform__term-breaks--selected" : "")}>
            {this.renderedBreaksByTermJSX("t1")}
          </div>
          <div className={"breakform__term-breaks " + (this.state.term === "t2" ? "breakform__term-breaks--selected" : "")}>
            {this.renderedBreaksByTermJSX("t2")}
          </div>
        </div>
      </div>
    )
  }
}


function getRenderedBreaksByTerm(breakArr) {
  let renderedBreaks = []
  breakArr.forEach((dayBreak, dayIdx) => {
    let inBreak = false
    let prevIStart = 0

    for (let i = 0; i < 32; i++) {
      let isIthBitOne = (dayBreak >> i & 1 === 1)
      //Just fininshed a break segment
      if (inBreak && !isIthBitOne) {
        renderedBreaks.push({
          dayIdx: dayIdx,
          day: Utils.getDay(dayIdx),
          startTime: Utils.intToTime(prevIStart),
          endTime: Utils.intToTime(i)
        })
        inBreak = false
      }
      // Just starting a break segment
      else if (!inBreak && isIthBitOne) {
        prevIStart = i
        inBreak = true
      }
    }
  })
  return renderedBreaks
}

BreakForm.getDerivedStateFromProps = (nextProps, prevState) => {
  let newRenderedBreaks;
  if (nextProps.breaks == prevState.breaks) {
    newRenderedBreaks = prevState.renderedBreaks
  } else {
    newRenderedBreaks = {
      t1: getRenderedBreaksByTerm(nextProps.breaks.t1),
      t2: getRenderedBreaksByTerm(nextProps.breaks.t2)
    }
  }
  return {
    startTime: prevState.startTime,
    endTime: prevState.endTime,
    term: prevState.term,
    days: prevState.days,
    renderedBreaks: newRenderedBreaks,
    breaks: nextProps.breaks
  }
}



const mapStateToProps = state => ({
  breaks: state.scheduler.breaks
});

export default connect(mapStateToProps, { updateBreaks })(BreakForm)