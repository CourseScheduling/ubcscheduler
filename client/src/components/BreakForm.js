import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

class BreakForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      startTime: "08:00",
      endTime: "08:30"
    }

    this.onStartChange = this.onStartChange.bind(this)
    this.onEndChange = this.onEndChange.bind(this)
  }

  onStartChange(e) {
    this.setState({"startTime" : e.target.value})
  }
  onEndChange(e) {
    this.setState({"endTime" : e.target.value})
  }

  render() {
    return (
      <div className="tool__container tool__container--breakform">
        <div className="breakform__days">
          <div className="panel__btn breakform__day" onClick={this.toggleDay}>Mon</div>
          <div className="panel__btn breakform__day" onClick={this.toggleDay}>Tue</div>
          <div className="panel__btn breakform__day" onClick={this.toggleDay}>Wed</div>
          <div className="panel__btn breakform__day" onClick={this.toggleDay}>Thu</div>
          <div className="panel__btn breakform__day" onClick={this.toggleDay}>Fri</div>
        </div>
        <div className="breakform__input-container">
          <input type="time" className="breakform__input" value={this.state.startTime} onChange={this.onStartChange}/>
          <span className="breakform__span">to</span>
          <input type="time" className="breakform__input" value={this.state.endTime} onChange={this.onEndChange}/>
        </div>
        <div className="btn btn-icon breakform__add-btn">
          <i className="material-icons">add</i>
          <span>add break</span>
        </div>
        <div className="breakform__breaks-container">
          <div className="panel__header panel__header--breakform">::Current Breaks::</div>
          <div className="breakform__break">
            <span className="break__component">Mon</span>
            <span className="break__component">12:30</span>
            <span className="break__component">to</span>
            <span className="break__component">14:00</span>
            <div className="break__remove-btn">
              <i className="material-icons">&#xE5CD;</i>
            </div>
          </div>
          <div className="breakform__break">
            <span className="break__component">Mon</span>
            <span className="break__component">12:30</span>
            <span className="break__component">to</span>
            <span className="break__component">14:00</span>
            <div className="break__remove-btn">
              <i className="material-icons">&#xE5CD;</i>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(BreakForm)