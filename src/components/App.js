import React from 'react';

import { Calendar } from './Calendar';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = { data: null };

    fetch(`http://128.199.53.150/events`)
      .then((response) => {
        return response.json();
      })
      .then ((obj) => {
        this.events = obj;
        /*this.events.sort((a, b) => {
          if (a.start < b.start) {
            return -1; }
          if (a.start > b.start) {
            return 1; }
        }); */
        this.setState({ data: this.events });
      });
  }
  render() {
    if (this.state.data) {
      return (
        <Calendar data={ this.state.data }/>
      );
    } else {
      return <div className="loading">Loading...</div>;
    }
  }
}
