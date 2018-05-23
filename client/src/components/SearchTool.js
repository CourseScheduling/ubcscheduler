import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

import { fetchCourselist, addCourse } from '../actions/panelActions';

class SearchTool extends Component {
    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            searchResults: [],
            currentIndex: -1
        }

        this.onKeyDown = this.onKeyDown.bind(this);
        this.onChange = this.onChange.bind(this);
        this.resultOnClick = this.resultOnClick.bind(this);
    }

    componentWillMount() {
        this.props.fetchCourselist()
    }

    onKeyDown(e) {
        let currentIndex = this.state.currentIndex;
        switch (e.keyCode) {
            //ENTER
            case 13:
                if (currentIndex >= 0) {
                    this.setState({'searchText': '', searchResults: [], currentIndex: -1})
                    this.props.addCourse(this.state.searchResults[currentIndex].code)
                }
                break;
            //UP
            case 38:

                if (currentIndex === 0) {
                    currentIndex = this.state.searchResults.length - 1
                } else {
                    currentIndex = (currentIndex - 1) % this.state.searchResults.length
                }
                this.setState({ 
                    "currentIndex": currentIndex
                })       
                e.preventDefault()                    
                break;
            //DOWN
            case 40:
                this.setState({ 
                    "currentIndex": (currentIndex + 1) % this.state.searchResults.length 
                })
                e.preventDefault()
                break;
            default:
                break;
        }
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
        this.setState({ "currentIndex" : -1 })       
    }

    resultOnClick = (i) => e => {
        this.setState({'searchText': '', searchResults: [], currentIndex: -1})
        this.props.addCourse(this.state.searchResults[i].code)
    }

    render() {
        const searchResults = this.state.searchResults.map((result, i) => {
            const resultClasses = classNames(
                'search__result',
                {'search__result--hover': this.state.currentIndex === i}
            );
            return (
                <div className={resultClasses} key={result.code + "_result"} onClick={this.resultOnClick(i)}>
                    <div className="search__result__head">
                        {result.code}
                    </div>
                    <div className="search__result__body">
                        {result.name}
                    </div>
                </div>
            )
        });

        return (
            <div className="search-tool">
                <input 
                    type="text" 
                    placeholder="ENTER YOUR COURSES e.g. CPSC 110" 
                    onKeyDown={this.onKeyDown}
                    onChange={this.onChange}
                    className="search__input"
                    value={this.state.searchText}
                />
                <div className="search__result-wrapper">
                    {searchResults}
                </div>
            </div>
        )
    }
}

SearchTool.propTypes = {
    fetchCourselist: PropTypes.func.isRequired,
    addCourse: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    courselist: state.course.courselist
});

export default connect(mapStateToProps, { fetchCourselist, addCourse })(SearchTool)