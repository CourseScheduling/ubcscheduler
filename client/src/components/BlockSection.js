import React, { Component } from 'react'

export default class BlockSection extends Component {
  render() {
    return (
      <div className="blockSection">
        {this.props.name}
      </div>
    )
  }
}
