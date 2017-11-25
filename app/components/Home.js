// @flow
import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import styles from './Home.css';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div>
          <h2>Home</h2>
          <Link to="/counter">to Counter</Link>
          <Link to="/client">to Client</Link>
        </div>
      </div>
    );
  }
}
