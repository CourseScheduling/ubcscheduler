import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

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
        switch (e.keyCode) {
            //ENTER
            case 13:
                break;
            //UP
            case 38:
                let currentIndex;
                if (this.state.currentIndex === 0) {
                    currentIndex = this.state.searchResults.length - 1
                } else {
                    currentIndex = (this.state.currentIndex - 1) % this.state.searchResults.length
                }
                this.setState({ 
                    "currentIndex": currentIndex
                })       
                e.preventDefault()                    
                break;
            //DOWN
            case 40:
                this.setState({ 
                    "currentIndex": (this.state.currentIndex + 1) % this.state.searchResults.length 
                })
                e.preventDefault()
                break;
            default:
                break;
        }
        console.log(this.state.currentIndex)
    }

    onChange(e) {
        this.setState({ "searchText": e.target.value });
        let searchResults = [];
        if (e.target.value !== "") {
            this.props.courselist.some(element => {
                if (element[0].startsWith(e.target.value.toUpperCase())) {
                    searchResults.push({
                        'code': element[0],
                        'name': element[1]
                    })
                    if (searchResults.length === 5) return true;                
                }
                return false
            }) 
        }
        this.setState({ "searchResults": searchResults })       
    }

    render() {
        const searchResults = this.state.searchResults.map((result, i) => {
            const resultClasses = classNames(
                'search-result__course',
                {'search-result__course--hover': this.state.currentIndex === i}
            );
            return (
                <div className={resultClasses} key={result.code}>
                    <div className="search-result-head__course">
                        {result.code}
                    </div>
                    <div className="search-result-body__course">
                        {result.name}
                    </div>
                </div>
            )
        });

        return (
            <div>
                <input 
                    type="text" 
                    placeholder="ENTER YOUR COURSES e.g. CPSC 110" 
                    onKeyUp={this.onKeyUp}
                    onChange={this.onChange}
                />
                <div className="search-result-wrapper__course">
                    {searchResults}
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