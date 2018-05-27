import React, { Component } from 'react'

import '../css/components/instruction-wrap.css';

export default class InstructionWrap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expanded: false
    }

    this.expand = this.expand.bind(this)
  }
  expand(e) {
    this.setState({expanded: !this.state.expanded})
  }
  render() {
    return (
      <div className="instruction-wrap">
        <div className="instruction__header">
            <div className="instruction__type">{this.props.instructionType}</div>
            <div className="instruction__msg">{this.props.instruction}</div>
        </div>
        <div className={"instruction-wrap__content " + (this.state.expanded ? "" : "display-none")}>
          {this.props.contentComponent}
        </div>        
        <div className="instruction__footer" onClick={this.expand}>
            Expand
        </div>
      </div>
    )
  }
}
