import React, { Component } from 'react';
import axios from 'axios';

import LoginPage from './LoginPage';
import SearchPlanetsPage from './SearchPlanetsPage';
import { PEOPLE_SEARCH_URL } from './constants';

import './style.scss';

export default class App extends Component {
  state = {
    isLoggedIn: false,
    error: ''
  };

  onLogin = e => {
    e.preventDefault();
    e.stopPropagation();

    const { username, password } = e.currentTarget;

    this.setState({ isLoggedIn: false, error: '' }, () => {
  
      if (username && username.value && password && password.value) {
        axios.get(`${PEOPLE_SEARCH_URL}${encodeURI(username.value)}`).then(
          resp => {
            if (resp.status === 200 && resp.data.results) {
              const user = resp.data.results[0];
  
              if (user.name === username.value && user.birth_year === password.value) {
                this.setState({ isLoggedIn: true });
              } else {
                this.setState({ isLoggedIn: false, error: 'Username/Password combination is not correct. Please try again' });
              }
            }
          },
          error => {
            this.setState({ error: error.message });
          }       
        );
      }
    });
  }

  onLogOut = e => {
    e.preventDefault();
    this.setState({ isLoggedIn: false });
  }
  
  render() {
    const { isLoggedIn, error} = this.state;

    if (isLoggedIn) {
      return (
        <SearchPlanetsPage onLogOut={this.onLogOut}/>
      );
    }

    return (
      <LoginPage onLogin={this.onLogin} error={error}/>
    );   
  }
}
