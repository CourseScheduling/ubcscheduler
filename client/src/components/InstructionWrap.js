import React, { Component } from 'react'

import '../css/components/instruction-wrap.css';

export default class InstructionWrap extends Component {
  render() {
    return (
      <div className="instruction-wrap">
        <div className="instruction__header">
            <div className="instruction__type">{this.props.instructionType}</div>
            <div className="instruction__msg">{this.props.instruction}</div>
        </div>
        {this.props.contentComponent}
        <div className="instruction__footer">
            Expand
        </div>
      </div>
    )
  }
}
