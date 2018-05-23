import React, { Component } from 'react'

import ColorManager from '../js/colorManager'

export default class BlockSection extends Component {
  getStart(schedule) {
    for (let i = 0; i < 32; i++) {
      if ((schedule >> i) & 1) {
        return i;
      }
    }
  }

  getHeight(schedule, start) {
    for (let i = start; i < 32; i++) {
      if (!((schedule >> i) & 1)) {
        return i - start;
      }
    }
  }

  getStyle() {
    const BLOCK_HEIGHT = 25
    const schedule = this.props.schedule

    let top = this.getStart(schedule)
    let height = this.getHeight(schedule, top)
    height *= BLOCK_HEIGHT
    top *= BLOCK_HEIGHT

    let course = this.props.name.split(" ")
    course = course[0] + " " + course[1]

    return {
      'top': top + 'px',
      'height': height + 'px',
      'backgroundColor': ColorManager.get(course)
    }
  }

  render() {
    const blockStyle = this.getStyle()
    return (
      <div className="block__section" style={blockStyle}>
        <span>{this.props.name}</span>
      </div>
    )
  }
}
