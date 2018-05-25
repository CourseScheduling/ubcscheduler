import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import classNames from 'classnames';

class Register extends Component {
  constructor(props) {
    super(props)

    this.state = {

    }

  }


  render() {
    return (
      <div className="tool__container tool__container--register">
        <div className="panel__header panel__header--register">::Term 1::</div>
        <div className="register__section-container">
            <div className="register__section">
                <div className="section__indicator">
                    <i className="material-icons">check_circle_outline</i>
                </div>
                <a className="section__link" href="www.google.com" target="_blank">CPSC 121 101</a>   
            </div>
            <div className="register__section">
                <div className="section__indicator">
                    <i className="material-icons">check_circle_outline</i>
                </div>
                <a className="section__link" href="">CPSC 121 101</a>   
            </div>
        </div>
        <div className="panel__header panel__header--register">::Term 2::</div> 
        <div className="register__section-container">
        </div>       
      </div>
    )
  }
}

const mapStateToProps = state => ({

});

export default connect(mapStateToProps, {})(Register)