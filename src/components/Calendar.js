import React from 'react';
import moment from 'moment';

import Week from './Week';
import Month from './Month';

export class Calendar extends React.Component {
  constructor(props) {
    super(props);
    this.handleMode = this.handleMode.bind(this);
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.today = this.today.bind(this);
    this.renderMonthLabel = this.renderMonthLabel.bind(this);
    this.sortEventsByDate = this.sortEventsByDate.bind(this);

    const startOfMonth = moment().startOf('month').day('Sunday');
    const endOfMonth = moment().endOf('month').day('Saturday');

    this.state = {
      mode: 'Week',
      month: moment(),
      week: moment(),
      data: this.props.data,
      eventsForMonth: null
    };
    const eventsForMonth = this.sortEventsByDate(startOfMonth, endOfMonth);
    this.state.eventsForMonth = eventsForMonth;
  }

  render() {
    return (
      <div className="app">
        <div className="toolbar">
          <div className="toolbar-right">
            <button onClick={ this.today }>Today</button>
            <button onClick={ this.previous }>Previous</button>
            <button onClick={ this.next }>Next</button>
          </div>
          { this.renderMonthLabel() }
          <div className="toolbar-left">
            <button onClick={ this.handleMode }>Month</button>
            <button onClick={ this.handleMode }>Week</button>
          </div>
        </div>
        <Week mode={ this.state.mode } week={ this.state.week } />
        <Month mode={ this.state.mode } month={ this.state.month } eventsForMonth={ this.state.eventsForMonth } />
      </div>
    );
  }
  handleMode(event) {
    if (event.target.innerHTML !== this.state.mode) {
      this.setState({ mode: event.target.innerHTML });
    }
  }

  previous() {
    if (this.state.mode === 'Month') {
      const month = this.state.month.add(-1, 'M');
      //this.setState({ month: month });
      //this.setState({ week: month });
      const startOfMonth = this.state.month.clone().startOf('month').day('Sunday');
      const endOfMonth = this.state.month.clone().endOf('month').day('Saturday');
      this.setState({ eventsForMonth: this.sortEventsByDate(startOfMonth, endOfMonth),
                      month: month});
    } else {
      const week = this.state.week.add(-1, 'w');
      this.setState({ month: week });
      this.setState({ week: week });
    }
  }

  next() {
    if (this.state.mode === 'Month') {
      const month = this.state.month.add(1, 'M');
      this.setState({ month: month });
      this.setState({ week: month });
      const startOfMonth = this.state.month.clone().startOf('month').day('Sunday');
      const endOfMonth = this.state.month.clone().endOf('month').day('Saturday');
      this.setState({ eventsForMonth: this.sortEventsByDate(startOfMonth, endOfMonth)});
    } else {
      const week = this.state.week.add(1, 'w');
      this.setState({ month: week });
      this.setState({ week: week });
    }
  }

  today() {
    if (this.state.month.format('MM Do YY') !== moment().format('MM Do YY')) {
      this.setState({ month: moment() });
      this.setState({ week: moment() });
      const startOfMonth = moment().startOf('month').day('Sunday');
      const endOfMonth = moment().endOf('month').day('Saturday');
      this.setState({ eventsForMonth: this.sortEventsByDate(startOfMonth, endOfMonth)});
    }
  }

  renderMonthLabel() {
    return <span className="toolbar-label">{this.state.month.format('MMMM, YYYY')}</span>;
  }
  sortEventsByDate(start, end) {
    const arr = [];
    start = start.format();
    end = end.format();

    this.state.data.map((item) => {
      if (start <= item.start && end >= item.start) {
        return arr.push(item);
      }
    });
    return arr;
  }
}
