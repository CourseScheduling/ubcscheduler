import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class CalendarTerms extends Component {
    constructor(props) {
        super(props)
        this.state = {
            term: "t1"
        }
    }
    render() {
        return (
            <div className="calendar__term-container">
                <div className={"calendar__term " + (this.state.term === "t1" ? "calendar__term--selected" : "")}>Term 1</div>
                <div className={"calendar__term " + (this.state.term === "t2" ? "calendar__term--selected" : "")}>Term 2</div>
            </div>
        )
    }
}


CalendarTerms.getDerivedStateFromProps = (nextProps, prevState) => {
    console.log("CalendarTerms.getDerivedStateFromProps", nextProps)
    return {
        term: nextProps.term
    }
}

const mapStateToProps = state => ({
    term: state.scheduler.term
});

export default connect(mapStateToProps, {})(CalendarTerms)