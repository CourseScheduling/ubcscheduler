import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchCourselist } from '../actions/panelActions';

class SearchTool extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            searchResults: [],
            currentIndex: -1
        }

        this.onKeyUp = this.onKeyUp.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        this.props.fetchCourselist()
    }

    onKeyUp(e) {
        console.log("Keyup: " + e.keyCode)
    }

    onChange(e) {
        console.log(e)
        this.setState({ ["searchText"]: e.target.value });
        console.log(e.target.value)
    }

    render() {
        return (
            <div>
                <input 
                    type="text" 
                    placeholder="ENTER YOUR COURSES e.g. CPSC 110" 
                    onKeyUp={this.onKeyUp}
                    onChange={this.onChange}
                />
                <div className="search-result-wrapper__course">
                    <div className="search-result__course">
                        <div className="search-result-head__course">
                            CPSC
                        </div>
                        <div className="search-result-body__course">
                            110
                        </div>
                    </div>
                </div>
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