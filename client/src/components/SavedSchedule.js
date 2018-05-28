import React, { Component } from 'react'
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import '../css/components/saved-schedule.css';

import ColorManager from '../js/colorManager'


import Section from './Section'

export default class SavedSchedule extends Component {
    constructor(props) {
        super(props)
        this.state = {
            save: props.save
        }
        this.load = this.load.bind(this)
    }

    load(e) {
        this.props.loadSchedule(this.state.save)
    }

    render() {
        return (
            <div className={"saved-schedule " + (this.state.save.selected ? "saved-schedule--selected" : "")} onClick={this.load}>
                {this.state.save.id}
            </div>
        )
    }
}

SavedSchedule.getDerivedStateFromProps = (nextProps, prevState) => {
    return {
      save: nextProps.save
    }
  }