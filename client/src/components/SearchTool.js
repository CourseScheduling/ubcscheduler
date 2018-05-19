import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCourselist } from '../actions/panelActions';

class SearchTool extends Component {
    constructor(props) {
        super(props)
    }

    componentWillMount() {
        this.props.fetchCourselist()
    }

    render() {
        return (
            <div>
                {this.props.courselist}
            </div>
        )
    }
}

SearchTool.propTypes = {
    fetchCourselist: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    courselist: state.courses.courselist
});

export default connect(mapStateToProps, { fetchCourselist })(SearchTool)