import React from 'react';

import { Calendar } from './Calendar';
import { constants } from './constants';

export class App extends React.Component {
  constructor(props) {
    super(props);

    // State for waiting first request
    this.state = { data: null };

      // Request for events
      fetch(constants.urlForEvents)
      .then((response) => {
        return response.json();
      })
      .then ((events) => {
        this.events = events;

        // Sort events by start date
        this.events.sort((a, b) => {
          return a.start - b.start;
        });
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
